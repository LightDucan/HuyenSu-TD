import { selectEffectiveDeploymentCapacity, type DeploymentCapacityProjection } from '../domain/meta/DeploymentCapacity'
import { LocalMetaRepository } from '../domain/meta/MetaRepository'
import type { StorageLike } from '../domain/progression/ProgressionStorage'
import type { BattleBridge } from '../game/bridge/BattleBridge'
import { ensureMetaRepositoryReady } from './RewardRuntime'

export class DeploymentCapacityRuntimeController {
  private mapTileCount: number
  constructor(
    private readonly repository: LocalMetaRepository,
    private readonly bridge: BattleBridge,
    mapTileCount: number,
  ) { this.mapTileCount = mapTileCount }

  setMapTileCount(mapTileCount: number): DeploymentCapacityProjection { this.mapTileCount = mapTileCount; return this.refresh() }

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
): DeploymentCapacityRuntimeController {
  const repository = new LocalMetaRepository(storage)
  ensureMetaRepositoryReady(repository, 'local-player', Date.now())
  const controller = new DeploymentCapacityRuntimeController(repository, bridge, mapTileCount)
  controller.refresh()
  return controller
}

let browserDeploymentCapacityRuntime: DeploymentCapacityRuntimeController | undefined
export function setBrowserDeploymentCapacityRuntime(controller: DeploymentCapacityRuntimeController): void { browserDeploymentCapacityRuntime = controller }
export function getBrowserDeploymentCapacityRuntime(): DeploymentCapacityRuntimeController {
  if (!browserDeploymentCapacityRuntime) throw new Error('Browser Deployment Capacity runtime has not been initialized')
  return browserDeploymentCapacityRuntime
}
