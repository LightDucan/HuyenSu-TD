export type WaveGroup = Readonly<{ enemyId: string; count: number; startDelayMs: number; spawnIntervalMs: number }>
export type WaveDefinition = Readonly<{ id: string; groups: readonly WaveGroup[] }>

const sword = (count: number, startDelayMs = 0): WaveGroup => ({ enemyId: 'yellow-turban-sword', count, startDelayMs, spawnIntervalMs: 900 })
const archer = (count: number, startDelayMs: number): WaveGroup => ({ enemyId: 'yellow-turban-archer', count, startDelayMs, spawnIntervalMs: 1000 })
const brute = (count: number, startDelayMs: number): WaveGroup => ({ enemyId: 'yellow-turban-brute', count, startDelayMs, spawnIntervalMs: 1500 })

export const prototypeWaves: readonly WaveDefinition[] = [
  { id: 'wave-01', groups: [sword(2)] },
  { id: 'wave-02', groups: [sword(2), archer(1, 900)] },
  { id: 'wave-03', groups: [sword(3), archer(1, 1200)] },
  { id: 'wave-04', groups: [sword(2), archer(2, 800)] },
  { id: 'wave-05', groups: [sword(3), brute(1, 1500)] },
  { id: 'wave-06', groups: [archer(3, 0), sword(2, 900)] },
  { id: 'wave-07', groups: [sword(3), archer(2, 1000)] },
  { id: 'wave-08', groups: [brute(1, 0), archer(2, 1200)] },
  { id: 'wave-09', groups: [sword(4), archer(2, 1300)] },
  { id: 'wave-10', groups: [sword(3), archer(3, 900), brute(1, 2200)] },
]
