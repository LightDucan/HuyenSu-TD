import type { StageNarrativeDefinition } from '../data/campaign/definitions'
export function shouldShowPreBattleNarrative(completed: boolean, narrative?: StageNarrativeDefinition): boolean { return !completed && Boolean(narrative?.preBattle) }
export function selectWaveBeat(narrative: StageNarrativeDefinition | undefined, wave: number): string | undefined { return narrative?.waveBeats.find((beat) => beat.wave === wave)?.text }
export function selectResultNarrative(narrative: StageNarrativeDefinition | undefined, result: 'won' | 'lost'): string { return result === 'won' ? (narrative?.victory ?? 'Đợt tiến công đã bị chặn lại.') : (narrative?.defeat ?? 'Phòng tuyến đã vỡ. Hãy chuẩn bị lại đội hình.') }
