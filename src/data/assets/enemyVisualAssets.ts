export type EnemyVisualDefinition = Readonly<{ enemyId: string; walkTextureKey: string; animationKey: string; walkPath: string; walkUrl?: string; frameWidth: 128; frameHeight: 128; frameCount: 8; facing: 'right'; fallback: 'primitive' | 'sprite' }>

const assetUrls = import.meta.glob('../../assets/enemies/**/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

const hbtIds = ['han-sword-infantry', 'han-crossbow-soldier', 'han-armored-guard', 'boss-ma-vien'] as const
const wuIds = ['wu-sword-infantry', 'wu-crossbow-soldier', 'wu-armored-guard', 'wu-field-commander'] as const
const definition = (enemyId: string): EnemyVisualDefinition => ({ enemyId, walkTextureKey: `enemy:${enemyId}:walk`, animationKey: `enemy:${enemyId}:walk-loop`, walkPath: `enemies/${enemyId}/walk.png`, walkUrl: assetUrls[`../../assets/enemies/${enemyId}/walk.png`], frameWidth: 128, frameHeight: 128, frameCount: 8, facing: 'right', fallback: 'primitive' })
const manifestFor = (ids: readonly string[]): Readonly<Record<string, EnemyVisualDefinition>> => Object.fromEntries(ids.map((enemyId) => [enemyId, definition(enemyId)]))

export const hbtEnemyVisualManifest = manifestFor(hbtIds)
export const wuEnemyVisualManifest = manifestFor(wuIds)
export const productionEnemyVisualManifest: Readonly<Record<string, EnemyVisualDefinition>> = { ...hbtEnemyVisualManifest, ...wuEnemyVisualManifest }
export function resolveEnemyVisual(enemyId: string): EnemyVisualDefinition | undefined { return productionEnemyVisualManifest[enemyId] }
