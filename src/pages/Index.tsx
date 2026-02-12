import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { covidEvent, australiaEvent } from '@/data/gameData';
import TitleScreen from '@/components/game/TitleScreen';
import CityMap from '@/components/game/CityMap';
import StatDisplay from '@/components/game/StatDisplay';
import DialogueScene from '@/components/game/DialogueScene';
import ConvinceParents from '@/components/game/ConvinceParents';
import StockSimulator from '@/components/game/StockSimulator';
import FlappyTeo from '@/components/game/FlappyTeo';
import CleanupParty from '@/components/game/CleanupParty';
import RhythmSpeak from '@/components/game/RhythmSpeak';
import BalanceWalk from '@/components/game/BalanceWalk';
import SpecialEventScene from '@/components/game/SpecialEventScene';
import EndingScreen from '@/components/game/EndingScreen';
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
    // Handle specific minigame outcomes
    if (activeMinigame === 'convince_parents') {
      if (result.success) {
        setFlag('open_investment_account');
        unlockPhoto('first_investment');
      } else {
        setFlag('needs_more_trust');
      }
    }
    if (activeMinigame === 'balance_walk' && result.success) {
      unlockPhoto('first_steps');
    }
    if (activeMinigame === 'rhythm_speak' && result.success) {
      unlockPhoto('first_word');
    }
    applyMinigameResult(result);
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

  if (gamePhase === 'ending') {
    return <EndingScreen />;
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

      {gamePhase === 'minigame' && activeMinigame === 'stock_simulator' && (
        <StockSimulator onComplete={handleMinigameComplete} />
      )}

      {gamePhase === 'minigame' && activeMinigame === 'flappy_teo' && (
        <FlappyTeo onComplete={handleMinigameComplete} />
      )}

      {gamePhase === 'minigame' && activeMinigame === 'cleanup_party' && (
        <CleanupParty onComplete={handleMinigameComplete} />
      )}

      {gamePhase === 'minigame' && activeMinigame === 'rhythm_speak' && (
        <RhythmSpeak onComplete={handleMinigameComplete} />
      )}

      {gamePhase === 'minigame' && activeMinigame === 'balance_walk' && (
        <BalanceWalk onComplete={handleMinigameComplete} />
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
