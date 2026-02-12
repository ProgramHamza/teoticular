import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { specialEvents } from '@/data/gameData';
import type { SpecialEventMap } from '@/types/game';

interface Props {
  eventMap: SpecialEventMap;
  onComplete: () => void;
}

const SpecialEventScene = ({ eventMap, onComplete }: Props) => {
  const { applyDeltas, recordEvent, setFlag, unlockPhoto } = useGameStore();
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [activeNodeEvent, setActiveNodeEvent] = useState<string | null>(null);

  const activeEvent = activeNodeEvent
    ? specialEvents.find((e) => e.id === activeNodeEvent)
    : null;

  const handleNodeClick = (eventId: string) => {
    setActiveNodeEvent(eventId);
  };

  const handleChoice = (choice: typeof specialEvents[0]['choices'][0]) => {
    applyDeltas(choice.deltas);
    if (activeNodeEvent) {
      recordEvent(activeNodeEvent);
      setVisitedNodes((prev) => [...prev, activeNodeEvent]);
    }
    if (choice.flagsToSet) choice.flagsToSet.forEach((f) => setFlag(f));
    if (choice.photoUnlock) unlockPhoto(choice.photoUnlock);
    setActiveNodeEvent(null);
  };

  const allVisited = eventMap.nodes.every((n) => visitedNodes.includes(n.eventId));

  // ── Active event dialogue ──
  if (activeEvent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="pixel-border bg-card p-6 max-w-md w-full mb-6">
          <h2 className="font-pixel text-sm text-accent neon-glow-yellow mb-3">{activeEvent.title}</h2>
          <p className="font-body text-xl text-foreground leading-relaxed">{activeEvent.description}</p>
        </div>
        <div className="flex flex-col gap-3 max-w-md w-full">
          {activeEvent.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice)}
              className="pixel-border p-4 text-left bg-card hover:bg-muted cursor-pointer hover:scale-[1.02] transition-all"
            >
              <p className="font-body text-lg text-foreground">{choice.text}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── Special event map ──
  return (
    <div className="relative w-full h-screen bg-card overflow-hidden scanlines">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Title */}
      <div className="absolute top-4 left-0 right-0 text-center z-10">
        <h2 className="font-pixel text-lg text-accent neon-glow-yellow tracking-wider">
          {eventMap.name}
        </h2>
        <p className="font-body text-xl text-muted-foreground mt-1">
          {allVisited ? 'All done! You can leave now.' : 'Explore each spot...'}
        </p>
      </div>

      {/* Nodes */}
      {eventMap.nodes.map((node) => {
        const visited = visitedNodes.includes(node.eventId);
        return (
          <button
            key={node.id}
            onClick={() => !visited && handleNodeClick(node.eventId)}
            disabled={visited}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              visited ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-110'
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {!visited && (
              <div className="absolute inset-0 -m-2 rounded-full animate-pulse-glow" />
            )}
            <div className={`pixel-border bg-card w-16 h-16 flex items-center justify-center text-2xl ${!visited ? 'hover:bg-muted' : ''}`}>
              {visited ? '✅' : node.icon}
            </div>
            <span className={`block mt-1 font-pixel text-[8px] text-center tracking-wide ${visited ? 'text-muted-foreground' : 'text-foreground'}`}>
              {node.label}
            </span>
          </button>
        );
      })}

      {/* Leave button */}
      {allVisited && (
        <div className="absolute bottom-12 left-0 right-0 flex justify-center z-20">
          <button
            onClick={onComplete}
            className="pixel-border bg-primary text-primary-foreground font-pixel text-xs px-8 py-4 hover:opacity-80 transition-opacity animate-pulse-glow"
          >
            CONTINUE →
          </button>
        </div>
      )}
    </div>
  );
};

export default SpecialEventScene;
