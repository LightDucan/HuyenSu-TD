import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './ui/App'
import { createPrototypeRewardConfig } from './data/rewards/prototypeRewardConfig'
import type { HiddenTabPolicy } from './domain/meta/RewardSources'
import { battleBridge } from './game/bridge/BattleBridge'
import { startBrowserRewardRuntime } from './runtime/RewardRuntime'
import { startBrowserCommandEnergyRuntime } from './runtime/CommandEnergyRuntime'
import { startBrowserDeploymentCapacityRuntime } from './runtime/DeploymentCapacityRuntime'
import { prototypeMap } from './data/maps/prototypeMap'
import { initializeBrowserEquipmentV2Runtime } from './runtime/EquipmentV2Runtime'
import { initializeBrowserEconomyRuntime } from './runtime/EconomyRuntime'
import { initializeBrowserHeroMetaRuntime } from './runtime/HeroMetaRuntime'
import './ui/styles.css'

const configuredHiddenPolicy = import.meta.env.VITE_ACTIVE_PLAY_HIDDEN_POLICY
const hiddenTabPolicy: HiddenTabPolicy = configuredHiddenPolicy === 'count-hidden' ? 'count-hidden' : 'visible-only'
startBrowserRewardRuntime(window.localStorage, battleBridge, createPrototypeRewardConfig(hiddenTabPolicy))
startBrowserCommandEnergyRuntime(window.localStorage, battleBridge)
initializeBrowserEquipmentV2Runtime(window.localStorage, battleBridge)
initializeBrowserEconomyRuntime(window.localStorage, battleBridge, prototypeMap.placementTiles.length)
initializeBrowserHeroMetaRuntime(window.localStorage, battleBridge)
startBrowserDeploymentCapacityRuntime(window.localStorage, battleBridge, prototypeMap.placementTiles.length)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
