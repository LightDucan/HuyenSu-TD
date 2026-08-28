import type { StorageLike } from '../progression/ProgressionStorage'
import { META_STORAGE_KEY } from './MetaRepository'
import { applyHeroMetaTransaction, type HeroMetaCommit, type HeroMetaOperation } from './HeroMetaTransaction'
import type { MetaSaveV5 } from './MetaV5'
import type { RecruitmentConfig } from './HeroRecruitment'

export class LocalHeroMetaRepository {
  constructor(private readonly storage: StorageLike, private readonly onPersist?: (save: MetaSaveV5) => void) {}

  load(): MetaSaveV5 | undefined {
    const raw = this.storage.getItem(META_STORAGE_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw) as MetaSaveV5
    if (parsed.schemaVersion !== 5 || !parsed.data?.heroCollection) throw new Error('Meta save is not V5')
    return parsed
  }

  transact(request: Readonly<{ idempotencyKey: string; operation: HeroMetaOperation; expectedRevision: number; config?: RecruitmentConfig }>): HeroMetaCommit {
    const current = this.load()
    if (!current) throw new Error('Hero Meta transaction requires a V5 save')
    if (current.revision !== request.expectedRevision) throw new Error(`Meta save revision conflict: expected ${request.expectedRevision}, actual ${current.revision}`)
    const result = applyHeroMetaTransaction(current, request.idempotencyKey, request.operation, request.config)
    if (result.save === current) return result
    this.storage.setItem(META_STORAGE_KEY, JSON.stringify(result.save))
    this.onPersist?.(result.save)
    return result
  }
}
