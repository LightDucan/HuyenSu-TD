import type { SkillDefinition } from '../../domain/skills/SkillResolver'

export const skillDefinitions: Record<string, SkillDefinition> = {
  'trong-dong-lenh-vuong': { id: 'trong-dong-lenh-vuong', name: 'Trống Đồng Lệnh Vương', effects: [{ type: 'aoe', radius: 170, maxTargets: 4 }, { type: 'damage', atkMultiplier: 2.2 }, { type: 'stun', durationMs: 800 }] },
  'lien-hoan-lac-tien': { id: 'lien-hoan-lac-tien', name: 'Liên Hoàn Lạc Tiễn', effects: [{ type: 'multiHit', hits: 3, intervalMs: 140 }, { type: 'damage', atkMultiplier: 1.1 }, { type: 'slow', ratio: 0.35, durationMs: 2000 }] },
  'song-trao-hai-tan': { id: 'song-trao-hai-tan', name: 'Sóng Trào Hải Tần', effects: [{ type: 'aoe', radius: 160, maxTargets: 3 }, { type: 'damage', atkMultiplier: 2.0 }, { type: 'root', durationMs: 1500 }] },
  'thanh-long-tram': {
    id: 'thanh-long-tram',
    name: 'Thanh Long Trảm',
    effects: [
      { type: 'aoe', radius: 150, maxTargets: 3 },
      { type: 'damage', atkMultiplier: 2.0 },
    ],
  },
  'that-tien-that-xuat': {
    id: 'that-tien-that-xuat',
    name: 'Thất Tiến Thất Xuất',
    effects: [
      { type: 'multiHit', hits: 3, intervalMs: 150 },
      { type: 'damage', atkMultiplier: 1.2 },
      { type: 'stun', durationMs: 600 },
    ],
  },
  'ba-xa-gam-vang': {
    id: 'ba-xa-gam-vang',
    name: 'Bát Xà Hống',
    effects: [
      { type: 'aoe', radius: 180, maxTargets: 4 },
      { type: 'damage', atkMultiplier: 2.2 },
      { type: 'stun', durationMs: 1000 },
    ],
  },
  'bach-bo-xuyen-duong': {
    id: 'bach-bo-xuyen-duong',
    name: 'Bách Bộ Xuyên Dương',
    effects: [
      { type: 'damage', atkMultiplier: 3.0 },
      { type: 'slow', ratio: 0.4, durationMs: 2000 },
    ],
  },
  'dong-phong-hoa-tran': {
    id: 'dong-phong-hoa-tran',
    name: 'Đông Phong Hỏa Trận',
    effects: [
      { type: 'aoe', radius: 200, maxTargets: 5 },
      { type: 'damage', atkMultiplier: 1.8 },
      { type: 'slow', ratio: 0.5, durationMs: 2500 },
    ],
  },
  'loi-dinh-kich': {
    id: 'loi-dinh-kich',
    name: 'Lôi Đình Kích',
    effects: [
      { type: 'damage', atkMultiplier: 2.5 },
      { type: 'stun', durationMs: 800 },
    ],
  },
  'bang-phong-tran': {
    id: 'bang-phong-tran',
    name: 'Băng Phong Trận',
    effects: [
      { type: 'aoe', radius: 160, maxTargets: 4 },
      { type: 'damage', atkMultiplier: 1.4 },
      { type: 'root', durationMs: 1500 },
    ],
  },
  'lien-hoan-xa': {
    id: 'lien-hoan-xa',
    name: 'Liên Hoàn Xạ',
    effects: [
      { type: 'multiHit', hits: 4, intervalMs: 120 },
      { type: 'damage', atkMultiplier: 0.8 },
    ],
  },
}
