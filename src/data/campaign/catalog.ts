import type { CampaignChapterDefinition, BattleStageDefinition } from './definitions'
import type { CampaignProgressState } from '../../domain/meta/MetaState'
import { isChapterUnlocked, selectSafeStage, selectStageProgress } from '../../domain/campaign/CampaignProgression'
import { defaultCampaignChapter } from './haiBaTrungCampaign'
import { baTrieuChapter } from './baTrieuCampaign'

export type CampaignCatalogDefinition = Readonly<{ chapters: readonly CampaignChapterDefinition[] }>
export type CampaignChapterStatus = 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED'
export const productionCampaignCatalog: CampaignCatalogDefinition = { chapters: [defaultCampaignChapter, baTrieuChapter] }
export function findChapterById(catalog: CampaignCatalogDefinition, id: string): CampaignChapterDefinition | undefined { return catalog.chapters.find((chapter) => chapter.id === id) }
export function findStageById(catalog: CampaignCatalogDefinition, id: string): BattleStageDefinition | undefined { return catalog.chapters.flatMap((chapter) => chapter.stages).find((stage) => stage.id === id) }
export function findChapterForStage(catalog: CampaignCatalogDefinition, id: string): CampaignChapterDefinition | undefined { return catalog.chapters.find((chapter) => chapter.stages.some((stage) => stage.id === id)) }
export function validateCampaignCatalog(catalog: CampaignCatalogDefinition): readonly string[] { const errors: string[] = []; const chapters = new Set<string>(); const stages = new Set<string>(); catalog.chapters.forEach((chapter) => { if (!chapter.id.trim() || chapters.has(chapter.id)) errors.push(`duplicate/empty chapter: ${chapter.id}`); chapters.add(chapter.id); if (!chapter.stages.length) errors.push(`empty chapter: ${chapter.id}`); chapter.stages.forEach((stage) => { if (!stage.id.trim() || stages.has(stage.id)) errors.push(`duplicate/empty stage: ${stage.id}`); stages.add(stage.id) }) }); catalog.chapters.forEach((chapter) => { if (chapter.prerequisiteStageId && !stages.has(chapter.prerequisiteStageId)) errors.push(`unknown prerequisite stage: ${chapter.prerequisiteStageId}`) }); return errors }
export function selectSafeChapter(catalog: CampaignCatalogDefinition, selectedId: string, progress: CampaignProgressState, ownedHeroIds: readonly string[]): CampaignChapterDefinition | undefined { const selected = findChapterById(catalog, selectedId); if (selected && selectSafeStage([selected], selected.stages[0]?.id ?? '', progress, ownedHeroIds)) return selected; return catalog.chapters.find((chapter) => selectSafeStage([chapter], chapter.stages[0]?.id ?? '', progress, ownedHeroIds)) }
export function selectChapterStatus(chapter: CampaignChapterDefinition, progress: CampaignProgressState): CampaignChapterStatus { if (!isChapterUnlocked(chapter, progress)) return 'LOCKED'; if (chapter.stages.length > 0 && chapter.stages.every((stage) => selectStageProgress(chapter, progress, stage.id) === 'completed')) return 'COMPLETED'; if (chapter.stages.some((stage) => selectStageProgress(chapter, progress, stage.id) === 'completed')) return 'IN_PROGRESS'; return 'AVAILABLE' }
export function formatChapterStatusVi(status: CampaignChapterStatus): string { return status === 'LOCKED' ? 'Chưa mở' : status === 'AVAILABLE' ? 'Sẵn sàng' : status === 'IN_PROGRESS' ? 'Đang tiến hành' : 'Đã hoàn thành' }
export { selectSafeStage, selectStageProgress }
