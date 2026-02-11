/**
 * ConvinceParents Mini-game
 * A turn-based argument game where you convince parents to let you invest
 */

export interface ConvinceParentsResult {
  success: boolean;
  ambitionDelta: number;
  chaosDelta: number;
  relationsDelta: number;
}

export interface ConvinceParentsArgument {
  text: string;
  successChance: number; // 0-1
  statImpact: {
    parentAmbitionLike: number; // How much this helps with ambitious parents
    parentRelationLike: number; // How much this helps with relation-focused parents
  };
}

const ARGUMENTS: ConvinceParentsArgument[] = [
  {
    text: 'It\'s a good way to learn about finance',
    successChance: 0.7,
    statImpact: { parentAmbitionLike: 0.8, parentRelationLike: 0.4 },
  },
  {
    text: 'I promise I\'ll only invest what I can afford to lose',
    successChance: 0.6,
    statImpact: { parentAmbitionLike: 0.5, parentRelationLike: 0.7 },
  },
  {
    text: 'Grandma said I\'m smart about money',
    successChance: 0.75,
    statImpact: { parentAmbitionLike: 0.4, parentRelationLike: 0.9 },
  },
  {
    text: 'Everyone else is doing it',
    successChance: 0.3,
    statImpact: { parentAmbitionLike: 0.0, parentRelationLike: 0.1 },
  },
  {
    text: 'It\'ll look good on college applications',
    successChance: 0.8,
    statImpact: { parentAmbitionLike: 0.95, parentRelationLike: 0.5 },
  },
];

export class ConvinceParentsGame {
  /**
   * Play the convince parents minigame
   * @param playerAmbition - Player's ambition stat (0-100)
   * @param playerRelations - Player's relations stat (0-100)
   * @returns Game result with stat deltas
   */
  static play(playerAmbition: number, playerRelations: number): ConvinceParentsResult {
    const numRounds = 3;
    let argsWon = 0;

    // Parents have tendencies based on game narrative
    // In this game, they're moderately resistant
    const parentAmbitionScholar = playerAmbition / 100; // They value ambition
    const parentRelationBond = Math.min(0.8, playerRelations / 100); // They care about you

    for (let i = 0; i < numRounds; i++) {
      // Player picks a random argument
      const arg = ARGUMENTS[Math.floor(Math.random() * ARGUMENTS.length)];

      // Success is based on:
      // 1. Argument's inherent strength
      // 2. Parent type matching
      const parentScore =
        arg.statImpact.parentAmbitionLike * parentAmbitionScholar +
        arg.statImpact.parentRelationLike * parentRelationBond;

      const finalSuccessChance = Math.min(0.95, arg.successChance + parentScore * 0.2);

      if (Math.random() < finalSuccessChance) {
        argsWon++;
      }
    }

    // Determine outcome
    const success = argsWon >= 2; // Win if you win 2 or more arguments

    return {
      success,
      ambitionDelta: success ? 5 : -3,
      chaosDelta: success ? 0 : 5, // Conflict causes chaos
      relationsDelta: success ? 5 : -5, // Success improves relations
    };
  }
}
