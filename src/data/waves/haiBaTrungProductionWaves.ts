import type { WaveDefinition, WaveGroup } from './prototypeWaves'

const group = (enemyId: WaveGroup['enemyId'], count: number, startDelayMs: number, spawnIntervalMs: number): WaveGroup => ({ enemyId, count, startDelayMs, spawnIntervalMs })
const s02 = (count: number, delay = 0) => group('han-sword-infantry', count, delay, 850)
const c02 = (count: number, delay = 0) => group('han-crossbow-soldier', count, delay, 1000)
const a02 = (count: number, delay = 0) => group('han-armored-guard', count, delay, 1300)
const s03 = (count: number, delay = 0) => group('han-sword-infantry', count, delay, 825)
const c03 = (count: number, delay = 1050) => group('han-crossbow-soldier', count, delay, 950)
const a03 = (count: number, delay = 0) => group('han-armored-guard', count, delay, 1250)

export const haiBaTrungStage02Waves: readonly WaveDefinition[] = [
  { id: 'hbt-02-wave-01', groups: [s02(5)] }, { id: 'hbt-02-wave-02', groups: [s02(4), c02(2, 1100)] },
  { id: 'hbt-02-wave-03', groups: [a02(2), s02(5, 1100)] }, { id: 'hbt-02-wave-04', groups: [c02(4), s02(5, 1100)] },
  { id: 'hbt-02-wave-05', groups: [a02(2), c02(3, 1100), s02(5, 1700)] }, { id: 'hbt-02-wave-06', groups: [s02(7), c02(4, 1100)] },
  { id: 'hbt-02-wave-07', groups: [a02(3), s02(6, 1100)] }, { id: 'hbt-02-wave-08', groups: [a02(3), c02(6, 1100)] },
  { id: 'hbt-02-wave-09', groups: [a02(4), s02(7, 1100)] }, { id: 'hbt-02-wave-10', groups: [a02(4), c02(5, 1100), s02(6, 1700)] },
  { id: 'hbt-02-wave-11', groups: [s02(9), c02(5, 1100)] }, { id: 'hbt-02-wave-12', groups: [a02(5), s02(7, 1100)] },
  { id: 'hbt-02-wave-13', groups: [a02(4), c02(8, 1100)] }, { id: 'hbt-02-wave-14', groups: [a02(5), c02(7, 1100), s02(7, 1700)] },
  { id: 'hbt-02-wave-15', groups: [s02(10), c02(7, 1100)] }, { id: 'hbt-02-wave-16', groups: [a02(6), s02(8, 1100)] },
  { id: 'hbt-02-wave-17', groups: [a02(6), c02(9, 1100)] }, { id: 'hbt-02-wave-18', groups: [a02(7), s02(9, 1100), c02(5, 1700)] },
  { id: 'hbt-02-wave-19', groups: [a02(8), c02(9, 1100), s02(8, 1700)] }, { id: 'hbt-02-wave-20', groups: [a02(8), s02(10, 1100), c02(6, 1700)] },
  { id: 'hbt-02-wave-21', groups: [a02(9), c02(10, 1100), s02(9, 1700)] }, { id: 'hbt-02-wave-22', groups: [a02(9), c02(11, 1100), s02(11, 1700)] },
]

export const haiBaTrungStage03Waves: readonly WaveDefinition[] = [
  { id: 'hbt-03-wave-01', groups: [s03(6)] }, { id: 'hbt-03-wave-02', groups: [s03(5), c03(3)] },
  { id: 'hbt-03-wave-03', groups: [a03(2), s03(6, 1050)] }, { id: 'hbt-03-wave-04', groups: [c03(5, 0), s03(6, 1050)] },
  { id: 'hbt-03-wave-05', groups: [a03(2), c03(4), s03(6, 1650)] }, { id: 'hbt-03-wave-06', groups: [s03(8), c03(4)] },
  { id: 'hbt-03-wave-07', groups: [a03(3), s03(7, 1050)] }, { id: 'hbt-03-wave-08', groups: [a03(3), c03(7)] },
  { id: 'hbt-03-wave-09', groups: [a03(4), s03(8, 1050)] }, { id: 'hbt-03-wave-10', groups: [a03(4), c03(6), s03(7, 1650)] },
  { id: 'hbt-03-wave-11', groups: [s03(10), c03(6)] }, { id: 'hbt-03-wave-12', groups: [a03(5), s03(8, 1050)] },
  { id: 'hbt-03-wave-13', groups: [a03(5), c03(8)] }, { id: 'hbt-03-wave-14', groups: [a03(5), c03(8), s03(8, 1650)] },
  { id: 'hbt-03-wave-15', groups: [s03(11), c03(8)] }, { id: 'hbt-03-wave-16', groups: [a03(6), s03(9, 1050)] },
  { id: 'hbt-03-wave-17', groups: [a03(6), c03(10)] }, { id: 'hbt-03-wave-18', groups: [a03(7), s03(10, 1050), c03(6, 1650)] },
  { id: 'hbt-03-wave-19', groups: [a03(7), c03(8), s03(7, 1650)] }, { id: 'hbt-03-wave-20', groups: [a03(7), s03(9, 1050), c03(6, 1650)] },
  { id: 'hbt-03-wave-21', groups: [a03(8), c03(8), s03(7, 1650)] }, { id: 'hbt-03-wave-22', groups: [a03(8), s03(9, 1050), c03(7, 1650)] },
  { id: 'hbt-03-wave-23', groups: [a03(9), c03(9), s03(7, 1650)] }, { id: 'hbt-03-wave-24', groups: [a03(9), c03(10), s03(8, 1650)] },
]

const s04 = (count: number, delay = 0) => group('han-sword-infantry', count, delay, 800)
const c04 = (count: number, delay = 0) => group('han-crossbow-soldier', count, delay, 925)
const a04 = (count: number, delay = 0) => group('han-armored-guard', count, delay, 1200)

export const haiBaTrungStage04Waves: readonly WaveDefinition[] = [
  { id: 'hbt-04-wave-01', groups: [s04(7)] }, { id: 'hbt-04-wave-02', groups: [s04(6), c04(3, 1000)] },
  { id: 'hbt-04-wave-03', groups: [a04(2), s04(7, 1000)] }, { id: 'hbt-04-wave-04', groups: [c04(5), s04(7, 1000)] },
  { id: 'hbt-04-wave-05', groups: [a04(3), c04(4, 1000), s04(7, 1550)] }, { id: 'hbt-04-wave-06', groups: [s04(10), c04(5, 1000)] },
  { id: 'hbt-04-wave-07', groups: [a04(4), s04(9, 1000)] }, { id: 'hbt-04-wave-08', groups: [a04(4), c04(8, 1000)] },
  { id: 'hbt-04-wave-09', groups: [a04(4), s04(10, 1000)] }, { id: 'hbt-04-wave-10', groups: [a04(5), c04(7, 1000), s04(8, 1550)] },
  { id: 'hbt-04-wave-11', groups: [s04(11), c04(7, 1000)] }, { id: 'hbt-04-wave-12', groups: [a04(5), s04(10, 1000)] },
  { id: 'hbt-04-wave-13', groups: [a04(5), c04(10, 1000)] }, { id: 'hbt-04-wave-14', groups: [a04(6), c04(8, 1000), s04(9, 1550)] },
  { id: 'hbt-04-wave-15', groups: [s04(12), c04(9, 1000)] }, { id: 'hbt-04-wave-16', groups: [a04(6), s04(11, 1000)] },
  { id: 'hbt-04-wave-17', groups: [a04(6), c04(11, 1000)] }, { id: 'hbt-04-wave-18', groups: [a04(7), s04(12, 1000), c04(6, 1550)] },
  { id: 'hbt-04-wave-19', groups: [a04(7), c04(11, 1000), s04(9, 1550)] }, { id: 'hbt-04-wave-20', groups: [a04(8), s04(12, 1000), c04(7, 1550)] },
  { id: 'hbt-04-wave-21', groups: [a04(9), c04(12, 1000), s04(10, 1550)] }, { id: 'hbt-04-wave-22', groups: [a04(9), c04(13, 1000), s04(12, 1550)] },
]

const s05 = (count: number, delay = 0) => group('han-sword-infantry', count, delay, 775)
const c05 = (count: number, delay = 0) => group('han-crossbow-soldier', count, delay, 900)
const a05 = (count: number, delay = 0) => group('han-armored-guard', count, delay, 1150)

export const haiBaTrungStage05Waves: readonly WaveDefinition[] = [
  { id: 'hbt-05-wave-01', groups: [s05(7)] }, { id: 'hbt-05-wave-02', groups: [s05(6), c05(3, 950)] },
  { id: 'hbt-05-wave-03', groups: [a05(2), s05(7, 950)] }, { id: 'hbt-05-wave-04', groups: [c05(5), s05(7, 950)] },
  { id: 'hbt-05-wave-05', groups: [a05(3), c05(4, 950), s05(7, 1500)] }, { id: 'hbt-05-wave-06', groups: [s05(10), c05(5, 950)] },
  { id: 'hbt-05-wave-07', groups: [a05(4), s05(9, 950)] }, { id: 'hbt-05-wave-08', groups: [a05(4), c05(8, 950)] },
  { id: 'hbt-05-wave-09', groups: [a05(4), s05(10, 950)] }, { id: 'hbt-05-wave-10', groups: [a05(5), c05(7, 950), s05(8, 1500)] },
  { id: 'hbt-05-wave-11', groups: [s05(11), c05(7, 950)] }, { id: 'hbt-05-wave-12', groups: [a05(5), s05(10, 950)] },
  { id: 'hbt-05-wave-13', groups: [a05(5), c05(10, 950)] }, { id: 'hbt-05-wave-14', groups: [a05(6), c05(8, 950), s05(8, 1500)] },
  { id: 'hbt-05-wave-15', groups: [s05(11), c05(9, 950)] }, { id: 'hbt-05-wave-16', groups: [a05(6), s05(11, 950)] },
  { id: 'hbt-05-wave-17', groups: [a05(6), c05(11, 950)] }, { id: 'hbt-05-wave-18', groups: [a05(7), s05(11, 950), c05(6, 1500)] },
  { id: 'hbt-05-wave-19', groups: [a05(7), c05(10, 950), s05(8, 1500)] }, { id: 'hbt-05-wave-20', groups: [a05(8), s05(10, 950), c05(7, 1500)] },
  { id: 'hbt-05-wave-21', groups: [a05(8), c05(10, 950), s05(8, 1500)] }, { id: 'hbt-05-wave-22', groups: [a05(9), s05(11, 950), c05(7, 1500)] },
  { id: 'hbt-05-wave-23', groups: [a05(9), c05(11, 950), s05(8, 1500)] }, { id: 'hbt-05-wave-24', groups: [a05(10), s05(11, 950), c05(8, 1500)] },
  { id: 'hbt-05-wave-25', groups: [a05(10), c05(12, 950), s05(8, 1500)] }, { id: 'hbt-05-wave-26', groups: [a05(10), c05(12, 950), s05(9, 1500)] },
]

const s06 = (count: number, delay = 600) => group('han-sword-infantry', count, delay, 750)
const c06 = (count: number, delay = 600) => group('han-crossbow-soldier', count, delay, 875)
const a06 = (count: number, delay = 600) => group('han-armored-guard', count, delay, 1075)

export const haiBaTrungStage06Waves: readonly WaveDefinition[] = [
  { id: 'hbt-06-wave-01', groups: [s06(8)] }, { id: 'hbt-06-wave-02', groups: [s06(7), c06(4, 1000)] },
  { id: 'hbt-06-wave-03', groups: [a06(4), s06(8, 1000)] }, { id: 'hbt-06-wave-04', groups: [a06(5), c06(7, 1000)] },
  { id: 'hbt-06-wave-05', groups: [a06(5), c06(5, 1000), s06(8, 1550)] }, { id: 'hbt-06-wave-06', groups: [s06(9), c06(7, 1000)] },
  { id: 'hbt-06-wave-07', groups: [a06(6), s06(9, 1000)] }, { id: 'hbt-06-wave-08', groups: [a06(6), c06(8, 1000)] },
  { id: 'hbt-06-wave-09', groups: [a06(6), c06(8, 1000), s06(9, 1550)] }, { id: 'hbt-06-wave-10', groups: [a06(7), s06(10, 1000)] },
  { id: 'hbt-06-wave-11', groups: [a06(7), c06(9, 1000)] }, { id: 'hbt-06-wave-12', groups: [a06(7), c06(9, 1000), s06(10, 1550)] },
  { id: 'hbt-06-wave-13', groups: [a06(8), s06(11, 1000)] }, { id: 'hbt-06-wave-14', groups: [a06(8), c06(10, 1000)] },
  { id: 'hbt-06-wave-15', groups: [a06(8), c06(10, 1000), s06(11, 1550)] }, { id: 'hbt-06-wave-16', groups: [a06(9), s06(12, 1000)] },
  { id: 'hbt-06-wave-17', groups: [a06(9), c06(11, 1000)] }, { id: 'hbt-06-wave-18', groups: [a06(9), c06(11, 1000), s06(12, 1550)] },
  { id: 'hbt-06-wave-19', groups: [a06(10), s06(13, 1000)] }, { id: 'hbt-06-wave-20', groups: [a06(10), c06(12, 1000)] },
  { id: 'hbt-06-wave-21', groups: [a06(10), c06(12, 1000), s06(13, 1550)] }, { id: 'hbt-06-wave-22', groups: [a06(11), s06(14, 1000)] },
  { id: 'hbt-06-wave-23', groups: [a06(11), c06(13, 1000)] }, { id: 'hbt-06-wave-24', groups: [a06(11), c06(13, 1000), s06(14, 1550)] },
  { id: 'hbt-06-wave-25', groups: [a06(12), s06(15, 1000)] }, { id: 'hbt-06-wave-26', groups: [a06(12), c06(14, 1000), s06(15, 1550)] },
  { id: 'hbt-06-wave-27', groups: [a06(13), c06(15, 1000), s06(16, 1550)] },
  { id: 'hbt-06-wave-28', groups: [a06(13), c06(16, 1550), s06(17, 2150)] },
]
