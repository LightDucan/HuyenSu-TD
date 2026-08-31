import { describe, expect, it } from 'vitest'
import { defaultBattleStage } from '../../src/data/campaign/haiBaTrungCampaign'
import { selectResultNarrative, selectWaveBeat, shouldShowPreBattleNarrative } from '../../src/ui/StageNarrative'
describe('GAME-C07 narrative selectors', () => {
  it('shows intro only for incomplete play and resolves beats', () => { expect(shouldShowPreBattleNarrative(false, defaultBattleStage.narrative)).toBe(true); expect(shouldShowPreBattleNarrative(true, defaultBattleStage.narrative)).toBe(false); expect(selectWaveBeat(defaultBattleStage.narrative, 1)).toBeTruthy(); expect(selectWaveBeat(defaultBattleStage.narrative, 2)).toBeUndefined() })
  it('selects safe victory and defeat copy', () => { expect(selectResultNarrative(defaultBattleStage.narrative, 'won')).toContain('chặn'); expect(selectResultNarrative(defaultBattleStage.narrative, 'lost')).toContain('vỡ') })
})
