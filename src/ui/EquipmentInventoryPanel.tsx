import { EQUIPMENT_MAX_LEVEL, resolveEquipmentInstanceModifiers } from '../domain/equipment/EquipmentV2'
import type { EquipmentSlot, EquipmentV2Definition } from '../domain/equipment/EquipmentSystem'
import type { MetaSave } from '../domain/meta/MetaState'

export interface EquipmentInventoryPanelProps {
  save: MetaSave
  selectedHeroId: string
  definitions: Readonly<Record<string, EquipmentV2Definition>>
  onEquip: (instanceId: string) => void
  onUnequip: (slot: EquipmentSlot) => void
  onMerge: (ingredientInstanceIds: readonly string[]) => void
}

function modifierText(modifiers: ReturnType<typeof resolveEquipmentInstanceModifiers>): string {
  return [
    modifiers.atk ? `ATK +${modifiers.atk}` : '',
    modifiers.range ? `Range +${modifiers.range}` : '',
    modifiers.attackSpeed ? `AttackSpeed +${modifiers.attackSpeed}` : '',
  ].filter(Boolean).join(' · ')
}

export function EquipmentInventoryPanel({
  save,
  selectedHeroId,
  definitions,
  onEquip,
  onUnequip,
  onMerge,
}: EquipmentInventoryPanelProps) {
  const instances = Object.values(save.data.inventory.equipmentInstances)
  const ownerByInstance = new Map<string, string>()
  Object.entries(save.data.inventory.equippedByHero).forEach(([heroId, loadout]) => {
    if (loadout.weaponInstanceId) ownerByInstance.set(loadout.weaponInstanceId, heroId)
    if (loadout.gemInstanceId) ownerByInstance.set(loadout.gemInstanceId, heroId)
  })
  const selectedLoadout = save.data.inventory.equippedByHero[selectedHeroId] ?? {}
  const mergeGroups = new Map<string, string[]>()
  instances.forEach((instance) => {
    const definition = definitions[instance.definitionId]
    if (!definition?.mergeable || definition.exclusiveHeroId || instance.level >= EQUIPMENT_MAX_LEVEL || ownerByInstance.has(instance.instanceId)) return
    const key = `${instance.definitionId}:${instance.level}`
    const group = mergeGroups.get(key) ?? []
    group.push(instance.instanceId)
    mergeGroups.set(key, group)
  })

  return (
    <section className="equipment-v2-panel" aria-label="Hành Trang Equipment V2">
      <div className="equipment-v2-heading">
        <div>
          <h2>Hành Trang</h2>
          <p>Hero đang chọn: {selectedHeroId}. Mỗi Hero dùng tối đa 1 Vũ Khí và 1 Ngọc.</p>
        </div>
        <span>Meta V5 · {instances.length} trang bị</span>
      </div>
      {instances.length === 0 ? (
        <p className="equipment-v2-empty">Chưa có Equipment instance. Trang bị legacy hợp lệ sẽ được import tự động.</p>
      ) : (
        <div className="equipment-v2-list">
          {instances.map((instance) => {
            const definition = definitions[instance.definitionId]
            if (!definition) return null
            const owner = ownerByInstance.get(instance.instanceId)
            const equippedBySelected = owner === selectedHeroId
            const mergeIds = mergeGroups.get(`${instance.definitionId}:${instance.level}`)?.slice(0, 3) ?? []
            const isMergeLeader = mergeIds.length === 3 && mergeIds[0] === instance.instanceId
            return (
              <article className="equipment-v2-card" key={instance.instanceId}>
                <div>
                  <strong>{definition.name}</strong>
                  <span>Lv{instance.level} · {instance.slot === 'weapon' ? 'Vũ Khí' : 'Ngọc'}</span>
                  <small>{modifierText(resolveEquipmentInstanceModifiers(instance, definitions))}</small>
                  <small>{owner ? `Đang trang bị: ${owner}` : 'Chưa trang bị'}</small>
                </div>
                <div className="equipment-v2-actions">
                  {equippedBySelected ? (
                    <button type="button" onClick={() => onUnequip(instance.slot)}>Gỡ</button>
                  ) : (
                    <button type="button" disabled={Boolean(owner)} onClick={() => onEquip(instance.instanceId)}>Lắp</button>
                  )}
                  {isMergeLeader && <button type="button" onClick={() => onMerge(mergeIds)}>Ghép 3 → Lv{instance.level + 1}</button>}
                </div>
              </article>
            )
          })}
        </div>
      )}
      <div className="equipment-v2-equipped">
        <span>Weapon: {selectedLoadout.weaponInstanceId ?? 'NONE'}</span>
        <span>Gem: {selectedLoadout.gemInstanceId ?? 'NONE'}</span>
      </div>
    </section>
  )
}

