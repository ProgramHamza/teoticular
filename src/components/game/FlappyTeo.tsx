import { useState, useEffect, useRef, useCallback } from 'react';
import type { MinigameResult } from '@/types/game';

// ─── Flappy Teo ───
// Flappy-bird style: tap to flap, dodge pipes. Score = pipes passed.

interface Props {
  onComplete: (result: MinigameResult) => void;
}

interface Pipe {
  x: number;
  gapY: number;
  passed: boolean;
}

const GRAVITY = 0.4;
const JUMP_FORCE = -6;
const PIPE_SPEED = 2.5;
const PIPE_GAP = 130;
const PIPE_WIDTH = 50;
const BIRD_SIZE = 28;
const CANVAS_W = 400;
const CANVAS_H = 500;
const GOAL_SCORE = 5;

const FlappyTeo = ({ onComplete }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'done'>('ready');
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  const birdRef = useRef({ y: CANVAS_H / 2, vy: 0 });
  const pipesRef = useRef<Pipe[]>([]);
  const scoreRef = useRef(0);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const jump = useCallback(() => {
    if (gameState === 'ready') {
      setGameState('playing');
      birdRef.current = { y: CANVAS_H / 2, vy: JUMP_FORCE };
      pipesRef.current = [];
      scoreRef.current = 0;
      setScore(0);
      frameRef.current = 0;
    } else if (gameState === 'playing') {
      birdRef.current.vy = JUMP_FORCE;
    }
  }, [gameState]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jump]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameLoop = () => {
      const bird = birdRef.current;
      const pipes = pipesRef.current;

      // Physics
      bird.vy += GRAVITY;
      bird.y += bird.vy;

      // Spawn pipes
      frameRef.current++;
      if (frameRef.current % 90 === 0) {
        const gapY = 100 + Math.random() * (CANVAS_H - 200 - PIPE_GAP);
        pipes.push({ x: CANVAS_W, gapY, passed: false });
      }

      // Move pipes & check score
      let hit = false;
      for (const pipe of pipes) {
        pipe.x -= PIPE_SPEED;

        // Score
        if (!pipe.passed && pipe.x + PIPE_WIDTH < 60) {
          pipe.passed = true;
          scoreRef.current++;
          setScore(scoreRef.current);
        }

        // Collision
        const birdLeft = 50;
        const birdRight = 50 + BIRD_SIZE;
        const birdTop = bird.y;
        const birdBottom = bird.y + BIRD_SIZE;

        if (birdRight > pipe.x && birdLeft < pipe.x + PIPE_WIDTH) {
          if (birdTop < pipe.gapY || birdBottom > pipe.gapY + PIPE_GAP) {
            hit = true;
          }
        }
      }

      // Remove offscreen pipes
      pipesRef.current = pipes.filter((p) => p.x > -PIPE_WIDTH);

      // Floor/ceiling collision
      if (bird.y < 0 || bird.y + BIRD_SIZE > CANVAS_H) hit = true;

      // Draw
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Grid bg
      ctx.strokeStyle = 'rgba(100,200,255,0.05)';
      for (let x = 0; x < CANVAS_W; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke();
      }
      for (let y = 0; y < CANVAS_H; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke();
      }

      // Pipes
      for (const pipe of pipesRef.current) {
        ctx.fillStyle = '#4ade80';
        ctx.shadowColor = '#4ade80';
        ctx.shadowBlur = 8;
        // Top pipe
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gapY);
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.gapY + PIPE_GAP, PIPE_WIDTH, CANVAS_H - pipe.gapY - PIPE_GAP);
        ctx.shadowBlur = 0;
      }

      // Bird
      ctx.font = `${BIRD_SIZE}px serif`;
      ctx.fillText('👦', 50, bird.y + BIRD_SIZE);

      // Score
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px "Press Start 2P", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${scoreRef.current}`, CANVAS_W / 2, 40);
      ctx.textAlign = 'start';

      if (hit) {
        setFinalScore(scoreRef.current);
        setGameState('done');
        return;
      }

      rafRef.current = requestAnimationFrame(gameLoop);
    };

    rafRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'done') return;
    const timer = setTimeout(() => {
      const success = finalScore >= GOAL_SCORE;
      onComplete({
        success,
        ambitionDelta: success ? 2 : 0,
        chaosDelta: finalScore >= 3 ? 1 : 0,
        relationsDelta: 0,
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [gameState, finalScore]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h2 className="font-pixel text-sm text-primary neon-glow-cyan tracking-wider mb-4">
        FLAPPY TEO
      </h2>

      <div className="relative pixel-border" onClick={jump} style={{ cursor: 'pointer' }}>
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="block"
        />

        {gameState === 'ready' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
            <div className="text-5xl mb-4 animate-pixel-idle">👦</div>
            <p className="font-pixel text-xs text-primary mb-2">TAP OR SPACE TO FLY</p>
            <p className="font-body text-lg text-muted-foreground">Pass {GOAL_SCORE} pipes to win!</p>
          </div>
        )}

        {gameState === 'done' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
            <div className="text-5xl mb-4">{finalScore >= GOAL_SCORE ? '🎉' : '💀'}</div>
            <p className={`font-pixel text-lg mb-2 ${finalScore >= GOAL_SCORE ? 'text-primary neon-glow-cyan' : 'text-destructive'}`}>
              {finalScore >= GOAL_SCORE ? 'NICE!' : 'SPLAT!'}
            </p>
            <p className="font-body text-2xl text-foreground">Score: {finalScore}</p>
          </div>
        )}
      </div>

      <p className="mt-4 font-body text-lg text-muted-foreground">
        {gameState === 'playing' ? `Score: ${score} / ${GOAL_SCORE}` : ''}
      </p>
    </div>
  );
};

export default FlappyTeo;
