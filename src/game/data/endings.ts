/**
 * Ending definitions
 * Each ending is determined by final stat values
 * The ending engine will select the best match
 */

export interface EndingConfig {
  id: string;
  title: string;
  description: string;
  conditions: {
    minAmbition?: number;
    maxAmbition?: number;
    minChaos?: number;
    maxChaos?: number;
    minRelations?: number;
    maxRelations?: number;
    requiresEvent?: string; // Special event prerequisite
  };
  summary: string; // Short narrative text shown at the end
  weight: number; // Priority if multiple endings match (higher = more likely)
}

export const ENDINGS: EndingConfig[] = [
  {
    id: 'buffalo-soldier',
    title: 'Buffalo Soldier',
    description: 'Australia awaits',
    conditions: {
      minAmbition: 60,
      maxChaos: 50,
      minRelations: 0,
      requiresEvent: 'airport-australia',
    },
    summary:
      "You took the flight to Australia. Nobody knows what happened after that. Some say you're still there, living your best life. The postcards stopped coming in 2024.",
    weight: 3,
  },
  {
    id: 'academic-teo',
    title: 'Academic Road',
    description: 'Life as a scholar',
    conditions: {
      minAmbition: 70,
      maxChaos: 30,
      minRelations: 30,
    },
    summary:
      "You focused on your studies and made it work. PhD pending. Your parents are finally proud. You still have student debt though.",
    weight: 2,
  },
  {
    id: 'investor-teo',
    title: 'Investor Teo',
    description: 'Wolf of the Web',
    conditions: {
      minAmbition: 60,
      maxChaos: 40,
      minRelations: 20,
      requiresEvent: 'stock-market-success',
    },
    summary:
      "Your crypto portfolio exploded. Or collapsed. Probably both. You're now either wealthy or broke, with no in-between.",
    weight: 2,
  },
  {
    id: 'chaos-but-happy',
    title: 'Chaos But Happy',
    description: 'Living on the edge',
    conditions: {
      minChaos: 70,
      minRelations: 60,
      maxAmbition: 40,
    },
    summary:
      "You became the person everyone calls first for a good time. Questionable life choices, amazing memories, zero regrets.",
    weight: 2,
  },
  {
    id: 'real-teo',
    title: 'Real Teo',
    description: 'Balanced life',
    conditions: {
      minAmbition: 30,
      maxAmbition: 70,
      minChaos: 20,
      maxChaos: 70,
      minRelations: 40,
    },
    summary:
      "You became a well-adjusted human who doesn't post their statistics online. Congratulations. You're normal.",
    weight: 1,
  },
  {
    id: 'parent-favorite',
    title: 'Parent\'s Favorite',
    description: 'The golden child',
    conditions: {
      minAmbition: 75,
      maxChaos: 20,
      minRelations: 75,
    },
    summary:
      "You are their favorite. Your siblings know it. The family photo looks perfect. But are you happy? The game doesn't measure that.",
    weight: 3,
  },
  {
    id: 'nobody-knows',
    title: 'Nobody Knows',
    description: 'The mystery ending',
    conditions: {
      minAmbition: 10,
      maxAmbition: 20,
      minChaos: 10,
      maxChaos: 20,
      minRelations: 10,
      maxRelations: 20,
    },
    summary:
      "Your life was so average it became remarkable. There's probably a Netflix documentary about how unremarkable you are.",
    weight: 1,
  },
];

/**
 * Determine which ending applies based on final stats
 */
export function determineEnding(
  ambition: number,
  chaos: number,
  relations: number,
  parentalSuspicion?: number,
  eventHistory?: string[]
): EndingConfig {
  // Sort by weight to prioritize special endings
  const sorted = [...ENDINGS].sort((a, b) => b.weight - a.weight);

  for (const ending of sorted) {
    const conditions = ending.conditions;

    // Check all conditions
    if (
      (!conditions.minAmbition || ambition >= conditions.minAmbition) &&
      (!conditions.maxAmbition || ambition <= conditions.maxAmbition) &&
      (!conditions.minChaos || chaos >= conditions.minChaos) &&
      (!conditions.maxChaos || chaos <= conditions.maxChaos) &&
      (!conditions.minRelations ||
        relations >= conditions.minRelations) &&
      (!conditions.maxRelations ||
        relations <= conditions.maxRelations) &&
      (!conditions.requiresEvent ||
        (eventHistory && eventHistory.includes(conditions.requiresEvent)))
    ) {
      return ending;
    }
  }

  // Fallback to Real Teo if nothing matches
  return ENDINGS.find((e) => e.id === 'real-teo') || ENDINGS[0];
}
