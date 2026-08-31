import type { WaveDefinition, WaveGroup } from './prototypeWaves'

const group = (enemyId: string, count: number, startDelayMs = 0, spawnIntervalMs = 900): WaveGroup => ({ enemyId, count, startDelayMs, spawnIntervalMs })
const stage = (stageNumber: number, includeCommander = false): readonly WaveDefinition[] => [
  { id: `bt-${stageNumber}-wave-01`, groups: [group('wu-sword-infantry', 2 + stageNumber)] },
  { id: `bt-${stageNumber}-wave-02`, groups: [group('wu-crossbow-soldier', 1 + stageNumber), group('wu-sword-infantry', 2, 900)] },
  { id: `bt-${stageNumber}-wave-03`, groups: includeCommander ? [group('wu-field-commander', 1, 0, 1400), group('wu-armored-guard', 2, 1200, 1300)] : [group('wu-armored-guard', 1 + stageNumber, 0, 1300), group('wu-crossbow-soldier', 2, 1000)] },
]

export const baTrieuStageWaves = [stage(1), stage(2), stage(3), stage(4), stage(5), stage(6, true)] as const
