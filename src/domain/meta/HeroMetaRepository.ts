import { LocalMetaRepository } from './MetaRepository'
import type { HeroMetaCommit, HeroMetaOperation } from './HeroMetaTransaction'
import type { RecruitmentConfig } from './HeroRecruitment'

/**
 * Compatibility adapter only. It delegates to the canonical LocalMetaRepository
 * and never reads or writes storage directly.
 */
export class LocalHeroMetaRepository {
  constructor(private readonly repository: LocalMetaRepository) {}

  load() {
    const current = this.repository.load()
    return current.status === 'loaded' ? current.save : undefined
  }

  transact(request: Readonly<{
    idempotencyKey: string
    operation: HeroMetaOperation
    expectedRevision: number
    committedAtMs: number
    config?: RecruitmentConfig
  }>): HeroMetaCommit {
    return this.repository.transactHero(request)
  }
}
