import { useState, useEffect, useCallback } from 'react';
import type { MinigameResult } from '@/types/game';

// ─── Balance Walk: Learn to Walk ───
// Hold left/right to keep balance meter centered. Survive long enough to win.

interface Props {
  onComplete: (result: MinigameResult) => void;
}

const DURATION = 8; // seconds to survive
const WOBBLE_SPEED = 0.03;

const BalanceWalk = ({ onComplete }: Props) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'done'>('ready');
  const [balance, setBalance] = useState(50); // 0-100, 50 = center
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [steps, setSteps] = useState(0);
  const [keysDown, setKeysDown] = useState<Set<string>>(new Set());

  const startGame = () => {
    setGameState('playing');
    setBalance(50);
    setTimeLeft(DURATION);
    setSteps(0);
  };

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
        e.preventDefault();
        setKeysDown((prev) => new Set(prev).add(e.code));
      }
      if (e.code === 'Space' && gameState === 'ready') {
        e.preventDefault();
        startGame();
      }
    };
    const handleUp = (e: KeyboardEvent) => {
      setKeysDown((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, [gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setBalance((b) => {
        // Random wobble
        const wobble = (Math.random() - 0.5) * 4;
        let newB = b + wobble;

        // Player correction
        if (keysDown.has('ArrowLeft')) newB -= 2;
        if (keysDown.has('ArrowRight')) newB += 2;

        newB = Math.max(0, Math.min(100, newB));

        // Fall!
        if (newB <= 5 || newB >= 95) {
          setGameState('done');
        }

        return newB;
      });

      setSteps((s) => s + 1);
    }, 50);

    return () => clearInterval(interval);
  }, [gameState, keysDown]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) {
          setGameState('done');
          return 0;
        }
        return Math.max(0, t - 0.1);
      });
    }, 100);
    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'done') return;
    const survived = timeLeft <= 0;
    const timer = setTimeout(() => {
      onComplete({
        success: survived,
        ambitionDelta: survived ? 1 : 0,
        chaosDelta: survived ? 0 : 1,
        relationsDelta: survived ? 2 : 1,
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  const survived = timeLeft <= 0;
  const babyEmoji = balance < 30 ? '🫃' : balance > 70 ? '🫃' : '🚶';

  if (gameState === 'done') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background p-8">
        <div className="pixel-border bg-card p-8 max-w-md text-center">
          <div className="text-6xl mb-4 animate-pixel-idle">{survived ? '🎉' : '👶'}</div>
          <h2 className={`font-pixel text-lg mb-3 ${survived ? 'text-primary neon-glow-cyan' : 'text-destructive'}`}>
            {survived ? 'FIRST STEPS!' : 'TUMBLE!'}
          </h2>
          <p className="font-body text-xl text-foreground">
            {survived
              ? 'Wobbly but determined! Mom has it all on camera.'
              : 'A soft landing on your diaper. You\'ll try again tomorrow!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h2 className="font-pixel text-sm text-primary neon-glow-cyan tracking-wider mb-2">
        LEARN TO WALK
      </h2>

      {gameState === 'ready' ? (
        <div className="pixel-border bg-card p-8 text-center cursor-pointer" onClick={startGame}>
          <div className="text-5xl mb-4 animate-pixel-idle">👶</div>
          <p className="font-body text-xl text-foreground mb-4">
            Use ← → arrow keys to keep balance!
          </p>
          <p className="font-pixel text-xs text-accent">TAP OR SPACE TO START</p>
        </div>
      ) : (
        <>
          <p className="font-body text-lg text-muted-foreground mb-4">
            Stay balanced for {timeLeft.toFixed(1)}s more!
          </p>

          {/* Balance meter */}
          <div className="w-80 h-8 bg-muted pixel-border relative mb-8">
            {/* Safe zone */}
            <div className="absolute top-0 bottom-0 left-[20%] right-[20%] bg-primary/10 border-x-2 border-primary/30" />
            {/* Danger zones */}
            <div className="absolute top-0 bottom-0 left-0 w-[10%] bg-destructive/20" />
            <div className="absolute top-0 bottom-0 right-0 w-[10%] bg-destructive/20" />
            {/* Balance indicator */}
            <div
              className="absolute top-0 bottom-0 w-3 bg-accent rounded-sm transition-none"
              style={{ left: `${balance}%`, transform: 'translateX(-50%)' }}
            />
          </div>

          {/* Baby visual */}
          <div className="text-6xl mb-4" style={{
            transform: `rotate(${(balance - 50) * 1.5}deg)`,
            transition: 'transform 50ms',
          }}>
            👶
          </div>

          {/* Mobile controls */}
          <div className="flex gap-6 mt-4">
            <button
              onPointerDown={() => setKeysDown((p) => new Set(p).add('ArrowLeft'))}
              onPointerUp={() => setKeysDown((p) => { const n = new Set(p); n.delete('ArrowLeft'); return n; })}
              onPointerLeave={() => setKeysDown((p) => { const n = new Set(p); n.delete('ArrowLeft'); return n; })}
              className="pixel-border bg-card text-3xl w-16 h-16 flex items-center justify-center active:bg-muted select-none"
            >
              ←
            </button>
            <button
              onPointerDown={() => setKeysDown((p) => new Set(p).add('ArrowRight'))}
              onPointerUp={() => setKeysDown((p) => { const n = new Set(p); n.delete('ArrowRight'); return n; })}
              onPointerLeave={() => setKeysDown((p) => { const n = new Set(p); n.delete('ArrowRight'); return n; })}
              className="pixel-border bg-card text-3xl w-16 h-16 flex items-center justify-center active:bg-muted select-none"
            >
              →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BalanceWalk;
