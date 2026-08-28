export type WaveGroup = Readonly<{ enemyId: string; count: number; startDelayMs: number; spawnIntervalMs: number }>
export type WaveDefinition = Readonly<{ id: string; groups: readonly WaveGroup[] }>

const sword = (count: number, startDelayMs = 0): WaveGroup => ({ enemyId: 'han-sword-infantry', count, startDelayMs, spawnIntervalMs: 900 })
const archer = (count: number, startDelayMs: number): WaveGroup => ({ enemyId: 'han-crossbow-soldier', count, startDelayMs, spawnIntervalMs: 900 })
const armored = (count: number, startDelayMs: number): WaveGroup => ({ enemyId: 'han-armored-guard', count, startDelayMs, spawnIntervalMs: 1400 })
const boss = (): WaveGroup => ({ enemyId: 'boss-ma-vien', count: 1, startDelayMs: 0, spawnIntervalMs: 1500 })

export const prototypeWaves: readonly WaveDefinition[] = [
  { id: 'wave-01', groups: [sword(2)] },
  { id: 'wave-02', groups: [sword(2), archer(1, 900)] },
  { id: 'wave-03', groups: [sword(3), archer(1, 1200)] },
  { id: 'wave-04', groups: [armored(1, 0), sword(2, 1200)] },
  { id: 'wave-05', groups: [armored(2, 0), archer(2, 1100), sword(2, 1800)] },
  { id: 'wave-06', groups: [archer(5, 0)] },
  { id: 'wave-07', groups: [armored(2, 0), sword(3, 1000), archer(2, 1700)] },
  { id: 'wave-08', groups: [armored(4, 0), sword(2, 1600)] },
  { id: 'wave-09', groups: [sword(5), archer(4, 900), armored(2, 1800)] },
  { id: 'wave-10', groups: [boss(), armored(2, 1200), archer(3, 2200)] },
]
