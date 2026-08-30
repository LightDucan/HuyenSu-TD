import type { CampaignChapterDefinition } from '../data/campaign/definitions'
import { completeStage } from '../domain/campaign/CampaignProgression'
import { LocalMetaRepository } from '../domain/meta/MetaRepository'
import { createRuntimeMetaRepository, ensureMetaRepositoryReady } from './RewardRuntime'
import type { StorageLike } from '../domain/progression/ProgressionStorage'
import type { BattleBridge, StageVictoryEvent } from '../game/bridge/BattleBridge'

export class CampaignProgressionRuntime {
  private readonly repository: LocalMetaRepository
  private readonly chapters: readonly CampaignChapterDefinition[]
  constructor(storage: StorageLike, private readonly bridge: BattleBridge, chapters: readonly CampaignChapterDefinition[] | CampaignChapterDefinition) {
    this.chapters = Array.isArray(chapters) ? chapters : [chapters]
    this.repository = createRuntimeMetaRepository(storage, bridge)
    ensureMetaRepositoryReady(this.repository, 'local-player', Date.now())
  }
  handleStageVictory(event: StageVictoryEvent): void {
    const chapter = this.chapters.find((candidate) => candidate.stages.some((stage) => stage.id === event.stageId))
    if (!chapter) return
    const current = this.repository.load()
    if (current.status !== 'loaded') return
    const nextProgress = completeStage(chapter, current.save.data.campaignProgress, event.stageId, event.occurredAtMs)
    if (nextProgress === current.save.data.campaignProgress) return
    this.repository.save({ ...current.save.data, campaignProgress: nextProgress }, current.save.revision, event.occurredAtMs)
  }
}

let browserCampaignProgressionRuntime: CampaignProgressionRuntime | undefined
export function initializeBrowserCampaignProgressionRuntime(storage: StorageLike, bridge: BattleBridge, chapters: readonly CampaignChapterDefinition[]): CampaignProgressionRuntime {
  const runtime = new CampaignProgressionRuntime(storage, bridge, chapters)
  bridge.onStageVictory((event) => runtime.handleStageVictory(event))
  browserCampaignProgressionRuntime = runtime
  return runtime
}
