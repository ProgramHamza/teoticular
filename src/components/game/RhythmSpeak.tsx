import { useState, useEffect, useCallback } from 'react';
import type { MinigameResult } from '@/types/game';

// ─── Rhythm Game: Learn To Speak ───
// Press spacebar when the ring aligns with the target zone.

interface Props {
  onComplete: (result: MinigameResult) => void;
}

const TOTAL_BEATS = 6;
const GOAL_HITS = 4;

const words = ['MA-MA', 'DA-DA', 'MORE', 'NO!', 'MINE', 'WHY?'];

const RhythmSpeak = ({ onComplete }: Props) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'done'>('ready');
  const [currentBeat, setCurrentBeat] = useState(0);
  const [ringPosition, setRingPosition] = useState(0); // 0-100
  const [hits, setHits] = useState(0);
  const [feedback, setFeedback] = useState<'perfect' | 'miss' | null>(null);
  const [direction, setDirection] = useState(1);

  const targetMin = 40;
  const targetMax = 60;

  // Ring oscillation
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setRingPosition((pos) => {
        const speed = 2 + currentBeat * 0.5; // gets faster
        let newPos = pos + direction * speed;
        if (newPos >= 100) { newPos = 100; setDirection(-1); }
        if (newPos <= 0) { newPos = 0; setDirection(1); }
        return newPos;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [gameState, direction, currentBeat]);

  const handleTap = useCallback(() => {
    if (gameState === 'ready') {
      setGameState('playing');
      setCurrentBeat(0);
      setHits(0);
      setRingPosition(0);
      setDirection(1);
      return;
    }
    if (gameState !== 'playing') return;

    const isHit = ringPosition >= targetMin && ringPosition <= targetMax;
    if (isHit) {
      setHits((h) => h + 1);
      setFeedback('perfect');
    } else {
      setFeedback('miss');
    }

    setTimeout(() => setFeedback(null), 400);

    if (currentBeat >= TOTAL_BEATS - 1) {
      setTimeout(() => setGameState('done'), 500);
    } else {
      setCurrentBeat((b) => b + 1);
      setRingPosition(0);
      setDirection(1);
    }
  }, [gameState, ringPosition, currentBeat]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') { e.preventDefault(); handleTap(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleTap]);

  useEffect(() => {
    if (gameState !== 'done') return;
    const success = hits >= GOAL_HITS;
    const timer = setTimeout(() => {
      onComplete({
        success,
        ambitionDelta: 0,
        chaosDelta: 0,
        relationsDelta: success ? 2 : 0,
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [gameState, hits]);

  const success = hits >= GOAL_HITS;

  if (gameState === 'done') {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background p-8">
        <div className="pixel-border bg-card p-8 max-w-md text-center">
          <div className="text-6xl mb-4 animate-pixel-idle">{success ? '🗣️' : '🤫'}</div>
          <h2 className={`font-pixel text-lg mb-3 ${success ? 'text-primary neon-glow-cyan' : 'text-destructive'}`}>
            {success ? 'FIRST WORDS!' : 'BABBLING...'}
          </h2>
          <p className="font-body text-xl text-foreground">
            {success
              ? '"MORE!" Your first real word. Mom cried. Dad recorded it.'
              : 'Just adorable babbling for now. Your time will come.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4" onClick={handleTap}>
      <h2 className="font-pixel text-sm text-primary neon-glow-cyan tracking-wider mb-2">
        LEARN TO SPEAK
      </h2>
      <p className="font-body text-lg text-muted-foreground mb-6">
        {gameState === 'ready' ? 'Tap or press SPACE when the ring is in the zone!' : `${currentBeat + 1}/${TOTAL_BEATS}`}
      </p>

      {gameState === 'ready' ? (
        <div className="pixel-border bg-card p-8 text-center cursor-pointer">
          <div className="text-5xl mb-4 animate-pixel-idle">👶</div>
          <p className="font-pixel text-xs text-accent">TAP TO START</p>
        </div>
      ) : (
        <>
          {/* Current word */}
          <div className="text-4xl font-pixel text-accent neon-glow-yellow mb-8 animate-pixel-idle">
            "{words[currentBeat]}"
          </div>

          {/* Timing bar */}
          <div className="w-80 h-12 bg-muted pixel-border relative mb-6">
            {/* Target zone */}
            <div
              className="absolute top-0 bottom-0 bg-primary/20 border-x-2 border-primary"
              style={{ left: `${targetMin}%`, width: `${targetMax - targetMin}%` }}
            />
            {/* Moving ring */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-10 bg-accent rounded-sm transition-none"
              style={{ left: `${ringPosition}%` }}
            />
          </div>

          {/* Feedback */}
          <div className="h-8">
            {feedback === 'perfect' && (
              <span className="font-pixel text-sm text-pastel-mint animate-stat-pop">PERFECT!</span>
            )}
            {feedback === 'miss' && (
              <span className="font-pixel text-sm text-destructive animate-stat-pop">MISS!</span>
            )}
          </div>

          {/* Score */}
          <p className="font-pixel text-xs text-muted-foreground mt-4">
            Hits: {hits}/{GOAL_HITS}
          </p>
        </>
      )}
    </div>
  );
};

export default RhythmSpeak;
