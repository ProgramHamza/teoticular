/**
 * CleanupAfterParty Mini-game
 * A timing/memory game where you clean up a messy room before parents come home
 */

export interface CleanupResult {
  success: boolean;
  ambitionDelta: number;
  chaosDelta: number;
  relationsDelta: number;
}

interface CleanupItem {
  name: string;
  timeToClean: number; // Milliseconds
  difficulty: number; // 0-1
}

const ITEMS: CleanupItem[] = [
  { name: 'Empty bottles', timeToClean: 1000, difficulty: 0.7 },
  { name: 'Trash', timeToClean: 800, difficulty: 0.5 },
  { name: 'Spilled drinks', timeToClean: 1200, difficulty: 0.8 },
  { name: 'Furniture', timeToClean: 1500, difficulty: 0.9 },
  { name: 'Windows', timeToClean: 2000, difficulty: 0.95 },
];

export class CleanupAfterPartyGame {
  /**
   * Play the cleanup mini-game
   * @param chaos - Player's chaos stat (affects difficulty)
   * @returns Game result
   */
  static play(chaos: number): CleanupResult {
    // Time limit: 60 seconds (scaled by chaos - higher chaos = less time)
    const baseTimeLimit = 60000;
    const timeLimit = baseTimeLimit * (1 - chaos / 100 * 0.3); // Up to 30% reduction

    // Select random items to clean
    const itemsToClean = ITEMS.sort(() => Math.random() - 0.5).slice(
      0,
      2 + Math.floor(Math.random() * 2)
    ); // 2-4 items

    let totalTimeTaken = 0;
    let itemsCleaned = 0;

    for (const item of itemsToClean) {
      // Simulate player performance
      // Higher ambition makes them clean faster
      const playerFocus = 0.5; // In a non-interactive version, assume medium focus
      const actualTime = item.timeToClean * (1 + item.difficulty * (1 - playerFocus));

      totalTimeTaken += actualTime;

      if (totalTimeTaken < timeLimit) {
        itemsCleaned++;
      } else {
        break;
      }
    }

    const cleanupRatio = itemsCleaned / itemsToClean.length;
    const success = cleanupRatio >= 0.75; // 75% cleaned = success

    return {
      success,
      ambitionDelta: success ? 5 : -5,
      chaosDelta: success ? -10 : -3, // Cleaning reduces chaos
      relationsDelta: success ? 10 : 2, // Parents appreciate cleanliness
    };
  }
}
