/**
 * Event definitions for game events and decision points
 */

export interface EventChoice {
  id: string;
  text: string;
  statDeltas: {
    ambition: number;
    chaos: number;
    relations: number;
  };
  parentalSuspicionDelta?: number;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  flavor: string; // Story text
  age?: number; // Age requirement
  minAge?: number;
  maxAge?: number;
  probability?: number; // 0-1, for random events
  choices: EventChoice[];
  photoUnlock?: string; // Photo ID to unlock
  requiresInvestmentUnlocked?: boolean; // Some events need stock market unlocked
}

export const EVENTS: GameEvent[] = [
  // CHILDHOOD EVENTS (acts as tutorial/mandatory progression)
  {
    id: 'childhood-smile',
    title: 'First Smile',
    description: 'You smile for the first time',
    flavor: 'Your face contorts. Everyone thinks something is wrong. Then they realize: you smiled.',
    age: 0,
    choices: [
      {
        id: 'smile-happy',
        text: 'It was genuine',
        statDeltas: { ambition: 0, chaos: 0, relations: 5 },
      },
    ],
    photoUnlock: 'baby-first-smile',
  },
  {
    id: 'childhood-walk',
    title: 'First Steps',
    description: 'You take your first wobbly steps',
    flavor:
      'You pull yourself up on the couch. Two steps. You fall. The entire room erupts. You are a god among children.',
    age: 1,
    choices: [
      {
        id: 'walk-success',
        text: 'Success! Or at least, you didn\'t eat dirt.',
        statDeltas: { ambition: 5, chaos: 0, relations: 5 },
      },
    ],
    photoUnlock: 'baby-first-steps',
  },

  // SCHOOL YEARS EVENTS
  {
    id: 'school-friend',
    title: 'New Friend',
    description: 'Someone sits next to you and smiles',
    flavor: 'They share their snacks. You share yours. A friendship forms.',
    minAge: 7,
    maxAge: 12,
    probability: 0.3,
    choices: [
      {
        id: 'be-friend',
        text: 'You have a new best friend',
        statDeltas: { ambition: 0, chaos: 0, relations: 10 },
      },
      {
        id: 'ignore-friend',
        text: 'You keep to yourself',
        statDeltas: { ambition: 5, chaos: 0, relations: -3 },
      },
    ],
    photoUnlock: 'school-friend',
  },
  {
    id: 'school-carnival',
    title: 'School Carnival',
    description: 'The school holds a carnival with games and prizes',
    flavor:
      'Ring toss, basketball hoops, face painting. The smell of popcorn and youth.',
    minAge: 7,
    maxAge: 12,
    probability: 0.2,
    choices: [
      {
        id: 'carnival-play',
        text: 'You compete and have fun',
        statDeltas: { ambition: 5, chaos: 5, relations: 8 },
      },
      {
        id: 'carnival-study',
        text: 'You stay home and study',
        statDeltas: { ambition: 10, chaos: -5, relations: -5 },
      },
    ],
    photoUnlock: 'school-carnival',
  },

  // TEENAGE YEARS EVENTS
  {
    id: 'teenage-start',
    title: 'High School Begins',
    description: 'Welcome to the big leagues',
    flavor:
      'You walk into the school. It\'s bigger than you expected. Everyone seems to know what they\'re doing. They don\'t.',
    age: 13,
    choices: [
      {
        id: 'hs-social',
        text: 'You try to make friends',
        statDeltas: { ambition: 0, chaos: 5, relations: 10 },
      },
      {
        id: 'hs-focused',
        text: 'You focus on academics',
        statDeltas: { ambition: 10, chaos: -5, relations: 0 },
      },
    ],
    photoUnlock: 'high-school-first-day',
  },
  {
    id: 'bar-party-night',
    title: 'The Party',
    description: 'Someone invites you to a bar/party',
    flavor:
      'The music is too loud. Everyone seems to know something you don\'t. But you\'re here. Might as well try.',
    minAge: 15,
    maxAge: 18,
    probability: 0.4,
    choices: [
      {
        id: 'party-go',
        text: 'You go and let loose',
        statDeltas: { ambition: -5, chaos: 15, relations: 10 },
        parentalSuspicionDelta: 15,
      },
      {
        id: 'party-skip',
        text: 'You bow out gracefully',
        statDeltas: { ambition: 5, chaos: -5, relations: -5 },
      },
    ],
    photoUnlock: 'bar-party',
  },
  {
    id: 'office-intern',
    title: 'Office Internship',
    description: 'You land an internship at a local company',
    flavor:
      'You show up in business casual. Everyone is in hoodies. You feel overdressed and underprepared.',
    minAge: 16,
    maxAge: 18,
    probability: 0.3,
    choices: [
      {
        id: 'intern-hustle',
        text: 'You work hard and impress',
        statDeltas: { ambition: 15, chaos: -5, relations: 5 },
      },
      {
        id: 'intern-coast',
        text: 'You do the bare minimum',
        statDeltas: { ambition: 2, chaos: 5, relations: 0 },
      },
    ],
    photoUnlock: 'office-intern',
  },
  {
    id: 'grandma-visit',
    title: 'Visit Grandma',
    description: 'You go to grandma\'s house',
    flavor:
      'She cooked your favorite. She asks too many questions. You don\'t mind. It feels safe here.',
    minAge: 14,
    maxAge: 18,
    probability: 0.25,
    choices: [
      {
        id: 'grandma-stay',
        text: 'You spend the whole day there',
        statDeltas: { ambition: 0, chaos: -8, relations: 12 },
      },
      {
        id: 'grandma-rush',
        text: 'You stay for an hour then leave',
        statDeltas: { ambition: 2, chaos: 0, relations: 3 },
      },
    ],
    photoUnlock: 'grandma-visit',
  },
  {
    id: 'sports-win',
    title: 'Sports Achievement',
    description: 'You accomplish something athletic',
    flavor:
      'You won the race. Or a volleyball game. Or a chess match (that counts, right?).',
    minAge: 16,
    maxAge: 18,
    probability: 0.2,
    choices: [
      {
        id: 'sports-celebrate',
        text: 'You celebrate with your team',
        statDeltas: { ambition: 5, chaos: 5, relations: 10 },
      },
    ],
    photoUnlock: 'sports-victory',
  },

  // SPECIAL BRANCHING EVENTS
  {
    id: 'airport-australia',
    title: 'The Australia Question',
    description: 'An exchange program to Australia opens up',
    flavor:
      'A poster on the wall. Australia. One way ticket. Everything changes if you say yes.',
    minAge: 17,
    maxAge: 18,
    probability: 0.15,
    choices: [
      {
        id: 'airport-go',
        text: 'You book the flight',
        statDeltas: { ambition: 20, chaos: 20, relations: -20 },
      },
      {
        id: 'airport-stay',
        text: 'You stay home',
        statDeltas: { ambition: 0, chaos: -5, relations: 5 },
      },
    ],
    photoUnlock: undefined,
  },
  {
    id: 'stock-market-success',
    title: 'Market Boom',
    description: 'Your investments pay off',
    flavor:
      'You check your portfolio. The numbers are good. Too good. You either made money or lost education funds. Time will tell.',
    minAge: 16,
    maxAge: 18,
    probability: 0.2,
    requiresInvestmentUnlocked: true,
    choices: [
      {
        id: 'market-cash-out',
        text: 'You cash out early',
        statDeltas: { ambition: 10, chaos: 5, relations: 0 },
      },
      {
        id: 'market-hold',
        text: 'You hold for the long game',
        statDeltas: { ambition: 15, chaos: 0, relations: -5 },
      },
    ],
  },
];

export function getEventById(id: string): GameEvent | undefined {
  return EVENTS.find((e) => e.id === id);
}

export function getRandomEvent(
  age: number,
  investmentUnlocked: boolean = false
): GameEvent | undefined {
  const candidates = EVENTS.filter((event) => {
    const ageMatch =
      event.age === age ||
      (event.minAge !== undefined &&
        event.maxAge !== undefined &&
        age >= event.minAge &&
        age <= event.maxAge);

    const unlockMatch = !event.requiresInvestmentUnlocked || investmentUnlocked;

    return ageMatch && unlockMatch && event.probability;
  });

  if (candidates.length === 0) return undefined;

  // Weighted random selection
  let rand = Math.random();
  for (const event of candidates) {
    rand -= (event.probability || 0);
    if (rand <= 0) return event;
  }

  return candidates[candidates.length - 1];
}
