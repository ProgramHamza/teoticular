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
  // ── HOME EVENTS ──
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
    id: 'stock_simulator',
    location: 'office',
    ageRange: [14, 18],
    requiredFlags: ['open_investment_account'],
    title: 'Stock Exchange',
    description: "Your investment account is open. Time to play the market. Try not to lose your lunch money.",
    choices: [],
    minigameRef: 'stock_simulator',
  },
  {
    id: 'flappy_teo_school',
    location: 'school',
    ageRange: [8, 14],
    title: 'Recess Dash',
    description: "The bell rang! Navigate the hallway obstacle course to get the best spot at the playground.",
    choices: [],
    minigameRef: 'flappy_teo',
  },
  {
    id: 'cleanup_party',
    location: 'bar',
    ageRange: [15, 18],
    title: 'Morning After',
    description: "Last night was legendary. This morning? Your house looks like a warzone. Parents ETA: 15 minutes.",
    choices: [],
    minigameRef: 'cleanup_party',
  },
  {
    id: 'learn_to_speak',
    location: 'home',
    ageRange: [0, 6],
    title: 'Baby Talk',
    description: "Time to form your first words! Match the rhythm to speak.",
    choices: [],
    minigameRef: 'rhythm_speak',
  },
  {
    id: 'learn_to_walk',
    location: 'home',
    ageRange: [0, 6],
    title: 'First Steps',
    description: "The world is big. Your legs are small. Keep your balance!",
    choices: [],
    minigameRef: 'balance_walk',
    photoUnlocks: ['first_steps'],
  },
  {
    id: 'flappy_teo_mountains',
    location: 'sports',
    ageRange: [12, 18],
    title: 'Mountain Runner',
    description: "Race down the mountain trail! Dodge boulders and trees in this high-speed downhill dash.",
    choices: [],
    minigameRef: 'flappy_teo',
  },
  {
    id: 'home_chores_7',
    location: 'home',
    ageRange: [7, 9],
    title: 'The Great Chore Negotiation',
    description: "Mom says no video games until your room is clean. The floor is literally not visible.",
    choices: [
      { id: 'clean_fast', text: 'Speed-clean everything (shove it under the bed)', deltas: { chaosDelta: 2 } },
      { id: 'clean_proper', text: 'Actually organize everything', deltas: { ambitionDelta: 2 } },
      { id: 'negotiate', text: '"What if I do dishes instead?"', deltas: { relationsDelta: 1, ambitionDelta: 1 } },
    ],
  },
  {
    id: 'home_pet_debate',
    location: 'home',
    ageRange: [8, 12],
    title: 'The Pet Petition',
    description: "You've prepared a 12-slide PowerPoint presentation on why the family needs a dog. Dad seems impressed. Mom... less so.",
    choices: [
      { id: 'logical_pitch', text: 'Present the data: dogs reduce stress by 40%', deltas: { ambitionDelta: 2 }, flagsToSet: ['wants_dog'] },
      { id: 'emotional_plea', text: 'Cry strategically', deltas: { relationsDelta: 1, chaosDelta: 1 } },
      { id: 'compromise', text: '"How about a goldfish first?"', deltas: { relationsDelta: 2 }, flagsToSet: ['got_goldfish'] },
    ],
  },
  {
    id: 'home_cooking_disaster',
    location: 'home',
    ageRange: [13, 17],
    title: 'Chef Teo',
    description: "You tried to make pasta. The smoke alarm is now your sous chef. There's sauce on the ceiling.",
    choices: [
      { id: 'own_it', text: 'Serve it proudly: "It\'s deconstructed"', deltas: { chaosDelta: 2 } },
      { id: 'order_pizza', text: 'Quietly order pizza and pretend nothing happened', deltas: { ambitionDelta: -1, chaosDelta: 1 } },
      { id: 'call_grandma', text: 'Call grandma for emergency instructions', deltas: { relationsDelta: 2 }, flagsToSet: ['learned_cooking'] },
    ],
  },
  {
    id: 'home_first_phone',
    location: 'home',
    ageRange: [10, 12],
    title: 'First Phone!',
    description: "Parents finally agreed to get you a phone. It's not the latest model, but it GLOWS and it's YOURS.",
    choices: [
      { id: 'download_games', text: 'Immediately download 47 games', deltas: { chaosDelta: 2 }, flagsToSet: ['has_phone'] },
      { id: 'call_friends', text: 'Call every friend to share the news', deltas: { relationsDelta: 2 }, flagsToSet: ['has_phone'] },
      { id: 'research', text: 'Set up a productivity system', deltas: { ambitionDelta: 2 }, flagsToSet: ['has_phone'] },
    ],
    photoUnlocks: ['first_phone'],
  },

  // ── SCHOOL EVENTS ──
  {
    id: 'first_day_school',
    location: 'school',
    ageRange: [7, 7],
    title: 'First Day of School',
    description: "The hallway smells like floor wax and anxiety. A kid with a Pokémon backpack waves at you.",
    choices: [
      { id: 'wave_back', text: 'Wave back enthusiastically', deltas: { relationsDelta: 2 }, flagsToSet: ['met_pokemon_kid'] },
      { id: 'play_cool', text: 'Play it cool, nod once', deltas: { ambitionDelta: 1 } },
      { id: 'hide', text: 'Hide behind your backpack', deltas: { chaosDelta: 1 } },
    ],
  },
  {
    id: 'school_test',
    location: 'school',
    ageRange: [8, 10],
    title: 'The Big Test',
    description: "Math test tomorrow. You haven't studied. The textbook is still in its original packaging.",
    choices: [
      { id: 'cram', text: 'All-night cram session', deltas: { ambitionDelta: 2 } },
      { id: 'copy', text: 'Sit next to the smart kid tomorrow', deltas: { chaosDelta: 2 } },
      { id: 'study_group', text: 'Form a study group', deltas: { relationsDelta: 2 }, flagsToSet: ['has_study_group'] },
    ],
  },
  {
    id: 'school_talent_show',
    location: 'school',
    ageRange: [9, 12],
    title: 'Talent Show Signup',
    description: "The school talent show is next week. Everyone is signing up. You can feel the peer pressure like humidity.",
    choices: [
      { id: 'sing', text: 'Sign up for singing (you cannot sing)', deltas: { chaosDelta: 2, relationsDelta: 1 } },
      { id: 'magic', text: 'Do a magic trick with actual preparation', deltas: { ambitionDelta: 2 }, photoUnlock: 'talent_show' },
      { id: 'backstage', text: 'Volunteer for backstage crew', deltas: { relationsDelta: 2 } },
    ],
  },
  {
    id: 'school_bully',
    location: 'school',
    ageRange: [8, 11],
    title: 'Playground Politics',
    description: "A bigger kid is picking on your friend at recess. The teacher is conveniently looking the other way.",
    choices: [
      { id: 'stand_up', text: 'Stand up to the bully', deltas: { ambitionDelta: 2, chaosDelta: 1 }, flagsToSet: ['stood_up_to_bully'] },
      { id: 'get_teacher', text: 'Get the teacher involved', deltas: { relationsDelta: 1 } },
      { id: 'distract', text: 'Create a diversion (fake a fall)', deltas: { chaosDelta: 2, relationsDelta: 1 } },
    ],
  },
  {
    id: 'school_project',
    location: 'school',
    ageRange: [10, 13],
    title: 'Group Project Chaos',
    description: "You're assigned a group project. One kid is asleep, one is drawing, and one keeps saying 'I'll do it later.'",
    choices: [
      { id: 'do_alone', text: 'Do the whole thing yourself', deltas: { ambitionDelta: 2 } },
      { id: 'delegate', text: 'Become the project manager', deltas: { ambitionDelta: 1, relationsDelta: 1 } },
      { id: 'goof_off', text: 'Join the drawing kid, this project is doomed', deltas: { chaosDelta: 2 } },
    ],
  },
  {
    id: 'school_crush',
    location: 'school',
    ageRange: [12, 14],
    title: 'Note Passing',
    description: "Someone passed you a note in class. It has a drawing of a heart and says 'Do you like me? Yes / No / Maybe'",
    choices: [
      { id: 'circle_yes', text: 'Circle YES (your hand is shaking)', deltas: { relationsDelta: 2, chaosDelta: 1 } },
      { id: 'circle_maybe', text: 'Circle MAYBE (play it cool)', deltas: { ambitionDelta: 1 } },
      { id: 'draw_meme', text: 'Draw a meme on the back and pass it forward', deltas: { chaosDelta: 2 } },
    ],
  },
  {
    id: 'school_graduation',
    location: 'school',
    ageRange: [13, 14],
    title: 'Middle School Graduation',
    description: "You made it. The ceremony is long, the speeches are boring, but your family is cheering the loudest.",
    choices: [
      { id: 'emotional', text: 'Hug your friends and cry a little', deltas: { relationsDelta: 3 }, photoUnlock: 'graduation' },
      { id: 'speech', text: 'Somehow end up giving an impromptu speech', deltas: { ambitionDelta: 2, chaosDelta: 1 } },
      { id: 'prank', text: 'Sneak a whoopee cushion onto the principal\'s chair', deltas: { chaosDelta: 3 } },
    ],
  },

  // ── GRANDMA EVENTS ──
  {
    id: 'grandma_cookies',
    location: 'grandma',
    ageRange: [0, 18],
    title: "Grandma's Special Cookies",
    description: "Grandma made her legendary cookies. The kitchen smells like heaven and nostalgia.",
    choices: [
      { id: 'eat_all', text: 'Eat ALL the cookies', deltas: { chaosDelta: 1, relationsDelta: 1 } },
      { id: 'help_bake', text: 'Help her bake more', deltas: { relationsDelta: 2 }, photoUnlock: 'baking_with_grandma' },
      { id: 'learn_recipe', text: 'Write down the secret recipe', deltas: { ambitionDelta: 1 }, flagsToSet: ['knows_cookie_recipe'] },
    ],
  },
  {
    id: 'grandma_stories',
    location: 'grandma',
    ageRange: [7, 12],
    title: "Grandma's War Stories",
    description: "Grandma pulls out the old photo album. 'Let me tell you about the time I outsmarted a general...'",
    choices: [
      { id: 'listen', text: 'Listen intently to every detail', deltas: { relationsDelta: 2 }, photoUnlock: 'grandma_album' },
      { id: 'question', text: '"Did you really do that, Grandma?"', deltas: { ambitionDelta: 1, relationsDelta: 1 } },
      { id: 'bored', text: 'Sneak glances at your phone', deltas: { chaosDelta: 1 } },
    ],
  },
  {
    id: 'grandma_garden',
    location: 'grandma',
    ageRange: [8, 15],
    title: 'Garden Helpers',
    description: "Grandma's tomatoes are legendary. She asks you to help in the garden. The sun is warm. Life is simple.",
    choices: [
      { id: 'help_garden', text: 'Get your hands dirty planting', deltas: { relationsDelta: 2 } },
      { id: 'eat_tomatoes', text: 'Eat tomatoes straight off the vine', deltas: { chaosDelta: 1, relationsDelta: 1 } },
      { id: 'plan_sell', text: '"Grandma, we could sell these at a premium"', deltas: { ambitionDelta: 2 } },
    ],
  },

  // ── MOUNTAINS/SPORTS EVENTS ──
  {
    id: 'sports_first_hike',
    location: 'sports',
    ageRange: [10, 13],
    title: 'First Mountain Hike',
    description: "The trail is steep. Your legs hurt. But the view from up here... you can see the whole city.",
    choices: [
      { id: 'summit', text: 'Push to the summit no matter what', deltas: { ambitionDelta: 2 }, photoUnlock: 'mountain_summit' },
      { id: 'enjoy_view', text: 'Stop and just enjoy the view here', deltas: { relationsDelta: 1 } },
      { id: 'race', text: 'Challenge your friend to a race up', deltas: { chaosDelta: 2 } },
    ],
  },
  {
    id: 'sports_camping',
    location: 'sports',
    ageRange: [12, 16],
    title: 'Camping Trip',
    description: "Your first night camping. The stars are incredible but something is rustling in the bushes...",
    choices: [
      { id: 'investigate', text: 'Investigate the sound bravely', deltas: { ambitionDelta: 1, chaosDelta: 1 } },
      { id: 'campfire_stories', text: 'Tell ghost stories around the fire', deltas: { relationsDelta: 2 }, photoUnlock: 'campfire' },
      { id: 'stargaze', text: 'Ignore it and stargaze all night', deltas: { ambitionDelta: 1, relationsDelta: 1 } },
    ],
  },
  {
    id: 'sports_skiing',
    location: 'sports',
    ageRange: [11, 17],
    title: 'Ski Day',
    description: "First time on skis. The instructor says 'pizza' and 'french fries' a lot. You understand nothing.",
    choices: [
      { id: 'black_diamond', text: 'Ignore the bunny slope, go for black diamond', deltas: { chaosDelta: 3 } },
      { id: 'learn_proper', text: 'Follow the instructor carefully', deltas: { ambitionDelta: 2 } },
      { id: 'snowball_fight', text: 'Abandon skiing, start a snowball fight', deltas: { relationsDelta: 2, chaosDelta: 1 } },
    ],
  },

  // ── OFFICE EVENTS ──
  {
    id: 'office_internship',
    location: 'office',
    ageRange: [14, 16],
    title: 'Summer Internship',
    description: "Your first day at a 'real job.' They gave you a desk. It's in a closet. But it's YOUR closet.",
    choices: [
      { id: 'impress', text: 'Stay late, finish everything perfectly', deltas: { ambitionDelta: 3 } },
      { id: 'socialize', text: 'Befriend the senior team over coffee', deltas: { relationsDelta: 2 } },
      { id: 'prank_copier', text: 'Photocopy your face (classic)', deltas: { chaosDelta: 2 }, photoUnlock: 'copier_face' },
    ],
  },
  {
    id: 'office_startup_idea',
    location: 'office',
    ageRange: [15, 18],
    title: 'The Big Idea',
    description: "You had a startup idea in the shower. It's either genius or insane. You need to tell someone.",
    choices: [
      { id: 'pitch_boss', text: 'Pitch it to your boss immediately', deltas: { ambitionDelta: 2, chaosDelta: 1 } },
      { id: 'build_prototype', text: 'Build a prototype in secret', deltas: { ambitionDelta: 3 }, flagsToSet: ['has_prototype'] },
      { id: 'tell_friends', text: 'Tell your friends first', deltas: { relationsDelta: 2 } },
    ],
  },
  {
    id: 'office_stock_tip',
    location: 'office',
    ageRange: [15, 18],
    title: 'Hot Stock Tip',
    description: "A coworker whispers about a stock that's 'definitely going to moon.' They've been wrong before...",
    choices: [
      { id: 'invest_all', text: 'YOLO everything into it', deltas: { chaosDelta: 3, ambitionDelta: 1 } },
      { id: 'research', text: 'Do your own research first', deltas: { ambitionDelta: 2 } },
      { id: 'ignore', text: '"Thanks but I\'ll stick to index funds"', deltas: { ambitionDelta: 1 } },
    ],
  },

  // ── BAR EVENTS ──
  {
    id: 'bar_first_party',
    location: 'bar',
    ageRange: [15, 17],
    title: 'First House Party',
    description: "Someone's parents are out of town. The bass is shaking the windows. You've never been to a party before.",
    choices: [
      { id: 'dance_floor', text: 'Own the dance floor', deltas: { chaosDelta: 2, relationsDelta: 1 }, photoUnlock: 'first_party' },
      { id: 'dj', text: 'Take over the playlist', deltas: { ambitionDelta: 1, chaosDelta: 1 } },
      { id: 'chill_corner', text: 'Find the quiet corner and have deep conversations', deltas: { relationsDelta: 3 } },
    ],
  },
  {
    id: 'bar_karaoke',
    location: 'bar',
    ageRange: [16, 18],
    title: 'Karaoke Night',
    description: "Your friends signed you up for karaoke without telling you. The mic is in your hand. The crowd waits.",
    choices: [
      { id: 'belt_it', text: 'Belt out Bohemian Rhapsody', deltas: { chaosDelta: 2, relationsDelta: 2 }, photoUnlock: 'karaoke_legend' },
      { id: 'duet', text: 'Drag a friend up for a duet', deltas: { relationsDelta: 2 } },
      { id: 'flee', text: 'Drop the mic and run', deltas: { chaosDelta: 1 } },
    ],
  },
  {
    id: 'bar_dare',
    location: 'bar',
    ageRange: [16, 18],
    title: 'Truth or Dare',
    description: "The circle has formed. Someone spins the bottle. It points at you. 'Truth or dare?'",
    choices: [
      { id: 'truth', text: 'Truth (risky in its own way)', deltas: { relationsDelta: 2 } },
      { id: 'dare', text: 'Dare (you live once)', deltas: { chaosDelta: 3 } },
      { id: 'spin_again', text: '"That spin doesn\'t count" (spin again)', deltas: { chaosDelta: 1, ambitionDelta: 1 } },
    ],
  },

  // ── AIRPORT EVENTS ──
  {
    id: 'airport_first_flight',
    location: 'airport',
    ageRange: [16, 18],
    title: 'First Solo Flight',
    description: "Gate B12. Your backpack weighs more than you. This is it — your first time flying alone.",
    choices: [
      { id: 'excited', text: 'Take window seat selfies', deltas: { chaosDelta: 1, relationsDelta: 1 }, photoUnlock: 'first_flight' },
      { id: 'plan', text: 'Review your travel itinerary for the 9th time', deltas: { ambitionDelta: 2 } },
      { id: 'chat', text: 'Befriend the person next to you', deltas: { relationsDelta: 2 } },
    ],
  },
  {
    id: 'airport_lost_luggage',
    location: 'airport',
    ageRange: [16, 18],
    title: 'Lost Luggage',
    description: "The carousel stopped. Everyone left. Your bag is... somewhere that isn't here.",
    choices: [
      { id: 'complain', text: 'March to the complaints desk with fury', deltas: { ambitionDelta: 1, chaosDelta: 1 } },
      { id: 'adventure', text: '"Guess I\'m buying new clothes!"', deltas: { chaosDelta: 2 } },
      { id: 'calm', text: 'File a calm report and explore the city', deltas: { ambitionDelta: 1, relationsDelta: 1 } },
    ],
  },
];

// ─── COVID Special Event ───

export const covidEvent: SpecialEventMap = {
  id: 'covid_quarantine',
  name: 'COVID-19 Quarantine',
  background: '/photos/covid_bg.jpg',
  nodes: [
    { id: 'covid_bedroom', label: 'Your Room', x: 30, y: 40, eventId: 'covid_isolation', icon: '🛏️' },
    { id: 'covid_kitchen', label: 'Kitchen', x: 60, y: 50, eventId: 'covid_cooking', icon: '🍳' },
    { id: 'covid_balcony', label: 'Balcony', x: 45, y: 25, eventId: 'covid_balcony_concert', icon: '🎵' },
    { id: 'covid_computer', label: 'Computer', x: 70, y: 35, eventId: 'covid_zoom', icon: '💻' },
  ],
  photos: [
    { id: 'covid_mask', src: '/photos/covid_mask.jpg', caption: 'The new fashion statement', ageTag: 11 },
    { id: 'covid_banana_bread', src: '/photos/banana_bread.jpg', caption: 'Everyone became a baker', ageTag: 11 },
    { id: 'covid_balcony_sing', src: '/photos/balcony.jpg', caption: 'We sang to the sky', ageTag: 11 },
    { id: 'covid_zoom_class', src: '/photos/zoom.jpg', caption: 'Pajamas below, shirt above', ageTag: 11 },
  ],
};

// ─── COVID Events (referenced by nodes) ───

export const specialEvents: GameEvent[] = [
  {
    id: 'covid_isolation',
    location: '__covid',
    ageRange: [11, 11],
    title: 'Stuck in Your Room',
    description: "Day 47 of quarantine. You've rearranged your room 3 times. The walls are closing in... or are they?",
    choices: [
      { id: 'tiktok', text: 'Learn a TikTok dance', deltas: { chaosDelta: 2 }, photoUnlock: 'covid_mask' },
      { id: 'journal', text: 'Start a quarantine journal', deltas: { ambitionDelta: 2 } },
      { id: 'call_friends', text: 'Video call your friends all day', deltas: { relationsDelta: 2 } },
    ],
  },
  {
    id: 'covid_cooking',
    location: '__covid',
    ageRange: [11, 11],
    title: 'Quarantine Chef',
    description: "Everyone is baking banana bread. EVERYONE. The flour aisle is empty. You must improvise.",
    choices: [
      { id: 'banana_bread', text: 'Join the banana bread cult', deltas: { relationsDelta: 1 }, photoUnlock: 'covid_banana_bread' },
      { id: 'experiment', text: 'Invent a new recipe', deltas: { ambitionDelta: 2, chaosDelta: 1 } },
      { id: 'cereal', text: 'Give up. Eat cereal.', deltas: { chaosDelta: 1 } },
    ],
  },
  {
    id: 'covid_balcony_concert',
    location: '__covid',
    ageRange: [11, 11],
    title: 'Balcony Concert',
    description: "The neighbors are singing from their balconies. It's 8 PM. The applause for healthcare workers echoes through the street.",
    choices: [
      { id: 'sing_along', text: 'Sing along at full volume', deltas: { relationsDelta: 2, chaosDelta: 1 }, photoUnlock: 'covid_balcony_sing' },
      { id: 'play_instrument', text: 'Play an instrument (badly)', deltas: { ambitionDelta: 1, chaosDelta: 1 } },
      { id: 'just_clap', text: 'Clap and wave at the neighbors', deltas: { relationsDelta: 2 } },
    ],
  },
  {
    id: 'covid_zoom',
    location: '__covid',
    ageRange: [11, 11],
    title: 'Zoom School',
    description: "Camera on or camera off? Your pajama pants say off. Your teacher says on. Your cat is walking across the keyboard.",
    choices: [
      { id: 'camera_on', text: 'Camera on, fully dressed from waist up', deltas: { ambitionDelta: 2 }, photoUnlock: 'covid_zoom_class' },
      { id: 'camera_off', text: 'Camera off, play games on the side', deltas: { chaosDelta: 2 } },
      { id: 'unmuted', text: 'Accidentally unmute and expose your music', deltas: { chaosDelta: 2, relationsDelta: 1 } },
    ],
  },
  // ── AUSTRALIA EVENTS ──
  {
    id: 'australia_beach',
    location: '__australia',
    ageRange: [16, 16],
    title: 'Bondi Beach',
    description: "Golden sand, turquoise waves, surfers everywhere. A cockatoo steals your sandwich. Welcome to Australia.",
    choices: [
      { id: 'surf', text: 'Try to surf (eat sand)', deltas: { chaosDelta: 2, ambitionDelta: 1 }, photoUnlock: 'australia_surf' },
      { id: 'chill', text: 'Lay on the beach all day', deltas: { relationsDelta: 1 } },
      { id: 'lifeguard', text: 'Chat with the lifeguards', deltas: { relationsDelta: 2 } },
    ],
  },
  {
    id: 'australia_hostel',
    location: '__australia',
    ageRange: [16, 16],
    title: 'Hostel Life',
    description: "12 people. One bathroom. Someone is snoring at 186 decibels. But the vibes? Immaculate.",
    choices: [
      { id: 'party', text: 'Join the rooftop party', deltas: { chaosDelta: 2, relationsDelta: 1 } },
      { id: 'befriend', text: 'Befriend travelers from 5 countries', deltas: { relationsDelta: 3 }, photoUnlock: 'australia_friends' },
      { id: 'plan_trip', text: 'Plan tomorrow\'s road trip meticulously', deltas: { ambitionDelta: 2 } },
    ],
  },
  {
    id: 'australia_outback',
    location: '__australia',
    ageRange: [16, 16],
    title: 'Outback Adventure',
    description: "Red earth stretches forever. A kangaroo stares at you. You stare back. It's a standoff.",
    choices: [
      { id: 'road_trip', text: 'Drive deeper into the outback', deltas: { ambitionDelta: 2, chaosDelta: 1 }, photoUnlock: 'australia_outback' },
      { id: 'photo', text: 'Take a million photos of the sunset', deltas: { relationsDelta: 1 } },
      { id: 'camp', text: 'Camp under the stars', deltas: { relationsDelta: 2 }, flagsToSet: ['visited_australia'] },
    ],
  },
  {
    id: 'australia_surf_dawn',
    location: '__australia',
    ageRange: [16, 16],
    title: 'Dawn Patrol',
    description: "4:30 AM. The sun is just cracking the horizon. The ocean is glass. You've never felt more alive.",
    choices: [
      { id: 'surf_dawn', text: 'Paddle out into the dawn', deltas: { ambitionDelta: 1, chaosDelta: 1 }, flagsToSet: ['visited_australia'], photoUnlock: 'australia_dawn' },
      { id: 'meditate', text: 'Sit on the sand and just breathe', deltas: { relationsDelta: 2 }, flagsToSet: ['visited_australia'] },
      { id: 'never_leave', text: '"I\'m never going home"', deltas: { chaosDelta: 3 }, flagsToSet: ['visited_australia', 'wants_to_stay'] },
    ],
  },
];

// ─── Australia Special Event Map ───

export const australiaEvent: SpecialEventMap = {
  id: 'australia_trip',
  name: 'Australia Trip',
  background: '/photos/australia_bg.jpg',
  nodes: [
    { id: 'aus_beach', label: 'Bondi Beach', x: 70, y: 60, eventId: 'australia_beach', icon: '🏖️' },
    { id: 'aus_hostel', label: 'Hostel', x: 40, y: 45, eventId: 'australia_hostel', icon: '🛏️' },
    { id: 'aus_outback', label: 'Outback', x: 25, y: 30, eventId: 'australia_outback', icon: '🦘' },
    { id: 'aus_dawn', label: 'Dawn Surf', x: 60, y: 25, eventId: 'australia_surf_dawn', icon: '🌅' },
  ],
  photos: [
    { id: 'australia_surf', src: '/photos/australia_surf.jpg', caption: 'Ate sand but felt alive', ageTag: 16 },
    { id: 'australia_friends', src: '/photos/australia_friends.jpg', caption: 'Friends from everywhere', ageTag: 16 },
    { id: 'australia_outback', src: '/photos/australia_outback.jpg', caption: 'Red earth, forever sky', ageTag: 16 },
    { id: 'australia_dawn', src: '/photos/australia_dawn.jpg', caption: 'Dawn patrol — best day ever', ageTag: 16 },
  ],
};

// ─── Photos ───

export const photos: PhotoMeta[] = [
  { id: 'first_steps', src: '/photos/first_steps.jpg', caption: 'First wobbly steps!', ageTag: 1 },
  { id: 'first_word', src: '/photos/first_word.jpg', caption: 'First word: "MORE"', ageTag: 2 },
  { id: 'first_day_school', src: '/photos/school.jpg', caption: 'Tiny backpack, big dreams', ageTag: 7 },
  { id: 'baking_with_grandma', src: '/photos/grandma_cookies.jpg', caption: "Grandma's secret recipe", ageTag: 8 },
  { id: 'first_phone', src: '/photos/first_phone.jpg', caption: 'The world in my pocket', ageTag: 11 },
  { id: 'talent_show', src: '/photos/talent_show.jpg', caption: 'The magic actually worked!', ageTag: 10 },
  { id: 'grandma_album', src: '/photos/grandma_album.jpg', caption: 'Stories from another era', ageTag: 9 },
  { id: 'mountain_summit', src: '/photos/summit.jpg', caption: 'Top of the world', ageTag: 11 },
  { id: 'campfire', src: '/photos/campfire.jpg', caption: 'Ghost stories and s\'mores', ageTag: 13 },
  { id: 'graduation', src: '/photos/graduation.jpg', caption: 'We actually made it', ageTag: 14 },
  { id: 'first_investment', src: '/photos/stocks.jpg', caption: 'Wall Street wolf cub', ageTag: 14 },
  { id: 'copier_face', src: '/photos/copier.jpg', caption: 'HR was not amused', ageTag: 15 },
  { id: 'first_party', src: '/photos/party.jpg', caption: 'The night we won\'t forget', ageTag: 15 },
  { id: 'karaoke_legend', src: '/photos/karaoke.jpg', caption: 'Bohemian Rhapsody, full send', ageTag: 16 },
  { id: 'first_flight', src: '/photos/first_flight.jpg', caption: 'Above the clouds, alone', ageTag: 16 },
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
