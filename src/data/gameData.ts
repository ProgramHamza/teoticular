import type { GameEvent, SpecialEventMap, LocationData, Ending, PhotoMeta } from '@/types/game';

// ─── Locations ───

export const locations: LocationData[] = [
  { id: 'home', name: 'Home', icon: '🏠', unlockAge: 0, x: 50, y: 65, color: 'pastel-pink' },
  { id: 'school', name: 'School', icon: '🏫', unlockAge: 7, x: 25, y: 35, color: 'pastel-mint' },
  { id: 'bar', name: 'Bar', icon: '🍺', unlockAge: 15, x: 75, y: 30, color: 'pastel-lavender' },
  { id: 'office', name: 'Office', icon: '💼', unlockAge: 14, x: 80, y: 65, color: 'pastel-peach' },
  { id: 'airport', name: 'Airport', icon: '✈️', unlockAge: 16, x: 15, y: 70, color: 'neon-cyan' },
  { id: 'grandma', name: "Grandma's", icon: '👵', unlockAge: 0, x: 35, y: 80, color: 'pastel-pink' },
  { id: 'sports', name: 'Mountains', icon: '⛰️', unlockAge: 10, x: 60, y: 20, color: 'pastel-mint' },
];

// ─── Events ───

export const events: GameEvent[] = [
  {
    id: 'convince_parents_invest',
    location: 'home',
    ageRange: [12, 18],
    title: 'Time to Talk Business',
    description: "You want to open an investment account. But first... you need to convince your parents this isn't just a phase.",
    choices: [],
    minigameRef: 'convince_parents',
    photoUnlocks: ['first_investment'],
  },
  {
    id: 'first_day_school',
    location: 'school',
    ageRange: [7, 7],
    title: 'First Day of School',
    description: "The hallway smells like floor wax and anxiety. A kid with a Pokémon backpack waves at you.",
    choices: [
      {
        id: 'wave_back',
        text: 'Wave back enthusiastically',
        deltas: { relationsDelta: 2 },
        flagsToSet: ['met_pokemon_kid'],
      },
      {
        id: 'play_cool',
        text: 'Play it cool, nod once',
        deltas: { ambitionDelta: 1 },
      },
      {
        id: 'hide',
        text: 'Hide behind your backpack',
        deltas: { chaosDelta: 1 },
      },
    ],
  },
  {
    id: 'grandma_cookies',
    location: 'grandma',
    ageRange: [0, 18],
    title: "Grandma's Special Cookies",
    description: "Grandma made her legendary cookies. The kitchen smells like heaven and nostalgia.",
    choices: [
      {
        id: 'eat_all',
        text: 'Eat ALL the cookies',
        deltas: { chaosDelta: 1, relationsDelta: 1 },
      },
      {
        id: 'help_bake',
        text: 'Help her bake more',
        deltas: { relationsDelta: 2 },
        photoUnlock: 'baking_with_grandma',
      },
      {
        id: 'learn_recipe',
        text: 'Write down the secret recipe',
        deltas: { ambitionDelta: 1 },
        flagsToSet: ['knows_cookie_recipe'],
      },
    ],
  },
];

// ─── COVID Special Event ───

export const covidEvent: SpecialEventMap = {
  id: 'covid_quarantine',
  name: 'COVID-19 Quarantine',
  background: '/photos/covid_bg.jpg',
  nodes: [
    {
      id: 'covid_bedroom',
      label: 'Your Room',
      x: 30,
      y: 40,
      eventId: 'covid_isolation',
      icon: '🛏️',
    },
    {
      id: 'covid_kitchen',
      label: 'Kitchen',
      x: 60,
      y: 50,
      eventId: 'covid_cooking',
      icon: '🍳',
    },
    {
      id: 'covid_balcony',
      label: 'Balcony',
      x: 45,
      y: 25,
      eventId: 'covid_balcony_concert',
      icon: '🎵',
    },
    {
      id: 'covid_computer',
      label: 'Computer',
      x: 70,
      y: 35,
      eventId: 'covid_zoom',
      icon: '💻',
    },
  ],
  photos: [
    { id: 'covid_mask', src: '/photos/covid_mask.jpg', caption: 'The new fashion statement', ageTag: 15 },
    { id: 'covid_banana_bread', src: '/photos/banana_bread.jpg', caption: 'Everyone became a baker', ageTag: 15 },
    { id: 'covid_balcony_sing', src: '/photos/balcony.jpg', caption: 'We sang to the sky', ageTag: 15 },
    { id: 'covid_zoom_class', src: '/photos/zoom.jpg', caption: 'Pajamas below, shirt above', ageTag: 15 },
  ],
};

// ─── Photos ───

export const photos: PhotoMeta[] = [
  { id: 'first_steps', src: '/photos/first_steps.jpg', caption: 'First wobbly steps!', ageTag: 1 },
  { id: 'first_word', src: '/photos/first_word.jpg', caption: 'First word: "MORE"', ageTag: 2 },
  { id: 'first_day_school', src: '/photos/school.jpg', caption: 'Tiny backpack, big dreams', ageTag: 7 },
  { id: 'baking_with_grandma', src: '/photos/grandma_cookies.jpg', caption: "Grandma's secret recipe", ageTag: 8 },
  { id: 'first_investment', src: '/photos/stocks.jpg', caption: 'Wall Street wolf cub', ageTag: 14 },
];

// ─── Endings ───

export const endings: Ending[] = [
  {
    id: 'entrepreneur',
    title: 'The Young Entrepreneur',
    summary: 'Teo built an empire from a childhood cookie recipe. The cookies were good. The IPO was better.',
    imageRef: '/photos/ending_entrepreneur.jpg',
    condition: { ambitionMin: 60, chaosMax: 30 },
  },
  {
    id: 'party_legend',
    title: 'The Party Legend',
    summary: 'Nobody knows what Teo does for work. Everyone knows Teo throws the best parties.',
    imageRef: '/photos/ending_party.jpg',
    condition: { chaosMin: 60, relationsMin: 40 },
  },
  {
    id: 'beloved_friend',
    title: 'The Beloved Friend',
    summary: "Teo's phone never stops ringing. Not for business — just because people genuinely like hanging out.",
    imageRef: '/photos/ending_friend.jpg',
    condition: { relationsMin: 60, chaosMax: 40 },
  },
  {
    id: 'buffalo_soldier',
    title: 'Buffalo Soldier Teo',
    summary: 'Teo never came back from Australia. Last seen surfing at dawn, smiling at the horizon.',
    imageRef: '/photos/ending_australia.jpg',
    condition: { chaosMin: 40, ambitionMax: 30, requiredFlags: ['visited_australia'] },
  },
  {
    id: 'balanced',
    title: 'The Renaissance Kid',
    summary: 'A little ambitious, a little chaotic, deeply loved. Teo figured out the secret: there is no secret.',
    imageRef: '/photos/ending_balanced.jpg',
    condition: {},
  },
];
