import { useGameStore } from '@/store/gameStore';
import { endings, photos } from '@/data/gameData';

const EndingScreen = () => {
  const { stats, eventFlags, unlockedPhotos, eventHistory } = useGameStore();
  const startGame = useGameStore((s) => s.startGame);

  // Find matching ending
  const matchedEnding = endings.find((e) => {
    const c = e.condition;
    if (c.ambitionMin !== undefined && stats.ambition < c.ambitionMin) return false;
    if (c.ambitionMax !== undefined && stats.ambition > c.ambitionMax) return false;
    if (c.chaosMin !== undefined && stats.chaos < c.chaosMin) return false;
    if (c.chaosMax !== undefined && stats.chaos > c.chaosMax) return false;
    if (c.relationsMin !== undefined && stats.relations < c.relationsMin) return false;
    if (c.relationsMax !== undefined && stats.relations > c.relationsMax) return false;
    if (c.requiredFlags && !c.requiredFlags.every((f) => eventFlags[f])) return false;
    return true;
  }) || endings[endings.length - 1]; // fallback to balanced

  const unlockedPhotoData = photos.filter((p) => unlockedPhotos.includes(p.id));

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 grain-overlay">
      {/* Ending card */}
      <div className="pixel-border bg-card p-8 max-w-lg w-full text-center mb-8 relative overflow-hidden">
        {/* Decorative top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

        <p className="font-pixel text-[8px] text-muted-foreground tracking-widest mb-4">
          TEO TURNED 18 — THE STORY ENDS
        </p>

        <div className="text-6xl mb-4 animate-pixel-idle">
          {matchedEnding.id === 'entrepreneur' ? '💼' :
           matchedEnding.id === 'party_legend' ? '🎉' :
           matchedEnding.id === 'beloved_friend' ? '💛' :
           matchedEnding.id === 'buffalo_soldier' ? '🏄' : '🌟'}
        </div>

        <h1 className="font-pixel text-lg text-primary neon-glow-cyan mb-4 tracking-wide">
          {matchedEnding.title}
        </h1>

        <p className="font-body text-2xl text-foreground leading-relaxed mb-6">
          {matchedEnding.summary}
        </p>

        {/* Final stats */}
        <div className="flex justify-center gap-8 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-2xl">🚀</span>
            <span className="font-pixel text-xs text-neon-cyan">{stats.ambition}</span>
            <span className="font-body text-sm text-muted-foreground">Ambition</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">🔥</span>
            <span className="font-pixel text-xs text-neon-magenta">{stats.chaos}</span>
            <span className="font-body text-sm text-muted-foreground">Chaos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">💛</span>
            <span className="font-pixel text-xs text-neon-yellow">{stats.relations}</span>
            <span className="font-body text-sm text-muted-foreground">Relations</span>
          </div>
        </div>

        {/* Events count */}
        <p className="font-body text-lg text-muted-foreground">
          {eventHistory.length} memories made · {unlockedPhotos.length} photos collected
        </p>
      </div>

      {/* Photo scrapbook */}
      {unlockedPhotoData.length > 0 && (
        <div className="w-full max-w-2xl mb-8">
          <h3 className="font-pixel text-xs text-accent neon-glow-yellow text-center mb-4 tracking-wider">
            📷 YOUR SCRAPBOOK
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {unlockedPhotoData.map((photo) => (
              <div key={photo.id} className="polaroid-frame">
                <div className="bg-muted aspect-square flex items-center justify-center text-4xl">
                  📸
                </div>
                <p className="font-body text-sm text-background text-center mt-2 px-1">
                  {photo.caption}
                </p>
                <p className="font-pixel text-[7px] text-muted-foreground text-center mt-1">
                  Age {photo.ageTag}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Play again */}
      <button
        onClick={startGame}
        className="pixel-border bg-primary text-primary-foreground font-pixel text-sm px-10 py-4 hover:opacity-80 transition-opacity animate-pulse-glow"
      >
        PLAY AGAIN
      </button>

      <p className="mt-4 font-body text-lg text-muted-foreground">
        Try a different path...
      </p>
    </div>
  );
};

export default EndingScreen;
