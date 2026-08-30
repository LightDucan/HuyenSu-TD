import type { BattleStageDefinition } from '../../data/campaign/definitions'
import type { BattleSnapshot } from './BattleBridge'

export function createInitialBattleSnapshot(stage: BattleStageDefinition): BattleSnapshot {
  return { runId: `pending-${stage.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`, speed: 1, enemiesSpawned: 0, enemiesEscaped: 0, enemiesDefeated: 0, placedHeroes: [], selectedHeroId: 'trung-trac', wave: 1, totalWaves: stage.waves.length, waveStatus: 'waiting', cityHp: 10, battleStatus: 'running', remainingByCategory: { sword: 0, archer: 0, other: 0 } }
}
