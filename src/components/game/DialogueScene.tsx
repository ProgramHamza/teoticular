import { useGameStore } from '@/store/gameStore';
import { events } from '@/data/gameData';
import type { MinigameResult } from '@/types/game';

interface Props {
  onClose: () => void;
}

const DialogueScene = ({ onClose }: Props) => {
  const { currentLocation, age, eventFlags, applyDeltas, recordEvent, setFlag, unlockPhoto, setActiveMinigame } = useGameStore();

  const availableEvents = events.filter(
    (e) =>
      e.location === currentLocation &&
      age >= e.ageRange[0] &&
      age <= e.ageRange[1] &&
      (!e.requiredFlags || e.requiredFlags.every((f) => eventFlags[f]))
  );

  const event = availableEvents[0];

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background p-8">
        <div className="pixel-border bg-card p-8 max-w-md text-center">
          <div className="text-4xl mb-4 animate-pixel-idle">🏙️</div>
          <p className="font-body text-xl text-muted-foreground">
            Nothing interesting here right now...
          </p>
          <button
            onClick={onClose}
            className="mt-6 pixel-border bg-primary text-primary-foreground font-pixel text-xs px-6 py-3 hover:opacity-80 transition-opacity"
          >
            BACK TO MAP
          </button>
        </div>
      </div>
    );
  }

  const handleChoice = (choice: typeof event.choices[0]) => {
    applyDeltas(choice.deltas);
    recordEvent(event.id);
    if (choice.flagsToSet) choice.flagsToSet.forEach((f) => setFlag(f));
    if (choice.photoUnlock) unlockPhoto(choice.photoUnlock);
    setTimeout(onClose, 800);
  };

  if (event.minigameRef) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background p-8">
        <div className="pixel-border bg-card p-8 max-w-md text-center">
          <div className="text-4xl mb-4 animate-pixel-idle">🎮</div>
          <h2 className="font-pixel text-sm text-primary neon-glow-cyan mb-3">{event.title}</h2>
          <p className="font-body text-xl text-foreground mb-6">{event.description}</p>
          <button
            onClick={() => setActiveMinigame(event.minigameRef!)}
            className="pixel-border bg-primary text-primary-foreground font-pixel text-xs px-6 py-3 hover:opacity-80 transition-opacity"
          >
            START MINIGAME
          </button>
          <button
            onClick={onClose}
            className="block mx-auto mt-3 font-body text-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            Maybe later...
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="pixel-border bg-card p-6 max-w-md w-full mb-6">
        <h2 className="font-pixel text-sm text-accent neon-glow-yellow mb-3">{event.title}</h2>
        <p className="font-body text-xl text-foreground leading-relaxed">{event.description}</p>
      </div>

      <div className="flex flex-col gap-3 max-w-md w-full">
        {event.choices.map((choice) => {
          const locked = choice.requiredStat && useGameStore.getState().stats[choice.requiredStat.stat] < choice.requiredStat.min;
          return (
            <button
              key={choice.id}
              onClick={() => !locked && handleChoice(choice)}
              disabled={!!locked}
              className={`pixel-border p-4 text-left transition-all ${
                locked ? 'bg-muted opacity-40 cursor-not-allowed' : 'bg-card hover:bg-muted cursor-pointer hover:scale-[1.02]'
              }`}
            >
              <p className="font-body text-lg text-foreground">{choice.text}</p>
            </button>
          );
        })}
      </div>

      <button
        onClick={onClose}
        className="mt-6 font-body text-lg text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to map
      </button>
    </div>
  );
};

export default DialogueScene;
