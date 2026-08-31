export type ChibiPresentationType = 'ranged' | 'melee'
export type ChibiAnimationSet = Readonly<{ idle: string; aim?: string; shoot?: string; ready?: string; strike?: string }>
export type HeroChibiPresentation = Readonly<{ heroId: string; type: ChibiPresentationType; animations: ChibiAnimationSet; frameRate: number; loopState: string; attackReleaseFrame: number; characterScale: number; pivot: Readonly<{ x: number; y: number }>; attackVfxKey?: string; vfxOffset: Readonly<{ x: number; y: number }> }>

export const heroChibiPresentations: Readonly<Record<string, HeroChibiPresentation>> = {
  'trung-nhi': { heroId: 'trung-nhi', type: 'ranged', animations: { idle: 'trung_nhi_idle', aim: 'trung_nhi_aim', shoot: 'trung_nhi_shoot' }, frameRate: 10, loopState: 'idle', attackReleaseFrame: 3, characterScale: 1, pivot: { x: 0.5, y: 1 }, attackVfxKey: 'lien-hoan-lac-tien', vfxOffset: { x: 0, y: -24 } },
  'trung-trac': { heroId: 'trung-trac', type: 'melee', animations: { idle: 'trung_trac_idle', ready: 'trung_trac_ready', strike: 'trung_trac_strike' }, frameRate: 10, loopState: 'idle', attackReleaseFrame: 2, characterScale: 1, pivot: { x: 0.5, y: 1 }, attackVfxKey: 'trong-dong-lenh-vuong', vfxOffset: { x: 0, y: -18 } },
}

export function getHeroChibiPresentation(heroId: string): HeroChibiPresentation | undefined { return heroChibiPresentations[heroId] }
