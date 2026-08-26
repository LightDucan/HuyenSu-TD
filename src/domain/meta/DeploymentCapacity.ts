import {
  BASE_DEPLOYMENT_CAPACITY,
  CAPACITY_PER_SUMMON_ORDER,
  type PlayerProfile,
} from './MetaState'
import type { HeroPlacement } from '../placement/HeroPlacementRegistry'

export type DeploymentCapacityAccountProjection = Readonly<{
  baseCapacity: number
  bonusFromLevel: number
  summonOrderCount: number
  totalUnlockedCapacity: number
}>

export type DeploymentCapacityProjection = Readonly<DeploymentCapacityAccountProjection & {
  mapTileCount: number
  effectiveLimit: number
}>

export type DeploymentEligibility =
  | Readonly<{ status: 'allowed'; mode: 'new' | 'reposition' }>
  | Readonly<{ status: 'rejected'; reason: 'capacity-reached' }>

function assertNonNegativeSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative safe integer`)
}

function validateProfileCapacityInputs(profile: PlayerProfile): void {
  if (!Number.isSafeInteger(profile.playerLevel) || profile.playerLevel < 1) {
    throw new Error('Player Level must be a positive safe integer')
  }
  assertNonNegativeSafeInteger(profile.summonOrderCount, 'Summon Order count')
}

export function selectDeploymentCapacity(profile: PlayerProfile): DeploymentCapacityAccountProjection {
  validateProfileCapacityInputs(profile)
  const bonusFromLevel = 0
  const summonOrderBonus = profile.summonOrderCount * CAPACITY_PER_SUMMON_ORDER
  if (!Number.isSafeInteger(summonOrderBonus)) throw new Error('Deployment Capacity summon-order bonus exceeds safe integer range')
  if (summonOrderBonus > Number.MAX_SAFE_INTEGER - BASE_DEPLOYMENT_CAPACITY - bonusFromLevel) {
    throw new Error('Deployment Capacity exceeds safe integer range')
  }
  return {
    baseCapacity: BASE_DEPLOYMENT_CAPACITY,
    bonusFromLevel,
    summonOrderCount: profile.summonOrderCount,
    totalUnlockedCapacity: BASE_DEPLOYMENT_CAPACITY + bonusFromLevel + summonOrderBonus,
  }
}

export function selectEffectiveDeploymentCapacity(profile: PlayerProfile, mapTileCount: number): DeploymentCapacityProjection {
  assertNonNegativeSafeInteger(mapTileCount, 'Map placement tile count')
  const account = selectDeploymentCapacity(profile)
  return {
    ...account,
    mapTileCount,
    effectiveLimit: Math.min(account.totalUnlockedCapacity, mapTileCount),
  }
}

export function canDeployHero(
  heroId: string,
  placements: readonly HeroPlacement[],
  effectiveLimit: number,
): DeploymentEligibility {
  if (heroId.trim().length === 0) throw new Error('Hero ID must not be empty')
  assertNonNegativeSafeInteger(effectiveLimit, 'Effective Deployment Capacity')
  const deployedHeroIds = new Set<string>()
  placements.forEach((placement) => {
    if (placement.heroId.trim().length === 0) throw new Error('Placed Hero ID must not be empty')
    if (deployedHeroIds.has(placement.heroId)) throw new Error(`Duplicate placed Hero: ${placement.heroId}`)
    deployedHeroIds.add(placement.heroId)
  })
  if (deployedHeroIds.has(heroId)) return { status: 'allowed', mode: 'reposition' }
  return placements.length < effectiveLimit
    ? { status: 'allowed', mode: 'new' }
    : { status: 'rejected', reason: 'capacity-reached' }
}
