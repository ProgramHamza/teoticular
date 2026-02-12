import { create } from 'zustand';
import type { GameState, GameStats, StatDeltas, Act, MinigameResult } from '@/types/game';

// ─── Utility Helpers ───

export const clampStats = (stats: GameStats): GameStats => ({
  ambition: Math.max(0, Math.min(100, stats.ambition)),
  chaos: Math.max(0, Math.min(100, stats.chaos)),
  relations: Math.max(0, Math.min(100, stats.relations)),
});

export const applyStatDeltas = (stats: GameStats, deltas: Partial<StatDeltas>): GameStats =>
  clampStats({
    ambition: stats.ambition + (deltas.ambitionDelta ?? 0),
    chaos: stats.chaos + (deltas.chaosDelta ?? 0),
    relations: stats.relations + (deltas.relationsDelta ?? 0),
  });

export const getAct = (age: number): Act => {
  if (age <= 6) return 'childhood';
  if (age <= 12) return 'school';
  return 'teenage';
};

// ─── Seeded RNG ───

export const seededRng = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

// ─── Store ───

interface GameStore extends GameState {
  // Actions
  startGame: () => void;
  setLocation: (location: string | null) => void;
  advanceAge: () => void;
  applyDeltas: (deltas: Partial<StatDeltas>) => void;
  applyMinigameResult: (result: MinigameResult) => void;
  setFlag: (flag: string, value?: boolean) => void;
  recordEvent: (eventId: string) => void;
  unlockPhoto: (photoId: string) => void;
  setGamePhase: (phase: GameState['gamePhase']) => void;
  setActiveMinigame: (id: string | null) => void;
  pendingDeltas: Partial<StatDeltas> | null;
  clearPendingDeltas: () => void;
}

const initialState: GameState = {
  stats: { ambition: 10, chaos: 5, relations: 15 },
  age: 7,
  act: 'school',
  currentLocation: null,
  eventFlags: {},
  eventHistory: [],
  unlockedPhotos: [],
  activeMinigame: null,
  activeSpecialEvent: null,
  gamePhase: 'title',
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,
  pendingDeltas: null,

  startGame: () => set({ ...initialState, gamePhase: 'map' }),

  setLocation: (location) => set({ currentLocation: location }),

  advanceAge: () =>
    set((state) => {
      const newAge = state.age + 1;
      return {
        age: newAge,
        act: getAct(newAge),
        gamePhase: newAge >= 18 ? 'ending' : state.gamePhase,
      };
    }),

  applyDeltas: (deltas) =>
    set((state) => ({
      stats: applyStatDeltas(state.stats, deltas),
      pendingDeltas: deltas,
    })),

  applyMinigameResult: (result) =>
    set((state) => ({
      stats: applyStatDeltas(state.stats, result),
      pendingDeltas: result,
      activeMinigame: null,
      gamePhase: 'map',
    })),

  setFlag: (flag, value = true) =>
    set((state) => ({
      eventFlags: { ...state.eventFlags, [flag]: value },
    })),

  recordEvent: (eventId) =>
    set((state) => ({
      eventHistory: [...state.eventHistory, eventId],
    })),

  unlockPhoto: (photoId) =>
    set((state) => ({
      unlockedPhotos: state.unlockedPhotos.includes(photoId)
        ? state.unlockedPhotos
        : [...state.unlockedPhotos, photoId],
    })),

  setGamePhase: (phase) => set({ gamePhase: phase }),

  setActiveMinigame: (id) =>
    set({ activeMinigame: id, gamePhase: id ? 'minigame' : 'map' }),

  clearPendingDeltas: () => set({ pendingDeltas: null }),
}));
