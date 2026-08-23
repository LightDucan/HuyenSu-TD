import type { SkillDefinition } from '../../domain/skills/SkillResolver'

export const skillDefinitions: Record<string, SkillDefinition> = {
  'thanh-long-tram': {
    id: 'thanh-long-tram',
    name: 'Thanh Long Trảm',
    effects: [
      { type: 'aoe', radius: 150, maxTargets: 3 },
      { type: 'damage', atkMultiplier: 2 },
    ],
  },
}
