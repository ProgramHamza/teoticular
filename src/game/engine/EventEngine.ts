/**
 * EventEngine - handles event progression and triggering
 */

import { getEventById, getRandomEvent, GameEvent } from '@/game/data/events';
import { useGameStore } from '@/game/state/useGameStore';

export class EventEngine {
  /**
   * Trigger a specific event by ID
   */
  static triggerEvent(eventId: string): GameEvent | null {
    const event = getEventById(eventId);
    if (!event) return null;

    const store = useGameStore.getState();
    store.startEvent(eventId);
    return event;
  }

  /**
   * Resolve an event choice and apply stat changes
   */
  static resolveChoice(eventId: string, choiceId: string): void {
    const event = getEventById(eventId);
    if (!event) return;

    const choice = event.choices.find((c: any) => c.id === choiceId);
    if (!choice) return;

    const store = useGameStore.getState();

    // Apply stat changes
    store.updateStats(
      choice.statDeltas.ambition,
      choice.statDeltas.chaos,
      choice.statDeltas.relations
    );

    // Apply parental suspicion if applicable
    if (choice.parentalSuspicionDelta) {
      store.addParentalSuspicion(choice.parentalSuspicionDelta);
    }

    // Unlock photo if applicable
    if (event.photoUnlock) {
      store.unlockPhoto(event.photoUnlock);
    }

    // Mark event as complete
    store.completeEvent(eventId);
  }

  /**
   * Get a random event for the current age
   */
  static getRandomEventForAge(age: number): GameEvent | undefined {
    const store = useGameStore.getState();
    return getRandomEvent(age, store.investmentUnlocked);
  }

  /**
   * Check if a random event should trigger this turn
   * Base probability is 15%, modified by chaos
   */
  static shouldTriggerRandomEvent(): boolean {
    const store = useGameStore.getState();
    
    // Chaos increases probability of events
    const baseProbability = 0.15;
    const chaosMod = store.chaos / 100 * 0.1; // Up to 10% bonus
    const probability = baseProbability + chaosMod;

    return Math.random() < probability;
  }
}
