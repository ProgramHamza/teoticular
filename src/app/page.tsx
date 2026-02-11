'use client';

import React from 'react';
import Link from 'next/link';
import { useGameStore, GameAct } from '@/game/state/useGameStore';

export default function Page() {
  const resetGame = useGameStore((state: any) => state.resetGame);
  const setAct = useGameStore((state: any) => state.setAct);

  const handleStartGame = () => {
    resetGame();
    setAct(GameAct.CHILDHOOD);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        {/* Title */}
        <h1 className="text-7xl font-black text-white mb-4">TEO'S LIFE</h1>

        {/* Subtitle */}
        <p className="text-2xl text-blue-100 mb-8">
          A Narrative-Driven Life Simulation
        </p>

        {/* Description */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl mb-8 border border-white border-opacity-20">
          <p className="text-lg text-white mb-6 leading-relaxed">
            Follow Teo from birth to age 18. Make decisions. Play mini-games. Unlock endings.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <div className="text-3xl font-bold text-blue-200">3</div>
              <div className="text-sm text-blue-100">Core Stats</div>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <div className="text-3xl font-bold text-purple-200">7</div>
              <div className="text-sm text-purple-100">Locations</div>
            </div>
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <div className="text-3xl font-bold text-pink-200">8+</div>
              <div className="text-sm text-pink-100">Endings</div>
            </div>
          </div>

          <p className="text-sm text-blue-100">
            Your choices matter. Stats are tracked. Every decision shapes Teo's destiny.
          </p>
        </div>

        {/* Start Button */}
        <Link href="/game">
          <button
            onClick={handleStartGame}
            className="w-full bg-white text-purple-600 hover:bg-blue-50 font-black py-4 px-8 rounded-xl text-2xl mb-4 transition-all hover:scale-105 shadow-2xl"
          >
            Start Game
          </button>
        </Link>

        {/* Info */}
        <p className="text-white text-sm opacity-75">
          Made with Next.js · TypeScript · React · TailwindCSS
        </p>
      </div>
    </div>
  );
}
