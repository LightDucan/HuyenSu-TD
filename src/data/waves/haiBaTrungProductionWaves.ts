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
  { id: 'hbt-03-wave-03', groups: [a03(2), s03(6, 1050)] }, { id: 'hbt-03-wave-04', groups: [c03(5), s03(6, 1050)] },
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
