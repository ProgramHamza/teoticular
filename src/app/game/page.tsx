'use client';

import React, { useEffect } from 'react';
import { useGameStore, GameAct } from '@/game/state/useGameStore';
import { CityMap } from '@/game/map/CityMap';
import { determineEnding } from '@/game/data/endings';
import { getPhotoById } from '@/game/data/photos';

export default function GamePage() {
  const {
    age,
    act,
    ambition,
    chaos,
    relations,
    unlockedPhotos,
    setAge,
    setAct,
    unlockEnding,
    resetGame,
  } = useGameStore();

  // Initialize game on mount
  useEffect(() => {
    if (age === 0 && act === GameAct.CHILDHOOD) {
      // Game already initialized
      return;
    }
  }, []);

  // Handle end game
  const handleEndGame = () => {
    const ending = determineEnding(
      ambition,
      chaos,
      relations,
      undefined,
      []
    );
    unlockEnding(ending.id);

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-2xl">
          {/* Ending Title */}
          <h1 className="text-6xl font-black text-white text-center mb-8">
            {ending.title}
          </h1>

          {/* Stats Summary */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl mb-8 border border-white border-opacity-20">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-200">{ambition}</div>
                <div className="text-sm text-blue-100">Ambition</div>
              </div>
              <div className="bg-red-500 bg-opacity-20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-200">{chaos}</div>
                <div className="text-sm text-red-100">Chaos</div>
              </div>
              <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-200">{relations}</div>
                <div className="text-sm text-green-100">Relations</div>
              </div>
            </div>

            {/* Ending Summary */}
            <p className="text-white text-lg mb-8 leading-relaxed">
              {ending.summary}
            </p>

            {/* Unlocked Photos Gallery */}
            {unlockedPhotos.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Photos from Your Life
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {unlockedPhotos.map((photoId: string) => {
                    const photo = getPhotoById(photoId);
                    return (
                      <div
                        key={photoId}
                        className="bg-white bg-opacity-10 p-3 rounded-lg"
                      >
                        <div className="text-sm font-semibold text-white">
                          {photo?.title}
                        </div>
                        <div className="text-xs text-gray-300">
                          Age {photo?.age}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Restart Button */}
          <button
            onClick={() => {
              resetGame();
              window.location.href = '/';
            }}
            className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-all"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  };

  // If age is 18, show ending
  if (age >= 18) {
    return handleEndGame();
  }

  // Otherwise show the game map
  return <CityMap />;
}
