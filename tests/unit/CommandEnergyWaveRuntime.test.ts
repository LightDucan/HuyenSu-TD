import { describe, expect, it } from 'vitest'
import { prototypeWaves } from '../../src/data/waves/prototypeWaves'
import { LocalMetaRepository } from '../../src/domain/meta/MetaRepository'
import { createInitialMetaState } from '../../src/domain/meta/MetaState'
import type { StorageLike } from '../../src/domain/progression/ProgressionStorage'
import { WaveManager } from '../../src/domain/waves/WaveManager'
import { BattleBridge, type BattleSnapshot } from '../../src/game/bridge/BattleBridge'
import { CommandEnergyRuntimeController } from '../../src/runtime/CommandEnergyRuntime'
import { RewardRuntimeController } from '../../src/runtime/RewardRuntime'

const shortWaves = [
  { id: 'one', groups: [{ enemyId: 'sword', count: 1, startDelayMs: 0, spawnIntervalMs: 100 }] },
  { id: 'two', groups: [{ enemyId: 'archer', count: 1, startDelayMs: 0, spawnIntervalMs: 100 }] },
] as const

function setup(current = 60, regenAnchorAtMs = 1_000) {
  const values = new Map<string, string>()
  const storage: StorageLike = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value) },
  }
  const repository = new LocalMetaRepository(storage)
  const initial = createInitialMetaState('wave-energy-test', regenAnchorAtMs)
  repository.save({ ...initial, commandEnergy: { current, regenAnchorAtMs } }, 0, regenAnchorAtMs)
  const bridge = new BattleBridge()
  const clock = { nowMs: regenAnchorAtMs }
  const runtime = new CommandEnergyRuntimeController(repository, bridge, () => clock.nowMs)
  runtime.start()
  return { repository, bridge, clock, runtime }
}

function energy(repository: LocalMetaRepository): number {
  const current = repository.load()
  if (current.status !== 'loaded') throw new Error('Expected loaded Meta save')
  return current.save.data.commandEnergy.current
}

function battleSnapshot(manager: WaveManager, runId: string, placed = true, speed: 1 | 3 = 1): BattleSnapshot {
  return {
    runId,
    speed,
    enemiesSpawned: 0,
    enemiesEscaped: 0,
    enemiesDefeated: 0,
    placedHeroes: placed ? [{ heroId: 'quan-vu', slotId: 'slot-1' }] : [],
    selectedHeroId: 'quan-vu',
    wave: manager.getCurrentWaveNumber(),
    totalWaves: manager.getTotalWaves(),
    waveStatus: manager.getStatus(),
    cityHp: 10,
    battleStatus: manager.getStatus() === 'won' ? 'won' : 'running',
    remainingByCategory: { sword: 0, archer: 0, other: 0 },
  }
}

function connectWaveScene(bridge: BattleBridge, manager: WaveManager, runId: string, placed = true, speed: 1 | 3 = 1) {
  let hasHero = placed
  let gameSpeed = speed
  let slotId = 'slot-1'
  const emit = () => {
    const snapshot = battleSnapshot(manager, runId, hasHero, gameSpeed)
    bridge.emitSnapshot(hasHero ? { ...snapshot, placedHeroes: [{ heroId: 'quan-vu', slotId }] } : snapshot)
  }
  const unsubscribe = bridge.onWaveStartDecision((decision) => {
    if (decision.status !== 'approved' || decision.runId !== runId || decision.waveNumber !== manager.getCurrentWaveNumber()) return
    if (hasHero && manager.beginCurrentWave()) emit()
  })
  emit()
  return {
    emit,
    setHeroPlaced(value: boolean) { hasHero = value; emit() },
    reposition(nextSlotId: string) { slotId = nextSlotId; emit() },
    setSpeed(value: 1 | 3) { gameSpeed = value; emit() },
    stop: unsubscribe,
  }
}

describe('P12-C02 Wave Energy Gate & Auto Wave', () => {
  it('spawns nothing before start and spends 60 to 59 exactly once on manual double-click', () => {
    const { repository, bridge, runtime } = setup()
    const manager = new WaveManager(shortWaves)
    const scene = connectWaveScene(bridge, manager, 'manual-run')

    expect(manager.update(1_000_000)).toEqual([])
    bridge.requestWaveStart('manual')
    bridge.requestWaveStart('manual')

    expect(manager.getStatus()).toBe('running')
    expect(energy(repository)).toBe(59)
    scene.stop(); runtime.stop()
  })

  it('allows manual and Auto requests to race through one spend path', () => {
    const { repository, bridge, runtime } = setup()
    const manager = new WaveManager(shortWaves)
    const scene = connectWaveScene(bridge, manager, 'race-run')

    bridge.setAutoWaveEnabled(true)
    bridge.requestWaveStart('manual')

    expect(manager.getStatus()).toBe('running')
    expect(energy(repository)).toBe(59)
    scene.stop(); runtime.stop()
  })

  it('rejects zero-Hero and insufficient-energy starts without spending', () => {
    const noHero = setup()
    const noHeroManager = new WaveManager(shortWaves)
    const noHeroScene = connectWaveScene(noHero.bridge, noHeroManager, 'no-hero-run', false)
    noHero.bridge.requestWaveStart('manual')
    expect(noHeroManager.getStatus()).toBe('waiting')
    expect(energy(noHero.repository)).toBe(60)

    const empty = setup(0)
    const emptyManager = new WaveManager(shortWaves)
    const emptyScene = connectWaveScene(empty.bridge, emptyManager, 'empty-run')
    empty.bridge.requestWaveStart('manual')
    expect(emptyManager.getStatus()).toBe('waiting')
    expect(energy(empty.repository)).toBe(0)

    noHeroScene.stop(); noHero.runtime.stop()
    emptyScene.stop(); empty.runtime.stop()
  })

  it('leaves the next Wave waiting, then charges one for manual and Auto starts', () => {
    const manual = setup()
    const manualManager = new WaveManager(shortWaves)
    const manualScene = connectWaveScene(manual.bridge, manualManager, 'manual-next-run')
    manual.bridge.requestWaveStart('manual')
    expect(manualManager.update(1_000_000)).toEqual(['sword'])
    expect(manualManager.completeWhenNoEnemiesRemain(0)).toBe(true)
    manualScene.emit()
    expect(manualManager.getStatus()).toBe('waiting')
    expect(energy(manual.repository)).toBe(59)
    manual.bridge.requestWaveStart('manual')
    expect(manualManager.getStatus()).toBe('running')
    expect(energy(manual.repository)).toBe(58)

    const automatic = setup()
    const autoManager = new WaveManager(shortWaves)
    const autoScene = connectWaveScene(automatic.bridge, autoManager, 'auto-next-run')
    automatic.bridge.requestWaveStart('manual')
    automatic.bridge.setAutoWaveEnabled(true)
    autoManager.update(1_000_000)
    autoManager.completeWhenNoEnemiesRemain(0)
    autoScene.emit()
    expect(autoManager.getStatus()).toBe('running')
    expect(energy(automatic.repository)).toBe(58)

    manualScene.stop(); manual.runtime.stop()
    autoScene.stop(); automatic.runtime.stop()
  })

  it('keeps Auto enabled at zero and starts once after wall-clock regeneration', () => {
    const { repository, bridge, clock, runtime } = setup(0, 0)
    const manager = new WaveManager(shortWaves)
    const scene = connectWaveScene(bridge, manager, 'regen-run')
    bridge.setAutoWaveEnabled(true)
    expect(manager.getStatus()).toBe('waiting')
    expect(bridge.isAutoWaveEnabled()).toBe(true)

    clock.nowMs = 120_000
    runtime.refreshCommandEnergy(clock.nowMs)
    expect(manager.getStatus()).toBe('running')
    expect(energy(repository)).toBe(0)
    runtime.refreshCommandEnergy(clock.nowMs)
    expect(energy(repository)).toBe(0)
    scene.stop(); runtime.stop()
  })

  it('keeps x1/x3 and Hero reposition outside Command Energy spending', () => {
    const atSpeed = (speed: 1 | 3) => {
      const setupResult = setup()
      const manager = new WaveManager(shortWaves)
      const scene = connectWaveScene(setupResult.bridge, manager, `speed-${speed}`, true, speed)
      setupResult.bridge.requestWaveStart('manual')
      const afterStart = energy(setupResult.repository)
      scene.setSpeed(speed === 1 ? 3 : 1)
      scene.reposition('slot-2')
      expect(energy(setupResult.repository)).toBe(afterStart)
      scene.stop(); setupResult.runtime.stop()
      return afterStart
    }

    expect(atSpeed(1)).toBe(59)
    expect(atSpeed(3)).toBe(59)
  })

  it('completes ten Waves for exactly ten energy and keeps victory reward idempotent', () => {
    const { repository, bridge, runtime } = setup()
    const rewardRuntime = new RewardRuntimeController(repository, bridge, {
      enemyKill: { goldByEnemyId: {} },
      stageClear: { rewardByStageId: { 'prototype-stage-01': { gold: 10, knb: 3 } } },
      activePlayTime: { intervalMs: 60_000, knbPerInterval: 1, hiddenTabPolicy: 'visible-only' },
    })
    rewardRuntime.start()
    const manager = new WaveManager(prototypeWaves)
    const scene = connectWaveScene(bridge, manager, 'ten-wave-run')

    while (manager.getStatus() !== 'won') {
      bridge.requestWaveStart('manual')
      manager.update(1_000_000)
      manager.completeWhenNoEnemiesRemain(0)
      scene.emit()
    }
    bridge.reportStageVictory({ runId: 'ten-wave-run', stageId: 'prototype-stage-01', occurredAtMs: 2_000 })
    bridge.reportStageVictory({ runId: 'ten-wave-run', stageId: 'prototype-stage-01', occurredAtMs: 3_000 })

    const current = repository.load()
    expect(current).toMatchObject({
      status: 'loaded',
      save: { data: { commandEnergy: { current: 50 }, wallet: { balances: { gold: 10, knb: 3 } } } },
    })
    scene.stop(); rewardRuntime.stop(); runtime.stop()
  })
})
