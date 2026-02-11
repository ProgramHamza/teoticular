import { create } from 'zustand';

export enum GameAct {
  CHILDHOOD = 'childhood', // Ages 0-6
  SCHOOL = 'school', // Ages 7-12
  TEENAGE = 'teenage', // Ages 13-18
  ENDING = 'ending',
}

export interface GameState {
  // Core stats
  ambition: number;
  chaos: number;
  relations: number;

  // Game progress
  age: number;
  act: GameAct;
  day: number; // Days within the current act/age

  // Locations visited (for Act III)
  currentLocation?: string;

  // Map state
  mapPositionX: number; // Player position on map
  mapPositionY: number;
  
  // Auto-progression
  autoAdvanceEnabled: boolean;
  daysPerLocation: number; // How many days per location visit

  // Mini-game state
  investmentUnlocked: boolean; // Whether stock market is accessible
  parentalSuspicion: number; // Hidden stat for bar/party consequences

  // Unlocked content
  unlockedPhotos: string[]; // Array of photo keys
  unlockedEndings: string[]; // Array of ending keys viewed

  // Life events
  activeEventId?: string; // Current event, if any
  eventHistory: string[]; // List of completed event IDs

  // Actions
  updateStats: (
    ambitionDelta: number,
    chaosDelta: number,
    relationsDelta: number
  ) => void;
  setAge: (age: number) => void;
  setAct: (act: GameAct) => void;
  advanceDay: () => void;
  advanceDays: (count: number) => void; // Advance multiple days at once
  setCurrentLocation: (location: string) => void;
  setMapPosition: (x: number, y: number) => void;
  setAutoAdvance: (enabled: boolean) => void;
  setDaysPerLocation: (days: number) => void;
  unlockPhoto: (photoId: string) => void;
  unlockEnding: (endingId: string) => void;
  setInvestmentUnlocked: (unlocked: boolean) => void;
  addParentalSuspicion: (amount: number) => void;
  startEvent: (eventId: string) => void;
  completeEvent: (eventId: string) => void;
  resetGame: () => void;
}

const INITIAL_STATE = {
  ambition: 0,
  chaos: 0,
  relations: 0,
  age: 0,
  act: GameAct.CHILDHOOD,
  day: 0,
  mapPositionX: 2,
  mapPositionY: 2,
  autoAdvanceEnabled: true,
  daysPerLocation: 5, // Automatically advance 5 days per location
  investmentUnlocked: false,
  parentalSuspicion: 0,
  unlockedPhotos: [],
  unlockedEndings: [],
  eventHistory: [],
};

export const useGameStore = create<GameState>((set) => ({
  ...INITIAL_STATE,

  updateStats: (ambitionDelta, chaosDelta, relationsDelta) =>
    set((state) => ({
      ambition: Math.max(0, Math.min(100, state.ambition + ambitionDelta)),
      chaos: Math.max(0, Math.min(100, state.chaos + chaosDelta)),
      relations: Math.max(0, Math.min(100, state.relations + relationsDelta)),
    })),

  setAge: (age) =>
    set({
      age,
      // Automatically set act based on age
      act:
        age <= 6
          ? GameAct.CHILDHOOD
          : age <= 12
            ? GameAct.SCHOOL
            : age < 18
              ? GameAct.TEENAGE
              : GameAct.ENDING,
    }),

  setAct: (act) => set({ act }),

  advanceDay: () =>
    set((state) => ({
      day: state.day + 1,
    })),

  advanceDays: (count) =>
    set((state) => ({
      day: state.day + count,
    })),

  setCurrentLocation: (location) => set({ currentLocation: location }),

  setMapPosition: (x, y) => set({ mapPositionX: x, mapPositionY: y }),

  setAutoAdvance: (enabled) => set({ autoAdvanceEnabled: enabled }),

  setDaysPerLocation: (days) => set({ daysPerLocation: days }),

  unlockPhoto: (photoId) =>
    set((state) => {
      if (!state.unlockedPhotos.includes(photoId)) {
        return { unlockedPhotos: [...state.unlockedPhotos, photoId] };
      }
      return {};
    }),

  unlockEnding: (endingId) =>
    set((state) => {
      if (!state.unlockedEndings.includes(endingId)) {
        return { unlockedEndings: [...state.unlockedEndings, endingId] };
      }
      return {};
    }),

  setInvestmentUnlocked: (unlocked) =>
    set({ investmentUnlocked: unlocked }),

  addParentalSuspicion: (amount) =>
    set((state) => ({
      parentalSuspicion: Math.max(
        0,
        Math.min(100, state.parentalSuspicion + amount)
      ),
    })),

  startEvent: (eventId) =>
    set({ activeEventId: eventId }),

  completeEvent: (eventId) =>
    set((state) => ({
      activeEventId: undefined,
      eventHistory: [...state.eventHistory, eventId],
    })),

  resetGame: () => set(INITIAL_STATE),
}));
