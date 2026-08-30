import type { CampaignChapterDefinition, BattleStageDefinition } from '../../data/campaign/definitions'
import type { CampaignProgressState } from '../meta/MetaState'

export type StageAvailability = 'locked' | 'available' | 'completed'
export function isStageCompleted(progress: CampaignProgressState, stageId: string): boolean { return Boolean(progress.completedStages[stageId]) }
export function isStageUnlocked(chapter: CampaignChapterDefinition, progress: CampaignProgressState, stageId: string): boolean {
  const index = chapter.stages.findIndex((stage) => stage.id === stageId)
  return index >= 0 && (index === 0 || isStageCompleted(progress, chapter.stages[index - 1].id))
}
export function selectStageProgress(chapter: CampaignChapterDefinition, progress: CampaignProgressState, stageId: string): StageAvailability {
  if (isStageCompleted(progress, stageId)) return 'completed'
  return isStageUnlocked(chapter, progress, stageId) ? 'available' : 'locked'
}
export function isChapterCompleted(chapter: CampaignChapterDefinition, progress: CampaignProgressState): boolean { return chapter.stages.every((stage) => isStageCompleted(progress, stage.id)) }
export function selectNextUnlockedStage(chapter: CampaignChapterDefinition, progress: CampaignProgressState): BattleStageDefinition | undefined { return chapter.stages.find((stage) => selectStageProgress(chapter, progress, stage.id) !== 'locked') }

export function completeStage(chapter: CampaignChapterDefinition, progress: CampaignProgressState, stageId: string, completedAtMs: number): CampaignProgressState {
  if (!Number.isSafeInteger(completedAtMs) || completedAtMs < 0) throw new Error('Completion timestamp must be non-negative')
  if (!chapter.stages.some((stage) => stage.id === stageId)) throw new Error(`Unknown campaign stage: ${stageId}`)
  if (isStageCompleted(progress, stageId)) return progress
  if (!isStageUnlocked(chapter, progress, stageId)) throw new Error(`Campaign stage is locked: ${stageId}`)
  return { completedStages: { ...progress.completedStages, [stageId]: { firstCompletedAtMs: completedAtMs } } }
}
