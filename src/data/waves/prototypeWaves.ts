export type WaveGroup = Readonly<{ enemyId: string; count: number; startDelayMs: number; spawnIntervalMs: number }>
export type WaveDefinition = Readonly<{ id: string; groups: readonly WaveGroup[] }>

const sword = (count: number, startDelayMs = 0): WaveGroup => ({ enemyId: 'han-sword-infantry', count, startDelayMs, spawnIntervalMs: 900 })
const archer = (count: number, startDelayMs = 0): WaveGroup => ({ enemyId: 'han-crossbow-soldier', count, startDelayMs, spawnIntervalMs: 900 })
const armored = (count: number, startDelayMs = 0): WaveGroup => ({ enemyId: 'han-armored-guard', count, startDelayMs, spawnIntervalMs: 1400 })
const boss = (): WaveGroup => ({ enemyId: 'boss-ma-vien', count: 1, startDelayMs: 0, spawnIntervalMs: 1500 })

export const haiBaTrungWaves: readonly WaveDefinition[] = [
  { id: 'hbt-lb-wave-01', groups: [sword(3)] }, { id: 'hbt-lb-wave-02', groups: [sword(4)] },
  { id: 'hbt-lb-wave-03', groups: [sword(3), archer(2, 1200)] }, { id: 'hbt-lb-wave-04', groups: [sword(5), archer(2, 1200)] },
  { id: 'hbt-lb-wave-05', groups: [armored(1), sword(4, 1000)] }, { id: 'hbt-lb-wave-06', groups: [armored(2), archer(3, 1200), sword(3, 2200)] },
  { id: 'hbt-lb-wave-07', groups: [archer(6)] }, { id: 'hbt-lb-wave-08', groups: [armored(2), sword(6, 1000)] },
  { id: 'hbt-lb-wave-09', groups: [armored(3), archer(4, 1200)] }, { id: 'hbt-lb-wave-10', groups: [sword(8), archer(3, 1200)] },
  { id: 'hbt-lb-wave-11', groups: [armored(4), sword(4, 1200)] }, { id: 'hbt-lb-wave-12', groups: [armored(4), archer(5, 1200), sword(5, 2400)] },
  { id: 'hbt-lb-wave-13', groups: [sword(10)] }, { id: 'hbt-lb-wave-14', groups: [archer(6), sword(6, 1400)] },
  { id: 'hbt-lb-wave-15', groups: [armored(5), sword(6, 1400)] }, { id: 'hbt-lb-wave-16', groups: [armored(4), archer(8, 1400)] },
  { id: 'hbt-lb-wave-17', groups: [armored(5), sword(8, 1200), archer(4, 2600)] }, { id: 'hbt-lb-wave-18', groups: [armored(6), sword(8, 1200), archer(6, 2800)] },
  { id: 'hbt-lb-wave-19', groups: [sword(12), archer(8, 1800)] }, { id: 'hbt-lb-wave-20', groups: [armored(7), sword(8, 1400)] },
  { id: 'hbt-lb-wave-21', groups: [armored(7), archer(10, 1500)] }, { id: 'hbt-lb-wave-22', groups: [armored(8), sword(10, 1400), archer(6, 3000)] },
  { id: 'hbt-lb-wave-23', groups: [armored(9), archer(10, 1600), sword(10, 3400)] }, { id: 'hbt-lb-wave-24', groups: [boss(), armored(4, 1200), archer(6, 3000), sword(8, 5000)] },
]

export const prototypeWaves = haiBaTrungWaves
