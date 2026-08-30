export type PlayerJourneyScreen = 'city' | 'campaign' | 'battle' | 'result'
export type PlayerJourneyEvent = 'open-campaign' | 'enter-battle' | 'battle-complete' | 'return-city' | 'retry-battle'

export function transitionPlayerJourney(screen: PlayerJourneyScreen, event: PlayerJourneyEvent): PlayerJourneyScreen {
  if (screen === 'city' && event === 'open-campaign') return 'campaign'
  if (screen === 'campaign' && event === 'enter-battle') return 'battle'
  if (screen === 'battle' && event === 'battle-complete') return 'result'
  if (screen === 'result' && event === 'return-city') return 'city'
  if (screen === 'result' && event === 'retry-battle') return 'battle'
  return screen
}
