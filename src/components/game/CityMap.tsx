import { useGameStore } from '@/store/gameStore';
import { locations } from '@/data/gameData';

const CityMap = () => {
  const { age, eventFlags, setLocation, setGamePhase } = useGameStore();

  const isUnlocked = (loc: typeof locations[0]) => {
    if (age < loc.unlockAge) return false;
    if (loc.unlockFlag && !eventFlags[loc.unlockFlag]) return false;
    return true;
  };

  const handleLocationClick = (locId: string) => {
    setLocation(locId);
    setGamePhase('dialogue');
  };

  return (
    <div className="relative w-full h-screen bg-card overflow-hidden scanlines">
      {/* Grid background */}
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
        <h2 className="font-pixel text-lg text-primary neon-glow-cyan tracking-wider">
          TEO'S CITY
        </h2>
        <p className="font-body text-xl text-muted-foreground mt-1">
          Choose where to go...
        </p>
      </div>

      {/* Location nodes */}
      {locations.map((loc) => {
        const unlocked = isUnlocked(loc);
        return (
          <button
            key={loc.id}
            onClick={() => unlocked && handleLocationClick(loc.id)}
            disabled={!unlocked}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${
              unlocked
                ? 'cursor-pointer hover:scale-110'
                : 'cursor-not-allowed opacity-30'
            }`}
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          >
            {/* Glow ring */}
            {unlocked && (
              <div className="absolute inset-0 -m-2 rounded-full animate-pulse-glow" />
            )}

            {/* Node */}
            <div
              className={`pixel-border bg-card w-16 h-16 flex items-center justify-center text-2xl transition-all ${
                unlocked ? 'hover:bg-muted' : ''
              }`}
            >
              {unlocked ? loc.icon : '🔒'}
            </div>

            {/* Label */}
            <span
              className={`block mt-1 font-pixel text-[8px] text-center tracking-wide ${
                unlocked ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {loc.name}
            </span>

            {/* Unlock hint */}
            {!unlocked && (
              <span className="block font-body text-xs text-muted-foreground">
                Age {loc.unlockAge}+
              </span>
            )}
          </button>
        );
      })}

      {/* Decorative pixel road paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
        <line x1="50%" y1="65%" x2="25%" y2="35%" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="8 4" />
        <line x1="50%" y1="65%" x2="75%" y2="30%" stroke="hsl(var(--secondary))" strokeWidth="2" strokeDasharray="8 4" />
        <line x1="50%" y1="65%" x2="80%" y2="65%" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="8 4" />
        <line x1="50%" y1="65%" x2="35%" y2="80%" stroke="hsl(var(--pastel-pink))" strokeWidth="2" strokeDasharray="8 4" />
        <line x1="50%" y1="65%" x2="15%" y2="70%" stroke="hsl(var(--neon-cyan))" strokeWidth="2" strokeDasharray="8 4" />
        <line x1="25%" y1="35%" x2="60%" y2="20%" stroke="hsl(var(--pastel-mint))" strokeWidth="2" strokeDasharray="8 4" />
      </svg>
    </div>
  );
};

export default CityMap;
