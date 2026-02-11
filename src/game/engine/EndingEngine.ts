/**
 * EndingEngine - determines the ending based on final stats
 */

import { determineEnding, EndingConfig } from '@/game/data/endings';
import { useGameStore } from '@/game/state/useGameStore';

export class EndingEngine {
  /**
   * Determine the ending that applies to the current game state
   */
  static getEnding(): EndingConfig {
    const store = useGameStore.getState();
    return determineEnding(
      store.ambition,
      store.chaos,
      store.relations,
      store.parentalSuspicion,
      store.eventHistory
    );
  }

  /**
   * Get all unlocked photos for the ending slideshow
   */
  static getEndingPhotos(): string[] {
    const store = useGameStore.getState();
    return store.unlockedPhotos;
  }

  /**
   * Get the ending score (0-18) based on stats
   */
  static getLifeScore(): number {
    const store = useGameStore.getState();
    // Arbitrary scoring: balance of stats
    const ambitionScore = Math.min(store.ambition, 100) / 100 * 6; // 0-6
    const chaosScore = (50 - Math.abs(store.chaos - 50)) / 50 * 6; // 0-6, peaks at 50
    const relationsScore = Math.min(store.relations, 100) / 100 * 6; // 0-6
    return ambitionScore + chaosScore + relationsScore;
  }

  /**
   * Mark ending as unlocked for the gallery
   */
  static unlockEnding(endingId: string): void {
    const store = useGameStore.getState();
    store.unlockEnding(endingId);
  }
}
