import { useEffect, useState } from 'react'
import { heroPassives, type PassiveDefinition } from '../data/passives/definitions'
import { MAX_HERO_LEVEL, type HeroStage } from '../domain/progression/ProgressionSystem'

export type UpgradeButtonState = 'ready' | 'cooldown' | 'max_level'

export interface HeroProgressionPanelProps {
  heroId?: string
  heroName?: string
  initialStage?: HeroStage
  initialLevel?: number
  initialCooldownMs?: number
  onUpgrade?: (nextLevel: number) => void
  onAdvanceStage?: (nextStage: HeroStage) => void
}

const STAGE_LABELS: Record<HeroStage, { name: string; title: string; order: number }> = {
  normal: { name: 'Normal', title: 'Thường', order: 1 },
  rebirth: { name: 'Rebirth', title: 'Trùng Sinh', order: 2 },
  reincarnation: { name: 'Reincarnation', title: 'Tái Sinh', order: 3 },
  legendary: { name: 'Legendary', title: 'Huyền Sử', order: 4 },
}

const STAGES: readonly HeroStage[] = ['normal', 'rebirth', 'reincarnation', 'legendary']

export function HeroProgressionPanel({
  heroId = 'quan-vu',
  heroName = 'Quan Vũ',
  initialStage = 'normal',
  initialLevel = 1,
  initialCooldownMs = 0,
  onUpgrade,
  onAdvanceStage,
}: HeroProgressionPanelProps) {
  const [stage, setStage] = useState<HeroStage>(initialStage)
  const [level, setLevel] = useState<number>(initialLevel)
  const [cooldownRemainingMs, setCooldownRemainingMs] = useState<number>(initialCooldownMs)

  const passive: PassiveDefinition = heroPassives[heroId] ?? {
    id: 'default-passive',
    name: 'Huyền Sử Chi Lực',
    description: 'Tăng toàn bộ chỉ số và mở khóa hiệu ứng đặc biệt khi đạt Huyền Sử.',
    requiredStage: 'legendary',
  }

  const isLegendary = stage === 'legendary'
  const isMaxLevel = level >= MAX_HERO_LEVEL
  const isCooldown = cooldownRemainingMs > 0

  // Tick countdown timer for cooldown
  useEffect(() => {
    if (cooldownRemainingMs <= 0) return

    const interval = setInterval(() => {
      setCooldownRemainingMs((prev) => {
        const next = prev - 100
        return next > 0 ? next : 0
      })
    }, 100)

    return () => clearInterval(interval)
  }, [cooldownRemainingMs])

  // Determine upgrade button state
  const buttonState: UpgradeButtonState = isMaxLevel
    ? 'max_level'
    : isCooldown
      ? 'cooldown'
      : 'ready'

  const handleUpgradeClick = () => {
    if (buttonState !== 'ready') return
    const next = Math.min(level + 1, MAX_HERO_LEVEL)
    setLevel(next)
    // 3 second cooldown for demonstration
    setCooldownRemainingMs(3000)
    onUpgrade?.(next)
  }

  const handleAdvanceStage = () => {
    const currentIndex = STAGES.indexOf(stage)
    if (currentIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentIndex + 1]
      setStage(nextStage)
      setLevel(1)
      setCooldownRemainingMs(0)
      onAdvanceStage?.(nextStage)
    }
  }

  const handleSetStage = (targetStage: HeroStage) => {
    setStage(targetStage)
  }

  const cooldownSeconds = (cooldownRemainingMs / 1000).toFixed(1)

  return (
    <section className="progression-panel" aria-label={`Tiến trình ${heroName}`}>
      <div className="progression-header">
        <div>
          <h2 className="progression-title">Tiến Trình Anh Hùng: {heroName}</h2>
          <p className="progression-subtitle">Hệ thống cấp độ & cảnh giới tiến hóa</p>
        </div>

        {/* Level Display */}
        <div className={`level-badge-container ${isCooldown ? 'level-cooldown' : ''}`}>
          <span className="level-label">Cấp độ</span>
          <span className={`level-value ${isCooldown ? 'level-cooldown' : ''}`}>
            Lv. {level} <span className="level-max">/ {MAX_HERO_LEVEL}</span>
          </span>
          {isCooldown && <span className="cooldown-tag">Đang hồi ({cooldownSeconds}s)</span>}
        </div>
      </div>

      {/* Evolution Stages */}
      <div className="evolution-section">
        <h3 className="section-heading">Cảnh Giới Tiến Hóa</h3>
        <div className="stage-list" role="list">
          {STAGES.map((s) => {
            const meta = STAGE_LABELS[s]
            const isActive = stage === s
            const isPassed = STAGES.indexOf(s) < STAGES.indexOf(stage)
            return (
              <button
                type="button"
                key={s}
                className={`stage-card ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                onClick={() => handleSetStage(s)}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="stage-order">Giai đoạn {meta.order}</span>
                <span className="stage-name">{meta.name}</span>
                <span className="stage-title">({meta.title})</span>
                {isActive && <span className="stage-badge current">Hiện tại</span>}
                {isPassed && <span className="stage-badge done">✓ Đã qua</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Legendary Passive Slot & Description */}
      <div className="passive-section">
        <h3 className="section-heading">Kỹ Năng Nội Tại Huyền Sử (Legendary Passive)</h3>
        <div className={`passive-card ${isLegendary ? 'unlocked' : 'locked'}`}>
          <div className="passive-header">
            <div className="passive-icon-wrapper">
              <span className="passive-icon" aria-hidden="true">
                {isLegendary ? '✨' : '🔒'}
              </span>
              <div>
                <h4 className="passive-name">{passive.name}</h4>
                <span className={`passive-status-badge ${isLegendary ? 'badge-unlocked' : 'badge-locked'}`}>
                  {isLegendary ? 'Đã Mở Khóa' : 'Đang Khóa'}
                </span>
              </div>
            </div>
            {!isLegendary && (
              <span className="passive-lock-hint">Yêu cầu: Đạt cảnh giới Legendary (Huyền Sử)</span>
            )}
          </div>

          <div className="passive-description-area">
            <p className="passive-description">{passive.description}</p>
          </div>
        </div>
      </div>

      {/* Upgrade & Action Controls */}
      <div className="progression-actions">
        <div className="upgrade-group">
          <button
            type="button"
            className={`upgrade-btn state-${buttonState}`}
            disabled={buttonState !== 'ready'}
            onClick={handleUpgradeClick}
          >
            {buttonState === 'ready' && 'Nâng Cấp (Ready)'}
            {buttonState === 'cooldown' && `Đang Hồi Chiêu (Cooldown: ${cooldownSeconds}s)`}
            {buttonState === 'max_level' && 'Đạt Cấp Tối Đa (Max Level)'}
          </button>

          {isMaxLevel && !isLegendary && (
            <button
              type="button"
              className="advance-btn"
              onClick={handleAdvanceStage}
            >
              Đột Phá Cảnh Giới Tiếp Theo →
            </button>
          )}
        </div>

        {/* Demo state helper controls */}
        <div className="demo-controls" aria-label="Điều khiển thử nghiệm UI">
          <span className="demo-label">Thử nghiệm trạng thái:</span>
          <button
            type="button"
            className="demo-btn"
            onClick={() => setCooldownRemainingMs((prev) => (prev > 0 ? 0 : 5000))}
          >
            {isCooldown ? 'Tắt Cooldown' : 'Bật Cooldown 5s'}
          </button>
          <button
            type="button"
            className="demo-btn"
            onClick={() => setLevel((prev) => (prev >= MAX_HERO_LEVEL ? 1 : MAX_HERO_LEVEL))}
          >
            {level === MAX_HERO_LEVEL ? 'Đặt Lv. 1' : 'Đặt Lv. 100 (Max)'}
          </button>
        </div>
      </div>
    </section>
  )
}
