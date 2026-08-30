import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './ui/App'
import { createHaiBaTrungRewardConfig } from './data/rewards/prototypeRewardConfig'
import type { HiddenTabPolicy } from './domain/meta/RewardSources'
import { battleBridge } from './game/bridge/BattleBridge'
import { startBrowserRewardRuntime } from './runtime/RewardRuntime'
import { startBrowserCommandEnergyRuntime } from './runtime/CommandEnergyRuntime'
import { startBrowserDeploymentCapacityRuntime, setBrowserDeploymentCapacityRuntime } from './runtime/DeploymentCapacityRuntime'
import { initializeBrowserEquipmentV2Runtime } from './runtime/EquipmentV2Runtime'
import { initializeBrowserEconomyRuntime } from './runtime/EconomyRuntime'
import { initializeBrowserHeroMetaRuntime } from './runtime/HeroMetaRuntime'
import { initializeBrowserCampaignProgressionRuntime } from './runtime/CampaignProgressionRuntime'
import { defaultCampaignChapter } from './data/campaign/haiBaTrungCampaign'
import './ui/styles.css'

const configuredHiddenPolicy = import.meta.env.VITE_ACTIVE_PLAY_HIDDEN_POLICY
const hiddenTabPolicy: HiddenTabPolicy = configuredHiddenPolicy === 'count-hidden' ? 'count-hidden' : 'visible-only'
startBrowserRewardRuntime(window.localStorage, battleBridge, createHaiBaTrungRewardConfig(hiddenTabPolicy))
startBrowserCommandEnergyRuntime(window.localStorage, battleBridge)
initializeBrowserEquipmentV2Runtime(window.localStorage, battleBridge)
const deploymentCapacityRuntime = startBrowserDeploymentCapacityRuntime(window.localStorage, battleBridge, 0)
setBrowserDeploymentCapacityRuntime(deploymentCapacityRuntime)
initializeBrowserEconomyRuntime(window.localStorage, battleBridge, 0, deploymentCapacityRuntime)
initializeBrowserHeroMetaRuntime(window.localStorage, battleBridge)
initializeBrowserCampaignProgressionRuntime(window.localStorage, battleBridge, defaultCampaignChapter)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
