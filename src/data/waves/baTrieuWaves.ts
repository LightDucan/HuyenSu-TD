import type { WaveDefinition, WaveGroup } from './prototypeWaves'

const group = (enemyId: string, count: number, startDelayMs = 0, spawnIntervalMs = 900): WaveGroup => ({ enemyId, count, startDelayMs, spawnIntervalMs })
const prototypeStage = (stageNumber: number, includeCommander = false): readonly WaveDefinition[] => [
  { id: `bt-${stageNumber}-wave-01`, groups: [group('wu-sword-infantry', 2 + stageNumber)] },
  { id: `bt-${stageNumber}-wave-02`, groups: [group('wu-crossbow-soldier', 1 + stageNumber), group('wu-sword-infantry', 2, 900)] },
  { id: `bt-${stageNumber}-wave-03`, groups: includeCommander ? [group('wu-field-commander', 1, 0, 1400), group('wu-armored-guard', 2, 1200, 1300)] : [group('wu-armored-guard', 1 + stageNumber, 0, 1300), group('wu-crossbow-soldier', 2, 1000)] },
]

const sword = (count: number, startDelayMs = 0) => group('wu-sword-infantry', count, startDelayMs, 850)
const crossbow = (count: number, startDelayMs = 0) => group('wu-crossbow-soldier', count, startDelayMs, 1000)
const armored = (count: number, startDelayMs = 0) => group('wu-armored-guard', count, startDelayMs, 1300)
const commander = (startDelayMs = 0) => group('wu-field-commander', 1, startDelayMs, 1600)
const stage02Sword = (count: number, startDelayMs = 600) => group('wu-sword-infantry', count, startDelayMs, 850)
const stage02Crossbow = (count: number, startDelayMs = 600) => group('wu-crossbow-soldier', count, startDelayMs, 1000)
const stage02Armored = (count: number, startDelayMs = 600) => group('wu-armored-guard', count, startDelayMs, 1300)
const stage02Commander = (startDelayMs = 600) => group('wu-field-commander', 1, startDelayMs, 1600)
const stage03Sword = (count: number, startDelayMs = 600) => group('wu-sword-infantry', count, startDelayMs, 825)
const stage03Crossbow = (count: number, startDelayMs = 600) => group('wu-crossbow-soldier', count, startDelayMs, 950)
const stage03Armored = (count: number, startDelayMs = 600) => group('wu-armored-guard', count, startDelayMs, 1250)
const stage03Commander = (startDelayMs = 600) => group('wu-field-commander', 1, startDelayMs, 1600)
const stage04Sword = (count: number, startDelayMs = 600) => group('wu-sword-infantry', count, startDelayMs, 800)
const stage04Crossbow = (count: number, startDelayMs = 600) => group('wu-crossbow-soldier', count, startDelayMs, 950)
const stage04Armored = (count: number, startDelayMs = 600) => group('wu-armored-guard', count, startDelayMs, 1200)
const stage04Commander = (startDelayMs = 600) => group('wu-field-commander', 1, startDelayMs, 1550)
const stage05Sword = (count: number, startDelayMs = 600) => group('wu-sword-infantry', count, startDelayMs, 775)
const stage05Crossbow = (count: number, startDelayMs = 600) => group('wu-crossbow-soldier', count, startDelayMs, 900)
const stage05Armored = (count: number, startDelayMs = 600) => group('wu-armored-guard', count, startDelayMs, 1125)
const stage05Commander = (startDelayMs = 600) => group('wu-field-commander', 1, startDelayMs, 1500)
const stage06Sword = (count: number, startDelayMs = 600) => group('wu-sword-infantry', count, startDelayMs, 750)
const stage06Crossbow = (count: number, startDelayMs = 600) => group('wu-crossbow-soldier', count, startDelayMs, 875)
const stage06Armored = (count: number, startDelayMs = 600) => group('wu-armored-guard', count, startDelayMs, 1075)
const stage06Commander = (startDelayMs = 600) => group('wu-field-commander', 1, startDelayMs, 1450)

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
  { id: 'bt-02-wave-01', groups: [stage02Sword(5)] },
  { id: 'bt-02-wave-02', groups: [stage02Sword(4), stage02Crossbow(2, 1200)] },
  { id: 'bt-02-wave-03', groups: [stage02Armored(2), stage02Sword(5, 1200)] },
  { id: 'bt-02-wave-04', groups: [stage02Crossbow(4), stage02Sword(5, 1200)] },
  { id: 'bt-02-wave-05', groups: [stage02Armored(2), stage02Crossbow(3, 1200), stage02Sword(5, 1800)] },
  { id: 'bt-02-wave-06', groups: [stage02Sword(7), stage02Crossbow(4, 1200)] },
  { id: 'bt-02-wave-07', groups: [stage02Armored(3), stage02Sword(6, 1200)] },
  { id: 'bt-02-wave-08', groups: [stage02Armored(3), stage02Crossbow(6, 1200)] },
  { id: 'bt-02-wave-09', groups: [stage02Armored(4), stage02Sword(7, 1200)] },
  { id: 'bt-02-wave-10', groups: [stage02Armored(4), stage02Crossbow(5, 1200), stage02Sword(6, 1800)] },
  { id: 'bt-02-wave-11', groups: [stage02Sword(9), stage02Crossbow(5, 1200)] },
  { id: 'bt-02-wave-12', groups: [stage02Armored(5), stage02Sword(7, 1200)] },
  { id: 'bt-02-wave-13', groups: [stage02Armored(4), stage02Crossbow(8, 1200)] },
  { id: 'bt-02-wave-14', groups: [stage02Armored(5), stage02Crossbow(7, 1200), stage02Sword(7, 1800)] },
  { id: 'bt-02-wave-15', groups: [stage02Sword(10), stage02Crossbow(7, 1200)] },
  { id: 'bt-02-wave-16', groups: [stage02Armored(6), stage02Sword(8, 1200)] },
  { id: 'bt-02-wave-17', groups: [stage02Armored(6), stage02Crossbow(9, 1200)] },
  { id: 'bt-02-wave-18', groups: [stage02Armored(7), stage02Sword(9, 1200), stage02Crossbow(5, 1800)] },
  { id: 'bt-02-wave-19', groups: [stage02Armored(8), stage02Crossbow(9, 1200), stage02Sword(8, 1800)] },
  { id: 'bt-02-wave-20', groups: [stage02Commander(), stage02Armored(7, 1200), stage02Crossbow(9, 1800), stage02Sword(10, 2400)] },
]

export const baTrieuStage03Waves: readonly WaveDefinition[] = [
  { id: 'bt-03-wave-01', groups: [stage03Sword(6)] },
  { id: 'bt-03-wave-02', groups: [stage03Sword(5), stage03Crossbow(3, 1100)] },
  { id: 'bt-03-wave-03', groups: [stage03Armored(2), stage03Sword(6, 1100)] },
  { id: 'bt-03-wave-04', groups: [stage03Crossbow(5), stage03Sword(6, 1100)] },
  { id: 'bt-03-wave-05', groups: [stage03Armored(2), stage03Crossbow(4, 1100), stage03Sword(6, 1700)] },
  { id: 'bt-03-wave-06', groups: [stage03Sword(8), stage03Crossbow(4, 1100)] },
  { id: 'bt-03-wave-07', groups: [stage03Armored(3), stage03Sword(7, 1100)] },
  { id: 'bt-03-wave-08', groups: [stage03Armored(3), stage03Crossbow(7, 1100)] },
  { id: 'bt-03-wave-09', groups: [stage03Armored(4), stage03Sword(8, 1100)] },
  { id: 'bt-03-wave-10', groups: [stage03Armored(4), stage03Crossbow(6, 1100), stage03Sword(7, 1700)] },
  { id: 'bt-03-wave-11', groups: [stage03Sword(10), stage03Crossbow(6, 1100)] },
  { id: 'bt-03-wave-12', groups: [stage03Armored(5), stage03Sword(8, 1100)] },
  { id: 'bt-03-wave-13', groups: [stage03Armored(5), stage03Crossbow(8, 1100)] },
  { id: 'bt-03-wave-14', groups: [stage03Armored(5), stage03Crossbow(8, 1100), stage03Sword(8, 1700)] },
  { id: 'bt-03-wave-15', groups: [stage03Sword(11), stage03Crossbow(8, 1100)] },
  { id: 'bt-03-wave-16', groups: [stage03Armored(6), stage03Sword(9, 1100)] },
  { id: 'bt-03-wave-17', groups: [stage03Armored(6), stage03Crossbow(10, 1100)] },
  { id: 'bt-03-wave-18', groups: [stage03Armored(7), stage03Sword(10, 1100), stage03Crossbow(6, 1700)] },
  { id: 'bt-03-wave-19', groups: [stage03Armored(8), stage03Crossbow(10, 1100), stage03Sword(9, 1700)] },
  { id: 'bt-03-wave-20', groups: [stage03Armored(8), stage03Sword(11, 1100), stage03Crossbow(7, 1700)] },
  { id: 'bt-03-wave-21', groups: [stage03Armored(9), stage03Crossbow(10, 1100), stage03Sword(10, 1700)] },
  { id: 'bt-03-wave-22', groups: [stage03Commander(), stage03Armored(8, 1100), stage03Crossbow(10, 1700), stage03Sword(12, 2300)] },
]

export const baTrieuStage04Waves: readonly WaveDefinition[] = [
  { id: 'bt-04-wave-01', groups: [stage04Sword(6)] },
  { id: 'bt-04-wave-02', groups: [stage04Sword(5), stage04Crossbow(3, 1100)] },
  { id: 'bt-04-wave-03', groups: [stage04Armored(3), stage04Sword(6, 1100)] },
  { id: 'bt-04-wave-04', groups: [stage04Armored(4), stage04Sword(5, 1100)] },
  { id: 'bt-04-wave-05', groups: [stage04Armored(3), stage04Crossbow(4, 1100), stage04Sword(6, 1700)] },
  { id: 'bt-04-wave-06', groups: [stage04Armored(5), stage04Sword(5, 1100)] },
  { id: 'bt-04-wave-07', groups: [stage04Armored(4), stage04Crossbow(6, 1100)] },
  { id: 'bt-04-wave-08', groups: [stage04Armored(5), stage04Sword(7, 1100)] },
  { id: 'bt-04-wave-09', groups: [stage04Armored(5), stage04Crossbow(6, 1100), stage04Sword(6, 1700)] },
  { id: 'bt-04-wave-10', groups: [stage04Armored(6), stage04Sword(8, 1100)] },
  { id: 'bt-04-wave-11', groups: [stage04Armored(6), stage04Crossbow(7, 1100)] },
  { id: 'bt-04-wave-12', groups: [stage04Armored(6), stage04Crossbow(7, 1100), stage04Sword(7, 1700)] },
  { id: 'bt-04-wave-13', groups: [stage04Armored(7), stage04Sword(9, 1100)] },
  { id: 'bt-04-wave-14', groups: [stage04Armored(7), stage04Crossbow(8, 1100)] },
  { id: 'bt-04-wave-15', groups: [stage04Armored(7), stage04Crossbow(8, 1100), stage04Sword(8, 1700)] },
  { id: 'bt-04-wave-16', groups: [stage04Armored(8), stage04Sword(10, 1100)] },
  { id: 'bt-04-wave-17', groups: [stage04Armored(8), stage04Crossbow(9, 1100)] },
  { id: 'bt-04-wave-18', groups: [stage04Armored(8), stage04Crossbow(9, 1100), stage04Sword(9, 1700)] },
  { id: 'bt-04-wave-19', groups: [stage04Armored(9), stage04Sword(11, 1100)] },
  { id: 'bt-04-wave-20', groups: [stage04Armored(9), stage04Crossbow(10, 1100)] },
  { id: 'bt-04-wave-21', groups: [stage04Armored(9), stage04Crossbow(10, 1100), stage04Sword(10, 1700)] },
  { id: 'bt-04-wave-22', groups: [stage04Armored(10), stage04Sword(11, 1100), stage04Crossbow(8, 1700)] },
  { id: 'bt-04-wave-23', groups: [stage04Armored(10), stage04Crossbow(11, 1100), stage04Sword(10, 1700)] },
  { id: 'bt-04-wave-24', groups: [stage04Commander(), stage04Armored(10, 1100), stage04Crossbow(12, 1700), stage04Sword(12, 2300)] },
]

export const baTrieuStage05Waves: readonly WaveDefinition[] = [
  { id: 'bt-05-wave-01', groups: [stage05Sword(7)] },
  { id: 'bt-05-wave-02', groups: [stage05Sword(6), stage05Crossbow(4, 1050)] },
  { id: 'bt-05-wave-03', groups: [stage05Armored(4), stage05Sword(7, 1050)] },
  { id: 'bt-05-wave-04', groups: [stage05Armored(5), stage05Crossbow(6, 1050)] },
  { id: 'bt-05-wave-05', groups: [stage05Armored(4), stage05Crossbow(5, 1050), stage05Sword(7, 1650)] },
  { id: 'bt-05-wave-06', groups: [stage05Sword(8), stage05Crossbow(6, 1050)] },
  { id: 'bt-05-wave-07', groups: [stage05Armored(5), stage05Sword(8, 1050)] },
  { id: 'bt-05-wave-08', groups: [stage05Armored(5), stage05Crossbow(8, 1050)] },
  { id: 'bt-05-wave-09', groups: [stage05Armored(6), stage05Sword(8, 1050), stage05Crossbow(6, 1650)] },
  { id: 'bt-05-wave-10', groups: [stage05Armored(7), stage05Sword(9, 1050)] },
  { id: 'bt-05-wave-11', groups: [stage05Armored(7), stage05Crossbow(8, 1050)] },
  { id: 'bt-05-wave-12', groups: [stage05Armored(7), stage05Crossbow(8, 1050), stage05Sword(9, 1650)] },
  { id: 'bt-05-wave-13', groups: [stage05Armored(8), stage05Sword(10, 1050)] },
  { id: 'bt-05-wave-14', groups: [stage05Armored(8), stage05Crossbow(9, 1050)] },
  { id: 'bt-05-wave-15', groups: [stage05Armored(8), stage05Crossbow(9, 1050), stage05Sword(10, 1650)] },
  { id: 'bt-05-wave-16', groups: [stage05Armored(9), stage05Sword(11, 1050)] },
  { id: 'bt-05-wave-17', groups: [stage05Armored(9), stage05Crossbow(10, 1050)] },
  { id: 'bt-05-wave-18', groups: [stage05Armored(9), stage05Crossbow(10, 1050), stage05Sword(11, 1650)] },
  { id: 'bt-05-wave-19', groups: [stage05Armored(10), stage05Sword(12, 1050)] },
  { id: 'bt-05-wave-20', groups: [stage05Armored(10), stage05Crossbow(11, 1050)] },
  { id: 'bt-05-wave-21', groups: [stage05Armored(10), stage05Crossbow(11, 1050), stage05Sword(12, 1650)] },
  { id: 'bt-05-wave-22', groups: [stage05Armored(11), stage05Sword(13, 1050)] },
  { id: 'bt-05-wave-23', groups: [stage05Armored(11), stage05Crossbow(12, 1050)] },
  { id: 'bt-05-wave-24', groups: [stage05Armored(11), stage05Crossbow(12, 1050), stage05Sword(13, 1650)] },
  { id: 'bt-05-wave-25', groups: [stage05Armored(12), stage05Crossbow(13, 1050), stage05Sword(13, 1650)] },
  { id: 'bt-05-wave-26', groups: [stage05Commander(600), stage05Armored(12, 1050), stage05Crossbow(14, 1650), stage05Sword(14, 2250)] },
]

export const baTrieuStage06Waves: readonly WaveDefinition[] = [
  { id: 'bt-06-wave-01', groups: [stage06Sword(8)] },
  { id: 'bt-06-wave-02', groups: [stage06Sword(7), stage06Crossbow(4, 1000)] },
  { id: 'bt-06-wave-03', groups: [stage06Armored(4), stage06Sword(8, 1000)] },
  { id: 'bt-06-wave-04', groups: [stage06Armored(5), stage06Crossbow(7, 1000)] },
  { id: 'bt-06-wave-05', groups: [stage06Armored(5), stage06Crossbow(5, 1000), stage06Sword(8, 1550)] },
  { id: 'bt-06-wave-06', groups: [stage06Sword(9), stage06Crossbow(7, 1000)] },
  { id: 'bt-06-wave-07', groups: [stage06Armored(6), stage06Sword(9, 1000)] },
  { id: 'bt-06-wave-08', groups: [stage06Armored(6), stage06Crossbow(8, 1000)] },
  { id: 'bt-06-wave-09', groups: [stage06Armored(6), stage06Crossbow(8, 1000), stage06Sword(9, 1550)] },
  { id: 'bt-06-wave-10', groups: [stage06Armored(7), stage06Sword(10, 1000)] },
  { id: 'bt-06-wave-11', groups: [stage06Armored(7), stage06Crossbow(9, 1000)] },
  { id: 'bt-06-wave-12', groups: [stage06Armored(7), stage06Crossbow(9, 1000), stage06Sword(10, 1550)] },
  { id: 'bt-06-wave-13', groups: [stage06Armored(8), stage06Sword(11, 1000)] },
  { id: 'bt-06-wave-14', groups: [stage06Armored(8), stage06Crossbow(10, 1000)] },
  { id: 'bt-06-wave-15', groups: [stage06Armored(8), stage06Crossbow(10, 1000), stage06Sword(11, 1550)] },
  { id: 'bt-06-wave-16', groups: [stage06Armored(9), stage06Sword(12, 1000)] },
  { id: 'bt-06-wave-17', groups: [stage06Armored(9), stage06Crossbow(11, 1000)] },
  { id: 'bt-06-wave-18', groups: [stage06Armored(9), stage06Crossbow(11, 1000), stage06Sword(12, 1550)] },
  { id: 'bt-06-wave-19', groups: [stage06Armored(10), stage06Sword(13, 1000)] },
  { id: 'bt-06-wave-20', groups: [stage06Armored(10), stage06Crossbow(12, 1000)] },
  { id: 'bt-06-wave-21', groups: [stage06Armored(10), stage06Crossbow(12, 1000), stage06Sword(13, 1550)] },
  { id: 'bt-06-wave-22', groups: [stage06Armored(11), stage06Sword(14, 1000)] },
  { id: 'bt-06-wave-23', groups: [stage06Armored(11), stage06Crossbow(13, 1000)] },
  { id: 'bt-06-wave-24', groups: [stage06Armored(11), stage06Crossbow(13, 1000), stage06Sword(14, 1550)] },
  { id: 'bt-06-wave-25', groups: [stage06Armored(12), stage06Sword(15, 1000)] },
  { id: 'bt-06-wave-26', groups: [stage06Armored(12), stage06Crossbow(14, 1000), stage06Sword(15, 1550)] },
  { id: 'bt-06-wave-27', groups: [stage06Armored(13), stage06Crossbow(15, 1000), stage06Sword(16, 1550)] },
  { id: 'bt-06-wave-28', groups: [stage06Commander(600), stage06Armored(13, 1000), stage06Crossbow(16, 1550), stage06Sword(17, 2150)] },
]

export const baTrieuStageWaves = [baTrieuStage01Waves, baTrieuStage02Waves, baTrieuStage03Waves, baTrieuStage04Waves, baTrieuStage05Waves, baTrieuStage06Waves] as const
