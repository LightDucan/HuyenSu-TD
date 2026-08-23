import { useEffect, useState } from 'react'
import { equipmentDefinitions } from '../data/equipment/definitions'
import { quanVu } from '../data/heroes/quanVu'
import { heroPassives, type PassiveDefinition } from '../data/passives/definitions'
import { skillDefinitions } from '../data/skills/definitions'
import { loadEquipment, saveHeroEquipment } from '../domain/equipment/EquipmentStorage'
import {
  resolveEquipmentModifiers,
  type EquipmentDefinition,
  type EquipmentSlot,
  type HeroEquipment,
} from '../domain/equipment/EquipmentSystem'
import { calculateHeroLoadoutStats } from '../domain/equipment/HeroLoadout'
import { loadProgression, saveHeroProgression } from '../domain/progression/ProgressionStorage'
import {
  advanceStage,
  canAdvanceStage,
  canUpgrade,
  MAX_HERO_LEVEL,
  type HeroProgression,
  type HeroStage,
  upgradeLevel,
} from '../domain/progression/ProgressionSystem'
import { calculateHeroStats } from '../domain/progression/StatCalculator'

export interface HeroDetailModalProps {
  isOpen: boolean
  onClose: () => void
  heroId?: string
}

const STAGE_LABELS: Record<HeroStage, { name: string; title: string; order: number }> = {
  normal: { name: 'Normal', title: 'Thường', order: 1 },
  rebirth: { name: 'Rebirth', title: 'Trùng Sinh', order: 2 },
  reincarnation: { name: 'Reincarnation', title: 'Tái Sinh', order: 3 },
  legendary: { name: 'Legendary', title: 'Huyền Sử', order: 4 },
}

const STAGES: readonly HeroStage[] = ['normal', 'rebirth', 'reincarnation', 'legendary']
const UPGRADE_COOLDOWN_MS = 3000

export function HeroDetailModal({ isOpen, onClose, heroId = quanVu.id }: HeroDetailModalProps) {
  const [progression, setProgression] = useState<HeroProgression>(() => {
    if (typeof window === 'undefined') return { stage: 'normal', level: 1 }
    const saved = loadProgression(window.localStorage).heroes[heroId]
    return saved ?? { stage: 'normal', level: 1 }
  })

  const [equipment, setEquipment] = useState<HeroEquipment>(() => {
    if (typeof window === 'undefined') return {}
    const saved = loadEquipment(window.localStorage).heroes[heroId]
    return saved ?? {}
  })

  const [currentTimeMs, setCurrentTimeMs] = useState(() => Date.now())
  const [pickingSlot, setPickingSlot] = useState<EquipmentSlot | null>(null)

  // Reload data whenever modal opens
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return
    const progSave = loadProgression(window.localStorage).heroes[heroId]
    if (progSave) setProgression(progSave)
    const equipSave = loadEquipment(window.localStorage).heroes[heroId]
    if (equipSave) setEquipment(equipSave)
  }, [isOpen, heroId])

  // Timer for progression cooldown
  useEffect(() => {
    if (!progression.upgradeReadyAt || progression.upgradeReadyAt <= Date.now()) return
    const interval = window.setInterval(() => setCurrentTimeMs(Date.now()), 100)
    return () => window.clearInterval(interval)
  }, [progression.upgradeReadyAt])

  if (!isOpen) return null

  // Calculate stats via Core domain functions
  const baseScaledStats = calculateHeroStats(quanVu.baseStats, progression)
  const finalStats = calculateHeroLoadoutStats(quanVu.baseStats, progression, equipment, equipmentDefinitions)
  const resolvedModifiers = resolveEquipmentModifiers(equipment, equipmentDefinitions)

  const activeSkill = skillDefinitions[quanVu.activeSkillId]
  const passive: PassiveDefinition = heroPassives[heroId] ?? {
    id: 'default-passive',
    name: 'Huyền Sử Chi Lực',
    description: 'Tăng toàn bộ chỉ số và mở khóa hiệu ứng đặc biệt khi đạt Huyền Sử.',
    requiredStage: 'legendary',
  }

  const isLegendary = progression.stage === 'legendary'
  const isMaxLevel = progression.level >= MAX_HERO_LEVEL
  const cooldownRemainingMs = Math.max(0, (progression.upgradeReadyAt ?? currentTimeMs) - currentTimeMs)
  const isCooldown = cooldownRemainingMs > 0
  const cooldownSeconds = (cooldownRemainingMs / 1000).toFixed(1)

  const weaponItem = equipment.weaponId ? equipmentDefinitions[equipment.weaponId] : null
  const gemItem = equipment.gemId ? equipmentDefinitions[equipment.gemId] : null

  // Progression handlers
  const handleUpgrade = () => {
    const nowMs = Date.now()
    if (!canUpgrade(progression, nowMs)) return
    const next = upgradeLevel(progression, nowMs, UPGRADE_COOLDOWN_MS)
    setProgression(next)
    setCurrentTimeMs(nowMs)
    saveHeroProgression(window.localStorage, heroId, next)
  }

  const handleAdvanceStage = () => {
    if (!canAdvanceStage(progression)) return
    const next = advanceStage(progression)
    setProgression(next)
    saveHeroProgression(window.localStorage, heroId, next)
  }

  // Equipment handlers
  const handleEquipItem = (item: EquipmentDefinition) => {
    const next: HeroEquipment =
      item.slot === 'weapon'
        ? { ...equipment, weaponId: item.id }
        : { ...equipment, gemId: item.id }
    setEquipment(next)
    saveHeroEquipment(window.localStorage, heroId, next)
    setPickingSlot(null)
  }

  const handleUnequipItem = (slot: EquipmentSlot) => {
    const next: HeroEquipment =
      slot === 'weapon'
        ? { ...equipment, weaponId: undefined }
        : { ...equipment, gemId: undefined }
    setEquipment(next)
    saveHeroEquipment(window.localStorage, heroId, next)
  }

  // List of candidate items for picking slot
  const candidateItems = Object.values(equipmentDefinitions).filter(
    (item) => pickingSlot && item.slot === pickingSlot,
  )

  const formatBonus = (val?: number) => (val && val > 0 ? `+${val}` : null)

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="hero-detail-title">
      <div className="hero-detail-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="hero-detail-title" className="modal-title">
              Chi Tiết Anh Hùng: {quanVu.name}
            </h2>
            <span className="hero-tagline">
              Phe: {quanVu.faction} • Vai trò: {quanVu.archetype}
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
                <span className="avatar-icon" aria-hidden="true">🗡️</span>
              </div>
              <div className="hero-meta">
                <h3 className="hero-name">{quanVu.name}</h3>
                <span className="skin-label">Trang phục: {quanVu.presentation.skinId}</span>
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
                          <span className="mod-chip">Tốc đánh: +{weaponItem.modifiers.attackSpeed}</span>
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
                          <span className="mod-chip">Tốc đánh: +{gemItem.modifiers.attackSpeed}</span>
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
                  <span className="skill-trigger">Tự động sau {quanVu.skillTriggerHits} đòn</span>
                </div>
                <h5 className="skill-title">{activeSkill?.name ?? 'Kỹ Năng'}</h5>
                <p className="skill-desc">
                  {activeSkill?.effects.map((e) => {
                    if (e.type === 'damage') return `Sát thương x${e.atkMultiplier}`
                    if (e.type === 'aoe') return `Quét bán kính ${e.radius}px (tối đa ${e.maxTargets ?? 'hết'} mục tiêu)`
                    return e.type
                  }).join(' • ')}
                </p>
              </div>

              {/* Legendary Passive */}
              <div className={`skill-item passive-skill ${isLegendary ? 'unlocked' : 'locked'}`}>
                <div className="skill-header">
                  <span className="skill-badge passive-badge">🌟 Passive Huyền Sử</span>
                  <span className={`passive-status ${isLegendary ? 'status-open' : 'status-locked'}`}>
                    {isLegendary ? '✨ Đã Mở Khóa' : '🔒 Đang Khóa'}
                  </span>
                </div>
                <h5 className="skill-title">{passive.name}</h5>
                <p className="skill-desc">{passive.description}</p>
                {!isLegendary && (
                  <span className="passive-lock-tip">Yêu cầu: Đạt cảnh giới Huyền Sử để kích hoạt.</span>
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
                    Lv. {progression.level} <span className="level-max">/ {MAX_HERO_LEVEL}</span>
                  </div>
                </div>

                {isCooldown && (
                  <div className="cooldown-pill">
                    ⏳ Đang hồi ({cooldownSeconds}s)
                  </div>
                )}
              </div>

              {/* Stage chips */}
              <div className="stage-chips-row">
                {STAGES.map((s) => {
                  const meta = STAGE_LABELS[s]
                  const isActive = progression.stage === s
                  const isPassed = STAGES.indexOf(s) < STAGES.indexOf(progression.stage)
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

              {/* Action Buttons */}
              <div className="progression-actions-row">
                <button
                  type="button"
                  className={`btn-action upgrade-btn ${isMaxLevel ? 'max' : isCooldown ? 'cooldown' : 'ready'}`}
                  disabled={!canUpgrade(progression, currentTimeMs)}
                  onClick={handleUpgrade}
                >
                  {isMaxLevel ? 'Đạt Cấp Tối Đa' : isCooldown ? `Hồi Chiêu (${cooldownSeconds}s)` : '⬆ Nâng Cấp'}
                </button>

                {canAdvanceStage(progression) && (
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
                      {formatBonus((resolvedModifiers.weapon.atk ?? 0) + (resolvedModifiers.gem.atk ?? 0)) ?? '—'}
                    </td>
                    <td className="final-col">{finalStats.atk}</td>
                  </tr>
                  <tr>
                    <td className="stat-name">Tốc đánh (ASPD)</td>
                    <td>{baseScaledStats.attackSpeed.toFixed(2)}</td>
                    <td className="bonus-col">
                      {formatBonus((resolvedModifiers.weapon.attackSpeed ?? 0) + (resolvedModifiers.gem.attackSpeed ?? 0)) ?? '—'}
                    </td>
                    <td className="final-col">{finalStats.attackSpeed.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="stat-name">Tầm đánh (Range)</td>
                    <td>{baseScaledStats.range}</td>
                    <td className="bonus-col">
                      {formatBonus((resolvedModifiers.weapon.range ?? 0) + (resolvedModifiers.gem.range ?? 0)) ?? '—'}
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
                        ? equipment.weaponId === item.id
                        : equipment.gemId === item.id
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
