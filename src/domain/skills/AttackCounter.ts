export class AttackCounter {
  private hits = 0

  constructor(private readonly triggerHits: number) {
    if (!Number.isInteger(triggerHits) || triggerHits < 1) throw new RangeError('triggerHits must be a positive integer')
  }

  registerHit(): boolean {
    this.hits += 1
    if (this.hits < this.triggerHits) return false
    this.hits = 0
    return true
  }

  getCurrentHits(): number { return this.hits }
}
