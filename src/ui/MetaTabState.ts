export type MetaTab = 'roster' | 'inventory'

export function selectMetaTab(_current: MetaTab, requested: MetaTab): MetaTab {
  return requested
}
