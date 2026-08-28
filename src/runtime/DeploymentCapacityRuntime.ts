import { selectEffectiveDeploymentCapacity, type DeploymentCapacityProjection } from '../domain/meta/DeploymentCapacity'
import { LocalMetaRepository } from '../domain/meta/MetaRepository'
import type { StorageLike } from '../domain/progression/ProgressionStorage'
import type { BattleBridge } from '../game/bridge/BattleBridge'
import { ensureMetaRepositoryReady } from './RewardRuntime'

export class DeploymentCapacityRuntimeController {
  constructor(
    private readonly repository: LocalMetaRepository,
    private readonly bridge: BattleBridge,
    private readonly mapTileCount: number,
  ) {}

  refresh(): DeploymentCapacityProjection {
    const current = this.repository.load()
    if (current.status !== 'loaded') throw new Error('Deployment Capacity runtime requires a current Meta V5 save')
    const projection = selectEffectiveDeploymentCapacity(current.save.data.profile, this.mapTileCount)
    this.bridge.emitDeploymentCapacitySnapshot(projection)
    return projection
  }
}

export function startBrowserDeploymentCapacityRuntime(
  storage: StorageLike,
  bridge: BattleBridge,
  mapTileCount: number,
): void {
  const repository = new LocalMetaRepository(storage)
  ensureMetaRepositoryReady(repository, 'local-player', Date.now())
  new DeploymentCapacityRuntimeController(repository, bridge, mapTileCount).refresh()
}
