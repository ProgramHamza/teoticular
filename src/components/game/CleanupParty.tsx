import { useState, useEffect, useCallback, useRef } from 'react';
import type { MinigameResult } from '@/types/game';

// ─── Cleanup After Party Minigame ───
// Timed clicking: find and click items before parents arrive.

interface TrashItem {
  id: string;
  emoji: string;
  x: number;
  y: number;
  found: boolean;
}

interface Props {
  onComplete: (result: MinigameResult) => void;
}

const TIME_LIMIT = 15; // seconds
const ITEMS_NEEDED = 8;

const generateTrash = (): TrashItem[] => {
  const emojis = ['🍺', '🍕', '🎈', '🧻', '🥤', '🍿', '🎉', '💊', '🧦', '🎵', '🍾', '🧃'];
  return emojis.slice(0, ITEMS_NEEDED + 2).map((emoji, i) => ({
    id: `trash_${i}`,
    emoji,
    x: 10 + Math.random() * 75,
    y: 15 + Math.random() * 70,
    found: false,
  }));
};

const CleanupParty = ({ onComplete }: Props) => {
  const [items, setItems] = useState<TrashItem[]>(() => generateTrash());
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [found, setFound] = useState(0);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'done'>('ready');
  const [message, setMessage] = useState('');
  const timerRef = useRef<number>();

  const startGame = () => {
    setGameState('playing');
    setItems(generateTrash());
    setFound(0);
    setTimeLeft(TIME_LIMIT);
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameState('done');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  const handleClickItem = (id: string) => {
    if (gameState !== 'playing') return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, found: true } : item
      )
    );
    const newFound = found + 1;
    setFound(newFound);

    const messages = ['Nice!', 'Got it!', 'Hidden well!', 'Yeet!', 'Quick!', 'Before they see!'];
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
    setTimeout(() => setMessage(''), 600);

    if (newFound >= ITEMS_NEEDED) {
      setGameState('done');
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (gameState !== 'done') return;
    const success = found >= ITEMS_NEEDED;
    const timer = setTimeout(() => {
      onComplete({
        success,
        ambitionDelta: 0,
        chaosDelta: success ? -2 : 1,
        relationsDelta: success ? 1 : -2,
        metadata: { itemsFound: found, timeRemaining: timeLeft },
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [gameState]);

  const success = found >= ITEMS_NEEDED;

  if (gameState === 'ready') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background p-8">
        <div className="pixel-border bg-card p-8 max-w-md text-center">
          <div className="text-5xl mb-4 animate-pixel-idle">🧹</div>
          <h2 className="font-pixel text-sm text-secondary neon-glow-magenta mb-3">CLEANUP AFTER PARTY</h2>
          <p className="font-body text-xl text-foreground mb-6">
            Parents come home in {TIME_LIMIT} seconds! Find and tap all {ITEMS_NEEDED} party items!
          </p>
          <button
            onClick={startGame}
            className="pixel-border bg-primary text-primary-foreground font-pixel text-xs px-6 py-3 hover:opacity-80 transition-opacity"
          >
            START CLEANING
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'done') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background p-8">
        <div className="pixel-border bg-card p-8 max-w-md text-center">
          <div className="text-6xl mb-4 animate-pixel-idle">
            {success ? '✨' : '😱'}
          </div>
          <h2 className={`font-pixel text-lg mb-3 ${success ? 'text-primary neon-glow-cyan' : 'text-destructive'}`}>
            {success ? 'ALL CLEAN!' : 'BUSTED!'}
          </h2>
          <p className="font-body text-xl text-foreground">
            {success
              ? '"Why does the house smell like air freshener?" "No reason, Mom."'
              : '"WHAT HAPPENED TO MY LIVING ROOM?!" You\'re grounded.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background p-4">
      <div className="text-center mb-4">
        <h2 className="font-pixel text-sm text-secondary neon-glow-magenta tracking-wider mb-1">
          CLEANUP!
        </h2>
        <div className="flex gap-6 justify-center">
          <span className={`font-pixel text-xs ${timeLeft <= 5 ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
            ⏱️ {timeLeft}s
          </span>
          <span className="font-pixel text-xs text-accent">
            {found}/{ITEMS_NEEDED} found
          </span>
        </div>
      </div>

      {/* Game area */}
      <div className="pixel-border bg-card relative w-full max-w-lg aspect-square overflow-hidden">
        {/* Room BG pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, hsl(var(--border)) 10px, hsl(var(--border)) 11px)',
        }} />

        {message && (
          <div className="absolute top-4 left-0 right-0 text-center z-20">
            <span className="font-pixel text-xs text-accent animate-stat-pop">{message}</span>
          </div>
        )}

        {items.map((item) => (
          !item.found && (
            <button
              key={item.id}
              onClick={() => handleClickItem(item.id)}
              className="absolute text-3xl hover:scale-125 transition-transform cursor-pointer animate-pixel-idle z-10"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {item.emoji}
            </button>
          )
        ))}

        {/* Furniture (static obstacles for visual noise) */}
        <div className="absolute bottom-0 left-[10%] text-5xl opacity-30">🛋️</div>
        <div className="absolute bottom-0 right-[15%] text-4xl opacity-30">🪴</div>
        <div className="absolute top-[10%] right-[10%] text-4xl opacity-30">🖼️</div>
        <div className="absolute top-[50%] left-[5%] text-4xl opacity-30">🪑</div>
      </div>
    </div>
  );
};

export default CleanupParty;
