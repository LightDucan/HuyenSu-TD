import { useEffect, useState } from 'react'
import { ACTIVE_HBT_EQUIPMENT_IDS, equipmentDefinitions } from '../data/equipment/definitions'
import { heroDefinitions, trungTrac } from '../data/heroes/definitions'
import { heroPassives, type PassiveDefinition } from '../data/passives/definitions'
import { skillDefinitions } from '../data/skills/definitions'
import { resolvePrototypeHeroVisual } from '../data/assets/prototypeVisualAssets'
import { HeroPortrait } from './HeroPortrait'
import { featureFlags } from '../config/features'
import { loadEquipment } from '../domain/equipment/EquipmentStorage'
import {
  resolveEquipmentModifiers,
  type EquipmentDefinition,
  type EquipmentSlot,
  type HeroEquipment,
} from '../domain/equipment/EquipmentSystem'
import { calculateHeroLoadoutStats } from '../domain/equipment/HeroLoadout'
import {
  canAdvanceStage,
  canUpgrade,
  MAX_HERO_LEVEL,
  type HeroProgression,
  type HeroStage,
} from '../domain/progression/ProgressionSystem'
import { calculateHeroStats } from '../domain/progression/StatCalculator'

export interface HeroDetailModalProps {
  isOpen: boolean
  onClose: () => void
  heroId?: string
  progression?: HeroProgression
  equipment?: HeroEquipment
  onUpgradeRequest?: (heroId: string) => void
  onAdvanceStageRequest?: (heroId: string) => void
  onEquipRequest?: (heroId: string, slot: EquipmentSlot, itemId: string) => void
  onUnequipRequest?: (heroId: string, slot: EquipmentSlot) => void
}

const STAGE_LABELS: Record<HeroStage, { name: string; title: string; order: number }> = {
  normal: { name: 'Normal', title: 'Thường', order: 1 },
  rebirth: { name: 'Rebirth', title: 'Trùng Sinh', order: 2 },
  reincarnation: { name: 'Reincarnation', title: 'Tái Sinh', order: 3 },
  legendary: { name: 'Legendary', title: 'Huyền Sử', order: 4 },
}

const STAGES: readonly HeroStage[] = ['normal', 'rebirth', 'reincarnation', 'legendary']

function readSavedEquipment(heroId: string): HeroEquipment {
  if (typeof window === 'undefined') return {}
  return loadEquipment(window.localStorage).heroes[heroId] ?? {}
}

export function HeroDetailModal({
  isOpen,
  onClose,
  heroId = trungTrac.id,
  progression: propProgression,
  equipment: propEquipment,
  onUpgradeRequest,
  onAdvanceStageRequest,
  onEquipRequest,
  onUnequipRequest,
}: HeroDetailModalProps) {
  const [localEquipment, setLocalEquipment] = useState<HeroEquipment>(() =>
    readSavedEquipment(heroId),
  )
  const [currentTimeMs, setCurrentTimeMs] = useState(() => Date.now())
  const [pickingSlot, setPickingSlot] = useState<EquipmentSlot | null>(null)

  // Equipment has a legacy display fallback; progression is always supplied by Meta V5 in production.
  useEffect(() => {
    if (!isOpen) return
    if (!propEquipment) {
      setLocalEquipment(readSavedEquipment(heroId))
    }
  }, [isOpen, heroId, propEquipment])

  const activeProgression = propProgression ?? { stage: 'normal', level: 1 }
  const activeEquipment = propEquipment ?? localEquipment

  // Timer for cooldown display
  useEffect(() => {
    if (!featureFlags.upgradeCooldownEnabled || !activeProgression.upgradeReadyAt || activeProgression.upgradeReadyAt <= Date.now()) return
    const interval = window.setInterval(() => setCurrentTimeMs(Date.now()), 100)
    return () => window.clearInterval(interval)
  }, [activeProgression.upgradeReadyAt])

  if (!isOpen) return null

  const hero = heroDefinitions[heroId] ?? trungTrac

  // Pure display calculations via Core domain helpers
  const baseScaledStats = calculateHeroStats(hero.baseStats, activeProgression)
  const finalStats = calculateHeroLoadoutStats(
    hero.baseStats,
    activeProgression,
    activeEquipment,
    equipmentDefinitions,
  )
  const resolvedModifiers = resolveEquipmentModifiers(activeEquipment, equipmentDefinitions)

  const activeSkill = skillDefinitions[hero.activeSkillId]
  const passive: PassiveDefinition = heroPassives[heroId] ?? {
    id: 'default-passive',
    name: 'Huyền Sử Chi Lực',
    description: 'Tăng toàn bộ chỉ số và mở khóa hiệu ứng đặc biệt khi đạt Huyền Sử.',
    requiredStage: 'legendary',
  }

  const isLegendary = activeProgression.stage === 'legendary'
  const isMaxLevel = activeProgression.level >= MAX_HERO_LEVEL
  const cooldownRemainingMs = Math.max(
    0,
    (activeProgression.upgradeReadyAt ?? currentTimeMs) - currentTimeMs,
  )
  const isCooldown = featureFlags.upgradeCooldownEnabled && cooldownRemainingMs > 0
  const cooldownSeconds = (cooldownRemainingMs / 1000).toFixed(1)

  const weaponItem = activeEquipment.weaponId
    ? equipmentDefinitions[activeEquipment.weaponId]
    : null
  const gemItem = activeEquipment.gemId ? equipmentDefinitions[activeEquipment.gemId] : null

  // Passive callbacks: emit request only, never mutate state directly
  const handleUpgrade = () => {
    onUpgradeRequest?.(heroId)
  }

  const handleAdvanceStage = () => {
    onAdvanceStageRequest?.(heroId)
  }

  const handleEquipItem = (item: EquipmentDefinition) => {
    onEquipRequest?.(heroId, item.slot, item.id)
    setPickingSlot(null)
  }

  const handleUnequipItem = (slot: EquipmentSlot) => {
    onUnequipRequest?.(heroId, slot)
  }

  const candidateItems = Object.values(equipmentDefinitions).filter(
    (item) => pickingSlot && item.slot === pickingSlot
      && (ACTIVE_HBT_EQUIPMENT_IDS.includes(item.id as typeof ACTIVE_HBT_EQUIPMENT_IDS[number])
        || item.id === activeEquipment.weaponId
        || item.id === activeEquipment.gemId),
  )

  const formatBonus = (val?: number) => (val && val > 0 ? `+${val}` : null)

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hero-detail-title"
    >
      <div className="hero-detail-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="hero-detail-title" className="modal-title">
              Chi Tiết Anh Hùng: {hero.name}
            </h2>
            <span className="hero-tagline">
              Phe: {hero.faction} • Vai trò: {hero.archetype}
            </span>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div className="modal-body-grid">
          {/* LEFT COLUMN: Hero Portrait + Equipment Slots + Skills */}
          <div className="col-left">
            {/* Hero Card */}
            <div className="hero-portrait-card">
              <div className="hero-avatar">
                <HeroPortrait className="hero-portrait-image" name={hero.name} src={resolvePrototypeHeroVisual(hero.id)?.portraitUrl} />
              </div>
              <div className="hero-meta">
                <h3 className="hero-name">{hero.name}</h3>
                <span className="skin-label">Trang phục: {hero.presentation.skinId}</span>
              </div>
            </div>

            {/* Equipment Section (Exactly 2 slots: Weapon & Gem) */}
            <div className="equipment-section">
              <h4 className="sub-heading">Trang Bị (Equipment)</h4>
              <div className="equipment-grid">
                {/* ⚔ Weapon Slot */}
                <div className={`equipment-card ${weaponItem ? 'equipped' : 'empty'}`}>
                  <div className="equip-card-header">
                    <span className="equip-slot-title">⚔ Vũ Khí</span>
                    {weaponItem && (
                      <div className="equip-card-actions">
                        <button
                          type="button"
                          className="btn-tiny"
                          onClick={() => setPickingSlot('weapon')}
                        >
                          Thay
                        </button>
                        <button
                          type="button"
                          className="btn-tiny btn-danger"
                          onClick={() => handleUnequipItem('weapon')}
                        >
                          Gỡ
                        </button>
                      </div>
                    )}
                  </div>

                  {weaponItem ? (
                    <div className="equip-card-content">
                      <span className="item-name">{weaponItem.name}</span>
                      <div className="item-modifiers">
                        {weaponItem.modifiers.atk && (
                          <span className="mod-chip">ATK: +{weaponItem.modifiers.atk}</span>
                        )}
                        {weaponItem.modifiers.range && (
                          <span className="mod-chip">Tầm đánh: +{weaponItem.modifiers.range}</span>
                        )}
                        {weaponItem.modifiers.attackSpeed && (
                          <span className="mod-chip">
                            Tốc đánh: +{weaponItem.modifiers.attackSpeed}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="empty-slot-btn"
                      onClick={() => setPickingSlot('weapon')}
                    >
                      + Lắp trang bị
                    </button>
                  )}
                </div>

                {/* 💎 Gem Slot */}
                <div className={`equipment-card ${gemItem ? 'equipped' : 'empty'}`}>
                  <div className="equip-card-header">
                    <span className="equip-slot-title">💎 Ngọc</span>
                    {gemItem && (
                      <div className="equip-card-actions">
                        <button
                          type="button"
                          className="btn-tiny"
                          onClick={() => setPickingSlot('gem')}
                        >
                          Thay
                        </button>
                        <button
                          type="button"
                          className="btn-tiny btn-danger"
                          onClick={() => handleUnequipItem('gem')}
                        >
                          Gỡ
                        </button>
                      </div>
                    )}
                  </div>

                  {gemItem ? (
                    <div className="equip-card-content">
                      <span className="item-name">{gemItem.name}</span>
                      <div className="item-modifiers">
                        {gemItem.modifiers.atk && (
                          <span className="mod-chip">ATK: +{gemItem.modifiers.atk}</span>
                        )}
                        {gemItem.modifiers.range && (
                          <span className="mod-chip">Tầm đánh: +{gemItem.modifiers.range}</span>
                        )}
                        {gemItem.modifiers.attackSpeed && (
                          <span className="mod-chip">
                            Tốc đánh: +{gemItem.modifiers.attackSpeed}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="empty-slot-btn"
                      onClick={() => setPickingSlot('gem')}
                    >
                      + Lắp trang bị
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Skills & Passives */}
            <div className="skills-section">
              <h4 className="sub-heading">Kỹ Năng & Nội Tại</h4>

              {/* Active Skill */}
              <div className="skill-item active-skill">
                <div className="skill-header">
                  <span className="skill-badge active-badge">⚡ Kỹ Năng Chủ Động</span>
                  <span className="skill-trigger">Tự động sau {hero.skillTriggerHits} đòn</span>
                </div>
                <h5 className="skill-title">{activeSkill?.name ?? 'Kỹ Năng'}</h5>
                <p className="skill-desc">
                  {activeSkill?.effects
                    .map((e) => {
                      if (e.type === 'damage') return `Sát thương x${e.atkMultiplier}`
                      if (e.type === 'aoe')
                        return `Quét bán kính ${e.radius}px (tối đa ${e.maxTargets ?? 'hết'} mục tiêu)`
                      return e.type
                    })
                    .join(' • ')}
                </p>
              </div>

              {/* Legendary Passive */}
              <div className={`skill-item passive-skill ${isLegendary ? 'unlocked' : 'locked'}`}>
                <div className="skill-header">
                  <span className="skill-badge passive-badge">🌟 Passive Huyền Sử</span>
                  <span
                    className={`passive-status ${isLegendary ? 'status-open' : 'status-locked'}`}
                  >
                    {isLegendary ? '✨ Đã Mở Khóa' : '🔒 Đang Khóa'}
                  </span>
                </div>
                <h5 className="skill-title">{passive.name}</h5>
                <p className="skill-desc">{passive.description}</p>
                {!isLegendary && (
                  <span className="passive-lock-tip">
                    Yêu cầu: Đạt cảnh giới Huyền Sử để kích hoạt.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Progression & Stats Breakdown */}
          <div className="col-right">
            {/* Progression Info */}
            <div className="progression-box">
              <div className="progression-row">
                <div>
                  <span className="box-label">Cấp độ & Cảnh giới</span>
                  <div className={`level-display ${isCooldown ? 'level-cooldown' : ''}`}>
                    Lv. {activeProgression.level}{' '}
                    <span className="level-max">/ {MAX_HERO_LEVEL}</span>
                  </div>
                </div>

                {isCooldown && (
                  <div className="cooldown-pill">⏳ Đang hồi ({cooldownSeconds}s)</div>
                )}
              </div>

              {/* Stage chips */}
              <div className="stage-chips-row">
                {STAGES.map((s) => {
                  const meta = STAGE_LABELS[s]
                  const isActive = activeProgression.stage === s
                  const isPassed = STAGES.indexOf(s) < STAGES.indexOf(activeProgression.stage)
                  return (
                    <div
                      key={s}
                      className={`stage-chip ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                    >
                      <span className="chip-name">{meta.title}</span>
                      {isActive && <span className="chip-dot" />}
                    </div>
                  )
                })}
              </div>

              {/* Action Buttons: Emit requests */}
              <div className="progression-actions-row">
                <button
                  type="button"
                  className={`btn-action upgrade-btn ${isMaxLevel ? 'max' : isCooldown ? 'cooldown' : 'ready'}`}
                  disabled={!canUpgrade(activeProgression, currentTimeMs, featureFlags.upgradeCooldownEnabled)}
                  onClick={handleUpgrade}
                >
                  {isMaxLevel
                    ? 'Đạt Cấp Tối Đa'
                    : isCooldown
                      ? `Hồi Chiêu (${cooldownSeconds}s)`
                      : '⬆ Nâng Cấp'}
                </button>

                {canAdvanceStage(activeProgression) && (
                  <button
                    type="button"
                    className="btn-action advance-btn"
                    onClick={handleAdvanceStage}
                  >
                    ✨ Đột Phá Cảnh Giới
                  </button>
                )}
              </div>
            </div>

            {/* Stats Breakdown Table: Base + Equipment Bonus = Final */}
            <div className="stats-breakdown-box">
              <h4 className="sub-heading">Bảng Chỉ Số Chiến Đấu</h4>
              <p className="stats-formula-hint">Chỉ số gốc + Thưởng trang bị = Tổng chỉ số</p>

              <table className="stats-table" aria-label="Bảng chỉ số chi tiết">
                <thead>
                  <tr>
                    <th>Chỉ số</th>
                    <th>Gốc (Base)</th>
                    <th>Thưởng (Bonus)</th>
                    <th>Tổng (Final)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="stat-name">Máu (HP)</td>
                    <td>{baseScaledStats.hp.toLocaleString()}</td>
                    <td className="bonus-col">—</td>
                    <td className="final-col">{finalStats.hp.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="stat-name">Sát thương (ATK)</td>
                    <td>{baseScaledStats.atk}</td>
                    <td className="bonus-col">
                      {formatBonus(
                        (resolvedModifiers.weapon.atk ?? 0) + (resolvedModifiers.gem.atk ?? 0),
                      ) ?? '—'}
                    </td>
                    <td className="final-col">{finalStats.atk}</td>
                  </tr>
                  <tr>
                    <td className="stat-name">Tốc đánh (ASPD)</td>
                    <td>{baseScaledStats.attackSpeed.toFixed(2)}</td>
                    <td className="bonus-col">
                      {formatBonus(
                        (resolvedModifiers.weapon.attackSpeed ?? 0) +
                          (resolvedModifiers.gem.attackSpeed ?? 0),
                      ) ?? '—'}
                    </td>
                    <td className="final-col">{finalStats.attackSpeed.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="stat-name">Tầm đánh (Range)</td>
                    <td>{baseScaledStats.range}</td>
                    <td className="bonus-col">
                      {formatBonus(
                        (resolvedModifiers.weapon.range ?? 0) + (resolvedModifiers.gem.range ?? 0),
                      ) ?? '—'}
                    </td>
                    <td className="final-col">{finalStats.range}</td>
                  </tr>
                  <tr>
                    <td className="stat-name">Chí mạng (Crit)</td>
                    <td>{Math.round(baseScaledStats.crit * 100)}%</td>
                    <td className="bonus-col">—</td>
                    <td className="final-col">{Math.round(finalStats.crit * 100)}%</td>
                  </tr>
                  <tr>
                    <td className="stat-name">ST Chí mạng (Crit Dmg)</td>
                    <td>{Math.round(baseScaledStats.critDamage * 100)}%</td>
                    <td className="bonus-col">—</td>
                    <td className="final-col">{Math.round(finalStats.critDamage * 100)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Equipment Picker Modal/Drawer */}
        {pickingSlot && (
          <div className="picker-overlay" onClick={() => setPickingSlot(null)}>
            <div className="picker-modal" onClick={(e) => e.stopPropagation()}>
              <div className="picker-header">
                <h4 className="picker-title">
                  Chọn {pickingSlot === 'weapon' ? 'Vũ Khí' : 'Ngọc'}
                </h4>
                <button type="button" className="btn-tiny" onClick={() => setPickingSlot(null)}>
                  ✕
                </button>
              </div>

              <div className="picker-list">
                {candidateItems.length > 0 ? (
                  candidateItems.map((item) => {
                    const isCurrentlyEquipped =
                      pickingSlot === 'weapon'
                        ? activeEquipment.weaponId === item.id
                        : activeEquipment.gemId === item.id
                    return (
                      <button
                        type="button"
                        key={item.id}
                        className={`picker-item-btn ${isCurrentlyEquipped ? 'selected' : ''}`}
                        onClick={() => handleEquipItem(item)}
                      >
                        <div className="picker-item-main">
                          <span className="picker-item-name">{item.name}</span>
                          <span className="picker-item-mods">
                            {item.modifiers.atk && `ATK +${item.modifiers.atk} `}
                            {item.modifiers.range && `Range +${item.modifiers.range} `}
                            {item.modifiers.attackSpeed && `ASPD +${item.modifiers.attackSpeed} `}
                          </span>
                        </div>
                        {isCurrentlyEquipped && <span className="equipped-badge">Đang dùng</span>}
                      </button>
                    )
                  })
                ) : (
                  <p className="no-items-hint">Không có trang bị phù hợp.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
