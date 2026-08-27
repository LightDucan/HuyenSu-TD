import { prototypeEquipmentV2Definitions } from '../data/equipment/definitions'
import { resolveHeroEquipmentV2, type EquipmentV2Operation } from '../domain/equipment/EquipmentV2'
import type { EquipmentV2Definition } from '../domain/equipment/EquipmentSystem'
import { EQUIPMENT_STORAGE_KEY, type EquipmentSave } from '../domain/equipment/EquipmentStorage'
import { LocalMetaRepository, type EquipmentV2TransactionCommit } from '../domain/meta/MetaRepository'
import type { EquipmentInstance, HeroEquipmentLoadoutV2, MetaSaveV4 } from '../domain/meta/MetaState'
import type { StorageLike } from '../domain/progression/ProgressionStorage'
import type { BattleBridge } from '../game/bridge/BattleBridge'
import { createRuntimeMetaRepository, ensureMetaRepositoryReady, publishCurrentMetaSnapshot } from './RewardRuntime'

export const LEGACY_EQUIPMENT_IMPORT_KEY = 'migration/equipment-v1-to-meta-v4'

function assertLegacyEquipmentSave(value: unknown): EquipmentSave {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('Legacy Equipment V1 save must be an object')
  const candidate = value as Partial<EquipmentSave>
  if (candidate.version !== 1 || typeof candidate.heroes !== 'object' || candidate.heroes === null || Array.isArray(candidate.heroes)) {
    throw new Error('Legacy Equipment V1 save is invalid')
  }
  for (const [heroId, loadout] of Object.entries(candidate.heroes)) {
    if (heroId.trim().length === 0 || typeof loadout !== 'object' || loadout === null || Array.isArray(loadout)) throw new Error('Legacy Equipment V1 loadout is invalid')
    const keys = Object.keys(loadout)
    if (keys.some((key) => key !== 'weaponId' && key !== 'gemId')) throw new Error('Legacy Equipment V1 loadout contains unknown fields')
    const typed = loadout as { weaponId?: unknown; gemId?: unknown }
    if (typed.weaponId !== undefined && (typeof typed.weaponId !== 'string' || typed.weaponId.trim().length === 0)) throw new Error('Legacy weapon definition ID is invalid')
    if (typed.gemId !== undefined && (typeof typed.gemId !== 'string' || typed.gemId.trim().length === 0)) throw new Error('Legacy gem definition ID is invalid')
  }
  return candidate as EquipmentSave
}

function legacyInstanceId(heroId: string, slot: 'weapon' | 'gem', definitionId: string): string {
  return `legacy-v1:${encodeURIComponent(heroId)}:${slot}:${encodeURIComponent(definitionId)}`
}

export function buildLegacyEquipmentImportOperation(
  legacy: EquipmentSave,
  definitions: Readonly<Record<string, EquipmentV2Definition>>,
): Extract<EquipmentV2Operation, { type: 'import-legacy' }> {
  const instances: EquipmentInstance[] = []
  const equippedByHero: Record<string, HeroEquipmentLoadoutV2> = {}
  Object.keys(legacy.heroes).sort().forEach((heroId) => {
    const loadout = legacy.heroes[heroId]
    const next: { weaponInstanceId?: string; gemInstanceId?: string } = {}
    for (const [slot, definitionId] of [['weapon', loadout.weaponId], ['gem', loadout.gemId]] as const) {
      if (!definitionId) continue
      const definition = definitions[definitionId]
      if (!definition) throw new Error(`Legacy Equipment V1 references unknown definition: ${definitionId}`)
      if (definition.slot !== slot) throw new Error(`Legacy Equipment V1 ${slot} uses a wrong-slot definition`)
      const instanceId = legacyInstanceId(heroId, slot, definitionId)
      instances.push({ instanceId, definitionId, slot, level: 1 })
      if (slot === 'weapon') next.weaponInstanceId = instanceId
      else next.gemInstanceId = instanceId
    }
    if (next.weaponInstanceId || next.gemInstanceId) equippedByHero[heroId] = next
  })
  return { type: 'import-legacy', instances, equippedByHero }
}

export class EquipmentV2RuntimeController {
  constructor(
    private readonly repository: LocalMetaRepository,
    private readonly bridge: BattleBridge,
    private readonly definitions: Readonly<Record<string, EquipmentV2Definition>> = prototypeEquipmentV2Definitions,
  ) {}

  getSnapshot(): MetaSaveV4 {
    const current = this.repository.load()
    if (current.status !== 'loaded') throw new Error('Equipment V2 runtime requires a current Meta V4 save')
    return current.save
  }

  importLegacy(storage: StorageLike, nowMs: number): EquipmentV2TransactionCommit | undefined {
    const raw = storage.getItem(EQUIPMENT_STORAGE_KEY)
    if (raw === null) return undefined
    let parsed: unknown
    try { parsed = JSON.parse(raw) } catch { throw new Error('Legacy Equipment V1 save is not valid JSON') }
    const operation = buildLegacyEquipmentImportOperation(assertLegacyEquipmentSave(parsed), this.definitions)
    if (operation.instances.length === 0) return undefined
    const current = this.getSnapshot()
    const result = this.repository.transactEquipment(
      { idempotencyKey: LEGACY_EQUIPMENT_IMPORT_KEY, operation },
      this.definitions,
      current.revision,
      nowMs,
    )
    result.affectedHeroIds.forEach((heroId) => this.bridge.refreshPlacedHeroStats(heroId))
    return result
  }

  transact(
    operation: EquipmentV2Operation,
    expectedRevision: number,
    idempotencyKey: string,
    nowMs: number,
  ): EquipmentV2TransactionCommit {
    const result = this.repository.transactEquipment({ idempotencyKey, operation }, this.definitions, expectedRevision, nowMs)
    result.affectedHeroIds.forEach((heroId) => this.bridge.refreshPlacedHeroStats(heroId))
    return result
  }

  resolveHero(heroId: string) {
    return resolveHeroEquipmentV2(this.getSnapshot().data, heroId, this.definitions)
  }

  getDefinitions(): Readonly<Record<string, EquipmentV2Definition>> { return this.definitions }
}

let browserEquipmentRuntime: EquipmentV2RuntimeController | undefined

export function initializeBrowserEquipmentV2Runtime(storage: StorageLike, bridge: BattleBridge): EquipmentV2RuntimeController {
  const repository = createRuntimeMetaRepository(storage, bridge)
  const nowMs = Date.now()
  ensureMetaRepositoryReady(repository, 'local-player', nowMs)
  publishCurrentMetaSnapshot(repository, bridge)
  const runtime = new EquipmentV2RuntimeController(repository, bridge)
  runtime.importLegacy(storage, nowMs)
  browserEquipmentRuntime = runtime
  return runtime
}

export function getBrowserEquipmentV2Runtime(): EquipmentV2RuntimeController {
  if (!browserEquipmentRuntime) throw new Error('Browser Equipment V2 runtime has not been initialized')
  return browserEquipmentRuntime
}
