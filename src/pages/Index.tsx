import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { covidEvent, australiaEvent } from '@/data/gameData';
import TitleScreen from '@/components/game/TitleScreen';
import CityMap from '@/components/game/CityMap';
import StatDisplay from '@/components/game/StatDisplay';
import DialogueScene from '@/components/game/DialogueScene';
import ConvinceParents from '@/components/game/ConvinceParents';
import SpecialEventScene from '@/components/game/SpecialEventScene';
import type { MinigameResult } from '@/types/game';

const Index = () => {
  const { gamePhase, activeMinigame, age, eventFlags, setLocation, setGamePhase, applyMinigameResult, setActiveMinigame, setFlag, unlockPhoto } = useGameStore();

  // Trigger unavoidable special events when age changes
  useEffect(() => {
    if (gamePhase !== 'map') return;
    if (age === 11 && !eventFlags['covid_done']) {
      useGameStore.setState({ gamePhase: 'special_event', activeSpecialEvent: 'covid_quarantine' });
    } else if (age === 16 && !eventFlags['australia_done']) {
      useGameStore.setState({ gamePhase: 'special_event', activeSpecialEvent: 'australia_trip' });
    }
  }, [age, gamePhase, eventFlags]);

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

  const handleSpecialEventComplete = () => {
    const activeSpecial = useGameStore.getState().activeSpecialEvent;
    if (activeSpecial === 'covid_quarantine') setFlag('covid_done');
    if (activeSpecial === 'australia_trip') setFlag('australia_done');
    useGameStore.setState({ gamePhase: 'map', activeSpecialEvent: null });
  };

  const getSpecialEventMap = () => {
    const activeSpecial = useGameStore.getState().activeSpecialEvent;
    if (activeSpecial === 'covid_quarantine') return covidEvent;
    if (activeSpecial === 'australia_trip') return australiaEvent;
    return null;
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

      {gamePhase === 'special_event' && (() => {
        const eventMap = getSpecialEventMap();
        return eventMap ? (
          <SpecialEventScene eventMap={eventMap} onComplete={handleSpecialEventComplete} />
        ) : null;
      })()}
    </div>
  );
};

export default Index;
