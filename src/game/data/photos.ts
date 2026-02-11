/**
 * Photo definitions for game progression
 * Photos unlock at key moments and are shown at the ending
 */

export interface Photo {
  id: string;
  title: string;
  description: string;
  age: number; // Age when photo is from
  triggerEvent?: string; // Event ID that unlocks this photo
  imageUrl?: string; // Placeholder for actual image
}

export const PHOTOS: Photo[] = [
  // Childhood photos (ages 0-6)
  {
    id: 'baby-first-smile',
    title: 'First Smile',
    description: 'You smiled for the first time. Everyone cried.',
    age: 0,
    triggerEvent: 'childhood-smile',
  },
  {
    id: 'baby-first-steps',
    title: 'First Steps',
    description: 'You walked. Your parents never let you forget.',
    age: 1,
    triggerEvent: 'childhood-walk',
  },
  {
    id: 'kindergarten-start',
    title: 'Kindergarten',
    description: 'School uniform, big backpack, pure anxiety.',
    age: 6,
    triggerEvent: 'act1-complete',
  },

  // School years photos (ages 7-12)
  {
    id: 'school-friend',
    title: 'Best Friend',
    description: 'You made a friend. This moment seemed important.',
    age: 7,
    triggerEvent: 'school-friend',
  },
  {
    id: 'school-carnival',
    title: 'School Carnival',
    description: 'You won a prize at the carnival. Or lost spectacularly.',
    age: 8,
    triggerEvent: 'school-carnival',
  },
  {
    id: 'school-graduation',
    title: 'Middle School Graduation',
    description: 'You survived middle school. Nobody actually grows up here.',
    age: 12,
    triggerEvent: 'act2-complete',
  },

  // Teenage years photos (ages 13-18)
  {
    id: 'high-school-first-day',
    title: 'High School First Day',
    description: 'Everything changed. Or nothing did. Hard to tell.',
    age: 13,
    triggerEvent: 'teenage-start',
  },
  {
    id: 'bar-party',
    title: 'Party Night',
    description: 'That night at the bar. You don\'t remember most of it.',
    age: 15,
    triggerEvent: 'bar-party-night',
  },
  {
    id: 'office-intern',
    title: 'Office First Day',
    description: 'You got an internship. You wore a blazer unironically.',
    age: 16,
    triggerEvent: 'office-intern',
  },
  {
    id: 'grandma-visit',
    title: 'Grandma\'s House',
    description: 'Grandma made your favorite food. You felt at home.',
    age: 16,
    triggerEvent: 'grandma-visit',
  },
  {
    id: 'sports-victory',
    title: 'Victory',
    description: 'You won something. Physical activity was involved.',
    age: 17,
    triggerEvent: 'sports-win',
  },
  {
    id: 'last-day-school',
    title: 'Last Day of School',
    description: 'Time to grow up. Or pretend to.',
    age: 18,
    triggerEvent: 'act3-complete',
  },
];

export function getPhotoById(id: string): Photo | undefined {
  return PHOTOS.find((p) => p.id === id);
}

export function getPhotosByAge(age: number): Photo[] {
  return PHOTOS.filter((p) => p.age === age);
}
