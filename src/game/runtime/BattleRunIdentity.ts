export function createBattleRunId(createUuid: () => string = () => globalThis.crypto.randomUUID()): string {
  const uuid = createUuid().trim()
  if (uuid.length === 0) throw new Error('Battle run UUID must not be empty')
  return `battle-${uuid}`
}
