import type { WaveDefinition, WaveGroup } from './prototypeWaves'

const group = (enemyId: string, count: number, startDelayMs = 0, spawnIntervalMs = 900): WaveGroup => ({ enemyId, count, startDelayMs, spawnIntervalMs })
const prototypeStage = (stageNumber: number, includeCommander = false): readonly WaveDefinition[] => [
  { id: `bt-${stageNumber}-wave-01`, groups: [group('wu-sword-infantry', 2 + stageNumber)] },
  { id: `bt-${stageNumber}-wave-02`, groups: [group('wu-crossbow-soldier', 1 + stageNumber), group('wu-sword-infantry', 2, 900)] },
  { id: `bt-${stageNumber}-wave-03`, groups: includeCommander ? [group('wu-field-commander', 1, 0, 1400), group('wu-armored-guard', 2, 1200, 1300)] : [group('wu-armored-guard', 1 + stageNumber, 0, 1300), group('wu-crossbow-soldier', 2, 1000)] },
]

const sword = (count: number, startDelayMs = 600) => group('wu-sword-infantry', count, startDelayMs, 850)
const crossbow = (count: number, startDelayMs = 600) => group('wu-crossbow-soldier', count, startDelayMs, 1000)
const armored = (count: number, startDelayMs = 600) => group('wu-armored-guard', count, startDelayMs, 1300)
const commander = (startDelayMs = 600) => group('wu-field-commander', 1, startDelayMs, 1600)

export const baTrieuStage01Waves: readonly WaveDefinition[] = [
  { id: 'bt-01-wave-01', groups: [sword(4)] },
  { id: 'bt-01-wave-02', groups: [sword(5)] },
  { id: 'bt-01-wave-03', groups: [sword(3), crossbow(2, 900)] },
  { id: 'bt-01-wave-04', groups: [sword(6), crossbow(3, 1200)] },
  { id: 'bt-01-wave-05', groups: [armored(2), sword(5, 1200)] },
  { id: 'bt-01-wave-06', groups: [armored(2), crossbow(4, 1000), sword(4, 2200)] },
  { id: 'bt-01-wave-07', groups: [crossbow(7)] },
  { id: 'bt-01-wave-08', groups: [armored(3), sword(6, 1200)] },
  { id: 'bt-01-wave-09', groups: [armored(3), crossbow(5, 1300)] },
  { id: 'bt-01-wave-10', groups: [sword(8), crossbow(4, 1200)] },
  { id: 'bt-01-wave-11', groups: [armored(4), sword(6, 1300)] },
  { id: 'bt-01-wave-12', groups: [armored(4), crossbow(6, 1000), sword(5, 2300)] },
  { id: 'bt-01-wave-13', groups: [sword(10), crossbow(5, 1300)] },
  { id: 'bt-01-wave-14', groups: [armored(5), sword(8, 1400)] },
  { id: 'bt-01-wave-15', groups: [armored(5), crossbow(8, 1400)] },
  { id: 'bt-01-wave-16', groups: [armored(6), sword(8, 1200), crossbow(5, 2300)] },
  { id: 'bt-01-wave-17', groups: [armored(7), crossbow(8, 1200), sword(8, 2400)] },
  { id: 'bt-01-wave-18', groups: [commander(), armored(6, 900), crossbow(8, 1500), sword(10, 2400)] },
]

export const baTrieuStage02Waves: readonly WaveDefinition[] = [
  { id: 'bt-02-wave-01', groups: [sword(5)] },
  { id: 'bt-02-wave-02', groups: [sword(4), crossbow(2, 1200)] },
  { id: 'bt-02-wave-03', groups: [armored(2), sword(5, 1200)] },
  { id: 'bt-02-wave-04', groups: [crossbow(4), sword(5, 1200)] },
  { id: 'bt-02-wave-05', groups: [armored(2), crossbow(3, 1200), sword(5, 1800)] },
  { id: 'bt-02-wave-06', groups: [sword(7), crossbow(4, 1200)] },
  { id: 'bt-02-wave-07', groups: [armored(3), sword(6, 1200)] },
  { id: 'bt-02-wave-08', groups: [armored(3), crossbow(6, 1200)] },
  { id: 'bt-02-wave-09', groups: [armored(4), sword(7, 1200)] },
  { id: 'bt-02-wave-10', groups: [armored(4), crossbow(5, 1200), sword(6, 1800)] },
  { id: 'bt-02-wave-11', groups: [sword(9), crossbow(5, 1200)] },
  { id: 'bt-02-wave-12', groups: [armored(5), sword(7, 1200)] },
  { id: 'bt-02-wave-13', groups: [armored(4), crossbow(8, 1200)] },
  { id: 'bt-02-wave-14', groups: [armored(5), crossbow(7, 1200), sword(7, 1800)] },
  { id: 'bt-02-wave-15', groups: [sword(10), crossbow(7, 1200)] },
  { id: 'bt-02-wave-16', groups: [armored(6), sword(8, 1200)] },
  { id: 'bt-02-wave-17', groups: [armored(6), crossbow(9, 1200)] },
  { id: 'bt-02-wave-18', groups: [armored(7), sword(9, 1200), crossbow(5, 1800)] },
  { id: 'bt-02-wave-19', groups: [armored(8), crossbow(9, 1200), sword(8, 1800)] },
  { id: 'bt-02-wave-20', groups: [commander(), armored(7, 1200), crossbow(9, 1800), sword(10, 2400)] },
]

export const baTrieuStageWaves = [baTrieuStage01Waves, baTrieuStage02Waves, prototypeStage(3), prototypeStage(4), prototypeStage(5), prototypeStage(6, true)] as const
