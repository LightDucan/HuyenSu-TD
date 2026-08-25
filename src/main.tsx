import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './ui/App'
import { createPrototypeRewardConfig } from './data/rewards/prototypeRewardConfig'
import type { HiddenTabPolicy } from './domain/meta/RewardSources'
import { battleBridge } from './game/bridge/BattleBridge'
import { startBrowserRewardRuntime } from './runtime/RewardRuntime'
import './ui/styles.css'

const configuredHiddenPolicy = import.meta.env.VITE_ACTIVE_PLAY_HIDDEN_POLICY
const hiddenTabPolicy: HiddenTabPolicy = configuredHiddenPolicy === 'count-hidden' ? 'count-hidden' : 'visible-only'
startBrowserRewardRuntime(window.localStorage, battleBridge, createPrototypeRewardConfig(hiddenTabPolicy))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
