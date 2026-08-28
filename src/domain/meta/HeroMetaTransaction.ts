import { ascendHeroStar, evolveHero, grantHero, resolveRecruitmentBatch, type HeroRecruitmentState, type RecruitmentConfig, type RecruitmentResult } from './HeroRecruitment'
import type { MetaSaveV5 } from './MetaV5'
import { canUpgrade, upgradeLevel } from '../progression/ProgressionSystem'

export type HeroMetaOperation =
  | Readonly<{ type: 'upgrade-level'; heroId: string; cooldownEnabled?: boolean; cooldownMs?: number }>
  | Readonly<{ type: 'recruit'; count: 1 | 10; random: () => number }>
  | Readonly<{ type: 'grant-hero'; heroId: string }>
  | Readonly<{ type: 'ascend-star'; heroId: string }>
  | Readonly<{ type: 'evolve'; heroId: string }>

export type HeroMetaCommit = Readonly<{ save: MetaSaveV5; results: readonly RecruitmentResult[] }>

export function applyHeroMetaOperation(save: MetaSaveV5, operation: HeroMetaOperation, config?: RecruitmentConfig, committedAtMs = save.updatedAtMs): HeroMetaCommit {
  const base: HeroRecruitmentState = { heroCollection: save.data.heroCollection, consumables: save.data.inventory.consumables }
  let next = base
  let results: readonly RecruitmentResult[] = []
  if (operation.type === 'upgrade-level') {
    const hero = base.heroCollection[operation.heroId]
    if (!hero) throw new Error('Hero is not owned')
    const cooldownEnabled = operation.cooldownEnabled ?? false
    const cooldownMs = operation.cooldownMs ?? 3000
    if (!canUpgrade(hero.progression, committedAtMs, cooldownEnabled)) throw new Error('Hero level upgrade is not available')
    next = {
      ...base,
      heroCollection: {
        ...base.heroCollection,
        [operation.heroId]: { ...hero, progression: upgradeLevel(hero.progression, committedAtMs, cooldownMs, cooldownEnabled) },
      },
    }
  } else if (operation.type === 'recruit') {
    const resolved = resolveRecruitmentBatch(base, operation.count, operation.random, config)
    next = resolved.state; results = resolved.results
  } else if (operation.type === 'grant-hero') {
    const resolved = grantHero(base, operation.heroId, config); next = resolved.state; results = [resolved.result]
  } else if (operation.type === 'ascend-star') next = ascendHeroStar(base, operation.heroId, config)
  else next = evolveHero(base, operation.heroId, config)
  if (!Number.isSafeInteger(committedAtMs) || committedAtMs < save.updatedAtMs) throw new Error('committedAtMs must be monotonic')
  return { save: { ...save, revision: save.revision + 1, updatedAtMs: committedAtMs, data: { ...save.data, heroCollection: next.heroCollection, inventory: { ...save.data.inventory, consumables: next.consumables } } }, results }
}

export function applyHeroMetaTransaction(save: MetaSaveV5, idempotencyKey: string, operation: HeroMetaOperation, config?: RecruitmentConfig, committedAtMs = save.updatedAtMs): HeroMetaCommit {
  if (idempotencyKey.trim().length === 0) throw new Error('Hero transaction idempotency key must not be empty')
  if (!Number.isSafeInteger(committedAtMs) || committedAtMs < 0 || committedAtMs < save.updatedAtMs) throw new Error('committedAtMs must be a monotonic non-negative safe integer')
  const prior = save.data.rewardReceipts[idempotencyKey]
  const fingerprint = JSON.stringify({
    type: operation.type,
    ...(operation.type === 'recruit' ? { count: operation.count } : { heroId: operation.heroId }),
    ...(operation.type === 'upgrade-level' ? { cooldownEnabled: operation.cooldownEnabled ?? false, cooldownMs: operation.cooldownMs ?? 3000 } : {}),
  })
  if (prior) {
    if (prior.transactionFingerprint !== fingerprint) throw new Error('Idempotency key was already used with a different payload')
    return { save, results: [] }
  }
  const applied = applyHeroMetaOperation(save, operation, config, committedAtMs)
  return { ...applied, save: { ...applied.save, data: { ...applied.save.data, rewardReceipts: { ...applied.save.data.rewardReceipts, [idempotencyKey]: { transactionFingerprint: fingerprint, committedAtMs: applied.save.updatedAtMs } } } } }
}
