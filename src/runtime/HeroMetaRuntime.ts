import { featureFlags } from '../config/features'
import { LocalMetaRepository } from '../domain/meta/MetaRepository'
import type { HeroMetaCommit, HeroMetaOperation } from '../domain/meta/HeroMetaTransaction'
import { prototypeHeroRecruitmentConfig, type RecruitmentConfig } from '../domain/meta/HeroRecruitment'
import type { MetaSave } from '../domain/meta/MetaState'
import type { StorageLike } from '../domain/progression/ProgressionStorage'
import type { BattleBridge } from '../game/bridge/BattleBridge'
import { createRuntimeMetaRepository, ensureMetaRepositoryReady, publishCurrentMetaSnapshot } from './RewardRuntime'

export type HeroMetaMutationInput = Readonly<{
  expectedRevision: number
  idempotencyKey: string
  committedAtMs: number
}>

export class HeroMetaRuntimeController {
  constructor(
    private readonly repository: LocalMetaRepository,
    private readonly bridge: BattleBridge,
    private readonly config: RecruitmentConfig = prototypeHeroRecruitmentConfig,
  ) {}

  getSnapshot(): MetaSave {
    const current = this.repository.load()
    if (current.status !== 'loaded') throw new Error('Hero Meta runtime requires a current Meta V5 save')
    return current.save
  }

  upgradeLevel(heroId: string, input: HeroMetaMutationInput): HeroMetaCommit {
    return this.mutate({ type: 'upgrade-level', heroId, cooldownEnabled: featureFlags.upgradeCooldownEnabled, cooldownMs: 3000 }, input, true)
  }

  recruit(count: 1 | 10, random: () => number, input: HeroMetaMutationInput): HeroMetaCommit {
    return this.mutate({ type: 'recruit', count, random }, input, false)
  }

  grantHero(heroId: string, input: HeroMetaMutationInput): HeroMetaCommit {
    return this.mutate({ type: 'grant-hero', heroId }, input, false)
  }

  ascendStar(heroId: string, input: HeroMetaMutationInput): HeroMetaCommit {
    return this.mutate({ type: 'ascend-star', heroId }, input, true)
  }

  evolve(heroId: string, input: HeroMetaMutationInput): HeroMetaCommit {
    return this.mutate({ type: 'evolve', heroId }, input, true)
  }

  private mutate(operation: HeroMetaOperation, input: HeroMetaMutationInput, refreshStats: boolean): HeroMetaCommit {
    const result = this.repository.transactHero({ ...input, operation, config: this.config })
    this.bridge.emitMetaSnapshot(result.save)
    if (refreshStats && result.save.revision !== input.expectedRevision) {
      const heroId = operation.type === 'recruit' ? undefined : operation.heroId
      if (heroId) this.bridge.refreshPlacedHeroStats(heroId)
    }
    return result
  }
}

let browserHeroMetaRuntime: HeroMetaRuntimeController | undefined

export function initializeBrowserHeroMetaRuntime(storage: StorageLike, bridge: BattleBridge): HeroMetaRuntimeController {
  const repository = createRuntimeMetaRepository(storage, bridge)
  ensureMetaRepositoryReady(repository, 'local-player', Date.now())
  publishCurrentMetaSnapshot(repository, bridge)
  browserHeroMetaRuntime = new HeroMetaRuntimeController(repository, bridge)
  return browserHeroMetaRuntime
}

export function getBrowserHeroMetaRuntime(): HeroMetaRuntimeController {
  if (!browserHeroMetaRuntime) throw new Error('Browser Hero Meta runtime has not been initialized')
  return browserHeroMetaRuntime
}
