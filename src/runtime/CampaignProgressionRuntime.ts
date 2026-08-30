import type { CampaignChapterDefinition } from '../data/campaign/definitions'
import { completeStage } from '../domain/campaign/CampaignProgression'
import { LocalMetaRepository } from '../domain/meta/MetaRepository'
import { createRuntimeMetaRepository, ensureMetaRepositoryReady } from './RewardRuntime'
import type { StorageLike } from '../domain/progression/ProgressionStorage'
import type { BattleBridge, StageVictoryEvent } from '../game/bridge/BattleBridge'

export class CampaignProgressionRuntime {
  private readonly repository: LocalMetaRepository
  constructor(storage: StorageLike, private readonly bridge: BattleBridge, private readonly chapter: CampaignChapterDefinition) {
    this.repository = createRuntimeMetaRepository(storage, bridge)
    ensureMetaRepositoryReady(this.repository, 'local-player', Date.now())
  }
  handleStageVictory(event: StageVictoryEvent): void {
    const current = this.repository.load()
    if (current.status !== 'loaded') return
    const nextProgress = completeStage(this.chapter, current.save.data.campaignProgress, event.stageId, event.occurredAtMs)
    if (nextProgress === current.save.data.campaignProgress) return
    this.repository.save({ ...current.save.data, campaignProgress: nextProgress }, current.save.revision, event.occurredAtMs)
  }
}

let browserCampaignProgressionRuntime: CampaignProgressionRuntime | undefined
export function initializeBrowserCampaignProgressionRuntime(storage: StorageLike, bridge: BattleBridge, chapter: CampaignChapterDefinition): CampaignProgressionRuntime {
  const runtime = new CampaignProgressionRuntime(storage, bridge, chapter)
  bridge.onStageVictory((event) => runtime.handleStageVictory(event))
  browserCampaignProgressionRuntime = runtime
  return runtime
}
