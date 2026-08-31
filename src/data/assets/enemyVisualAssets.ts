export type EnemyVisualDefinition = Readonly<{ enemyId: string; walkTextureKey: string; animationKey: string; walkPath: string; frameWidth: 128; frameHeight: 128; frameCount: 8; facing: 'right'; fallback: 'primitive' | 'sprite' }>

const assetUrls = import.meta.glob('../../assets/enemies/**/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

const ids = ['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard', 'boss-ma-vien'] as const
export const hbtEnemyVisualManifest: Readonly<Record<string, EnemyVisualDefinition & { walkUrl?: string }>> = Object.fromEntries(ids.map((enemyId) => [enemyId, { enemyId, walkTextureKey: `enemy:${enemyId}:walk`, animationKey: `enemy:${enemyId}:walk-loop`, walkPath: `enemies/${enemyId}/walk.png`, walkUrl: assetUrls[`../../assets/enemies/${enemyId}/walk.png`], frameWidth: 128, frameHeight: 128, frameCount: 8, facing: 'right', fallback: 'primitive' }]))
export function resolveEnemyVisual(enemyId: string): EnemyVisualDefinition | undefined { return hbtEnemyVisualManifest[enemyId] }
