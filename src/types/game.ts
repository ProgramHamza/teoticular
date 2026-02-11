// ─── Global Game Types ───

export interface GameStats {
  ambition: number;
  chaos: number;
  relations: number;
}

export interface StatDeltas {
  ambitionDelta: number;
  chaosDelta: number;
  relationsDelta: number;
}

export interface MinigameResult extends StatDeltas {
  success: boolean;
  metadata?: Record<string, any>;
}

export interface MinigameConfig {
  difficulty: number;
  statImpactOdds: number;
}

export type Act = 'childhood' | 'school' | 'teenage';

export interface GameState {
  stats: GameStats;
  age: number;
  act: Act;
  currentLocation: string | null;
  eventFlags: Record<string, boolean>;
  eventHistory: string[];
  unlockedPhotos: string[];
  activeMinigame: string | null;
  gamePhase: 'title' | 'map' | 'minigame' | 'dialogue' | 'montage' | 'ending';
}

// ─── Event System Types ───

export interface DialogueChoice {
  id: string;
  text: string;
  requiredStat?: { stat: keyof GameStats; min: number };
  deltas: Partial<StatDeltas>;
  flagsToSet?: string[];
  nextEventId?: string;
  photoUnlock?: string;
}

export interface GameEvent {
  id: string;
  location: string;
  ageRange: [number, number];
  requiredFlags?: string[];
  title: string;
  description: string;
  choices: DialogueChoice[];
  photoUnlocks?: string[];
  minigameRef?: string;
}

// ─── Special Event Map Types ───

export interface MapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  eventId: string;
  icon: string;
}

export interface SpecialEventMap {
  id: string;
  name: string;
  background: string;
  nodes: MapNode[];
  photos: PhotoMeta[];
}

// ─── Photo Types ───

export interface PhotoMeta {
  id: string;
  src: string;
  caption: string;
  ageTag: number;
}

// ─── Location Types ───

export interface LocationData {
  id: string;
  name: string;
  icon: string;
  unlockAge: number;
  unlockFlag?: string;
  x: number;
  y: number;
  color: string;
}

// ─── Ending Types ───

export interface Ending {
  id: string;
  title: string;
  summary: string;
  imageRef: string;
  condition: {
    ambitionMin?: number;
    ambitionMax?: number;
    chaosMin?: number;
    chaosMax?: number;
    relationsMin?: number;
    relationsMax?: number;
    requiredFlags?: string[];
  };
}
