export type EnemyVisualDefinition = Readonly<{ enemyId: string; walkTextureKey: string; walkPath: string; frameWidth: 128; frameHeight: 128; frameCount: 8; facing: 'right'; fallback: 'primitive' | 'sprite' }>

const ids = ['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard', 'boss-ma-vien'] as const
export const hbtEnemyVisualManifest: Readonly<Record<string, EnemyVisualDefinition>> = Object.fromEntries(ids.map((enemyId) => [enemyId, { enemyId, walkTextureKey: `enemy:${enemyId}:walk`, walkPath: `enemies/${enemyId}/walk.png`, frameWidth: 128, frameHeight: 128, frameCount: 8, facing: 'right', fallback: 'primitive' }]))
export function resolveEnemyVisual(enemyId: string): EnemyVisualDefinition | undefined { return hbtEnemyVisualManifest[enemyId] }
