import { useState, useMemo } from 'react';
import { useGameStore } from '@/store/gameStore';
import type { MinigameResult } from '@/types/game';

// ─── ConvinceParents Minigame ───
// Turn-based argument: parent offers objections, player selects replies.
// Replies unlock based on stats. Win → flag + ambition. Fail → relations-1.

interface Objection {
  id: string;
  parentSays: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  text: string;
  type: 'empathetic' | 'logical' | 'chaotic';
  requiredStat?: { stat: 'ambition' | 'chaos' | 'relations'; min: number };
  effectiveness: number; // 0-2
}

const objections: Objection[] = [
  {
    id: 'obj1',
    parentSays: '"You\'re too young to invest. Money is for adults."',
    replies: [
      {
        id: 'r1a',
        text: '"Warren Buffett bought his first stock at 11. I\'m already behind."',
        type: 'logical',
        requiredStat: { stat: 'ambition', min: 15 },
        effectiveness: 2,
      },
      {
        id: 'r1b',
        text: '"I know it seems scary, but I want to learn while the stakes are small."',
        type: 'empathetic',
        requiredStat: { stat: 'relations', min: 12 },
        effectiveness: 2,
      },
      {
        id: 'r1c',
        text: '"Fine, I\'ll just gamble my lunch money on Pokémon cards instead."',
        type: 'chaotic',
        effectiveness: 1,
      },
    ],
  },
  {
    id: 'obj2',
    parentSays: '"What if you lose all your money?"',
    replies: [
      {
        id: 'r2a',
        text: '"I\'ll only invest what I can afford to lose. I made a budget spreadsheet!"',
        type: 'logical',
        requiredStat: { stat: 'ambition', min: 20 },
        effectiveness: 2,
      },
      {
        id: 'r2b',
        text: '"Would you rather I learn about money from TikTok?"',
        type: 'chaotic',
        effectiveness: 1,
      },
      {
        id: 'r2c',
        text: '"I promise to talk to you about every decision. We can learn together!"',
        type: 'empathetic',
        requiredStat: { stat: 'relations', min: 18 },
        effectiveness: 2,
      },
    ],
  },
  {
    id: 'obj3',
    parentSays: '"Focus on school first. Investing can wait."',
    replies: [
      {
        id: 'r3a',
        text: '"This IS studying. Just with real stakes and better returns than algebra."',
        type: 'logical',
        requiredStat: { stat: 'ambition', min: 25 },
        effectiveness: 2,
      },
      {
        id: 'r3b',
        text: '"You\'re right, school matters. But 30 minutes a week won\'t hurt my grades."',
        type: 'empathetic',
        effectiveness: 1,
      },
      {
        id: 'r3c',
        text: '"YOLO — compound interest waits for no one!"',
        type: 'chaotic',
        effectiveness: 0,
      },
    ],
  },
];

interface Props {
  onComplete: (result: MinigameResult) => void;
}

const ConvinceParents = ({ onComplete }: Props) => {
  const { stats } = useGameStore();
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedReply, setSelectedReply] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [parentMood, setParentMood] = useState<'neutral' | 'impressed' | 'annoyed'>('neutral');

  const currentObjection = objections[currentRound];
  const isLastRound = currentRound >= objections.length - 1;
  const totalNeeded = 3; // need 3+ effectiveness to win

  const isReplyLocked = (reply: Reply) => {
    if (!reply.requiredStat) return false;
    return stats[reply.requiredStat.stat] < reply.requiredStat.min;
  };

  const handleReply = (reply: Reply) => {
    if (isReplyLocked(reply)) return;
    setSelectedReply(reply.id);

    const newScore = score + reply.effectiveness;
    setScore(newScore);
    setParentMood(reply.effectiveness >= 2 ? 'impressed' : reply.effectiveness === 0 ? 'annoyed' : 'neutral');

    setTimeout(() => {
      if (isLastRound) {
        const success = newScore >= totalNeeded;
        setShowResult(true);
        setTimeout(() => {
          onComplete({
            success,
            ambitionDelta: success ? 1 : 0,
            chaosDelta: 0,
            relationsDelta: success ? 0 : -1,
            metadata: { finalScore: newScore, parentMood },
          });
        }, 2500);
      } else {
        setCurrentRound((r) => r + 1);
        setSelectedReply(null);
        setParentMood('neutral');
      }
    }, 1200);
  };

  const parentEmoji = parentMood === 'impressed' ? '😊' : parentMood === 'annoyed' ? '😤' : '🤔';
  const progressPct = ((currentRound + (selectedReply ? 1 : 0)) / objections.length) * 100;
  const success = score >= totalNeeded;

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background p-8">
        <div className="pixel-border bg-card p-8 max-w-md text-center">
          <div className="text-6xl mb-4 animate-pixel-idle">
            {success ? '🎉' : '😔'}
          </div>
          <h2 className={`font-pixel text-lg mb-3 ${success ? 'text-primary neon-glow-cyan' : 'text-destructive'}`}>
            {success ? 'PARENTS CONVINCED!' : 'NOT YET...'}
          </h2>
          <p className="font-body text-xl text-foreground">
            {success
              ? '"Fine... but we\'re setting up parental controls on that account."'
              : '"We\'ll talk about this again when you\'re older, sweetie."'}
          </p>
          <div className="mt-4 flex justify-center gap-4">
            {success && (
              <span className="font-pixel text-xs text-pastel-mint animate-stat-pop">
                +1 Ambition 🚀
              </span>
            )}
            {!success && (
              <span className="font-pixel text-xs text-destructive animate-stat-pop">
                -1 Relations 💔
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-pixel text-sm text-primary neon-glow-cyan tracking-wider mb-2">
          CONVINCE PARENTS
        </h2>
        <p className="font-body text-lg text-muted-foreground">
          Make your case. Choose wisely.
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-6">
        <div className="h-2 bg-muted rounded-sm overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between font-pixel text-[8px] text-muted-foreground mt-1">
          <span>Round {currentRound + 1}/{objections.length}</span>
          <span>Score: {score}/{totalNeeded}</span>
        </div>
      </div>

      {/* Parent speech */}
      <div className="pixel-border bg-card p-6 max-w-md w-full mb-6 relative">
        <div className="absolute -top-5 left-4 text-3xl animate-pixel-idle">
          {parentEmoji}
        </div>
        <div className="ml-10">
          <span className="font-pixel text-[8px] text-secondary block mb-2">PARENT</span>
          <p className="font-body text-xl text-foreground leading-relaxed">
            {currentObjection.parentSays}
          </p>
        </div>
      </div>

      {/* Reply options */}
      <div className="flex flex-col gap-3 max-w-md w-full">
        {currentObjection.replies.map((reply) => {
          const locked = isReplyLocked(reply);
          const isSelected = selectedReply === reply.id;
          const typeIcon = reply.type === 'logical' ? '🧠' : reply.type === 'empathetic' ? '💝' : '🌀';

          return (
            <button
              key={reply.id}
              onClick={() => handleReply(reply)}
              disabled={!!selectedReply || locked}
              className={`pixel-border p-4 text-left transition-all duration-200 ${
                locked
                  ? 'bg-muted opacity-40 cursor-not-allowed'
                  : isSelected
                  ? 'bg-primary/20 border-primary scale-[0.98]'
                  : 'bg-card hover:bg-muted cursor-pointer hover:scale-[1.02]'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{locked ? '🔒' : typeIcon}</span>
                <div className="flex-1">
                  <p className="font-body text-lg text-foreground">{reply.text}</p>
                  {locked && reply.requiredStat && (
                    <p className="font-pixel text-[7px] text-muted-foreground mt-1">
                      Needs {reply.requiredStat.stat} ≥ {reply.requiredStat.min}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ConvinceParents;
