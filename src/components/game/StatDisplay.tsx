import { useGameStore } from '@/store/gameStore';

const statConfig = {
  ambition: { label: 'AMB', icon: '🚀', color: 'text-neon-cyan' },
  chaos: { label: 'CHS', icon: '🔥', color: 'text-neon-magenta' },
  relations: { label: 'REL', icon: '💛', color: 'text-neon-yellow' },
} as const;

const StatDisplay = () => {
  const { stats, age, act, pendingDeltas, clearPendingDeltas, advanceAge } = useGameStore();

  const decreaseAge = () => {
    useGameStore.setState((state) => {
      const newAge = Math.max(0, state.age - 1);
      return { age: newAge, act: newAge <= 6 ? 'childhood' : newAge <= 12 ? 'school' : 'teenage' };
    });
  };

  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col gap-2">
      {/* Age & Act */}
      <div className="pixel-border bg-card px-4 py-2 font-pixel text-xs flex items-center gap-2">
        <button onClick={decreaseAge} className="text-muted-foreground hover:text-primary transition-colors text-lg leading-none">◀</button>
        <span className="text-muted-foreground">AGE</span>{' '}
        <span className="text-primary neon-glow-cyan">{age}</span>
        <span className="ml-1 text-muted-foreground">|</span>
        <span className="ml-1 text-accent uppercase">{act}</span>
        <button onClick={advanceAge} className="text-muted-foreground hover:text-primary transition-colors text-lg leading-none">▶</button>
      </div>

      {/* Stats */}
      <div className="pixel-border bg-card px-4 py-3 flex gap-6">
        {(Object.keys(statConfig) as Array<keyof typeof statConfig>).map((key) => {
          const cfg = statConfig[key];
          const value = stats[key];
          const deltaKey = `${key}Delta` as const;
          const delta = pendingDeltas
            ? (pendingDeltas as any)[deltaKey] ?? 0
            : 0;

          return (
            <div key={key} className="flex flex-col items-center gap-1 relative">
              <span className="text-lg">{cfg.icon}</span>
              <span className={`font-pixel text-xs ${cfg.color}`}>{cfg.label}</span>
              <div className="w-16 h-2 bg-muted rounded-sm overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${value}%`,
                    background: `hsl(var(--${key === 'ambition' ? 'neon-cyan' : key === 'chaos' ? 'neon-magenta' : 'neon-yellow'}))`,
                  }}
                />
              </div>
              <span className="font-body text-sm text-foreground">{value}</span>

              {/* Delta popup */}
              {delta !== 0 && (
                <span
                  className={`absolute -top-4 font-pixel text-xs animate-stat-pop ${
                    delta > 0 ? 'text-pastel-mint' : 'text-destructive'
                  }`}
                  onAnimationEnd={clearPendingDeltas}
                >
                  {delta > 0 ? `+${delta}` : delta}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatDisplay;
