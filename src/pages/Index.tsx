import { useGameStore } from '@/store/gameStore';
import TitleScreen from '@/components/game/TitleScreen';
import CityMap from '@/components/game/CityMap';
import StatDisplay from '@/components/game/StatDisplay';
import DialogueScene from '@/components/game/DialogueScene';
import ConvinceParents from '@/components/game/ConvinceParents';
import type { MinigameResult } from '@/types/game';

const Index = () => {
  const { gamePhase, activeMinigame, setLocation, setGamePhase, applyMinigameResult, setActiveMinigame, setFlag, unlockPhoto } = useGameStore();

  const handleDialogueClose = () => {
    setLocation(null);
    setGamePhase('map');
  };

  const handleMinigameComplete = (result: MinigameResult) => {
    applyMinigameResult(result);
    if (result.success && activeMinigame === 'convince_parents') {
      setFlag('open_investment_account');
      unlockPhoto('first_investment');
    }
    if (!result.success && activeMinigame === 'convince_parents') {
      setFlag('needs_more_trust');
    }
  };

  if (gamePhase === 'title') {
    return <TitleScreen />;
  }

  return (
    <div className="relative grain-overlay">
      <StatDisplay />

      {gamePhase === 'map' && <CityMap />}

      {gamePhase === 'dialogue' && (
        <DialogueScene onClose={handleDialogueClose} />
      )}

      {gamePhase === 'minigame' && activeMinigame === 'convince_parents' && (
        <ConvinceParents onComplete={handleMinigameComplete} />
      )}
    </div>
  );
};

export default Index;
