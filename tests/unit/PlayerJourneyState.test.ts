import { describe, expect, it } from 'vitest'
import { transitionPlayerJourney } from '../../src/ui/PlayerJourneyState'

describe('player journey screen lifecycle', () => {
  it('moves through city, campaign, battle and result without ambiguous states', () => {
    let screen = transitionPlayerJourney('city', 'open-campaign')
    screen = transitionPlayerJourney(screen, 'enter-battle')
    screen = transitionPlayerJourney(screen, 'battle-complete')
    expect(screen).toBe('result')
    expect(transitionPlayerJourney(screen, 'return-city')).toBe('city')
  })

  it('retries only from result and returns to battle for a fresh scene', () => {
    expect(transitionPlayerJourney('result', 'retry-battle')).toBe('battle')
    expect(transitionPlayerJourney('city', 'retry-battle')).toBe('city')
    expect(transitionPlayerJourney('battle', 'retry-battle')).toBe('battle')
  })
})
