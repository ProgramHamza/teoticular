import { useGameStore } from '@/store/gameStore';

const TitleScreen = () => {
  const startGame = useGameStore((s) => s.startGame);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background relative overflow-hidden grain-overlay">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Title */}
      <div className="relative z-10 text-center">
        <div className="text-6xl mb-6 animate-pixel-idle">👦</div>
        <h1 className="font-pixel text-3xl md:text-4xl text-primary neon-glow-cyan tracking-widest mb-2">
          TEO LIFE
        </h1>
        <p className="font-body text-2xl text-secondary neon-glow-magenta mb-1">
          A curated scrapbook of growing up
        </p>
        <p className="font-body text-lg text-muted-foreground mb-12">
          bit-art · minigames · memories
        </p>

        <button
          onClick={startGame}
          className="pixel-border bg-primary text-primary-foreground font-pixel text-sm px-10 py-4 hover:opacity-80 transition-opacity animate-pulse-glow"
        >
          START GAME
        </button>

        <div className="mt-8 flex gap-6 justify-center">
          {['🚀 Ambition', '🔥 Chaos', '💛 Relations'].map((stat) => (
            <span key={stat} className="font-body text-lg text-muted-foreground">
              {stat}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-6 left-6 font-pixel text-[8px] text-muted-foreground animate-glitch-flicker">
        v0.1.0
      </div>
      <div className="absolute bottom-6 right-6 font-pixel text-[8px] text-muted-foreground">
        ▸ A LOVABLE GAME
      </div>
    </div>
  );
};

export default TitleScreen;
