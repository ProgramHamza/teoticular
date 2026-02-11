'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/game/state/useGameStore';
import { ConvinceParentsGame } from '@/game/minigames/ConvinceParents';
import { EventEngine } from '@/game/engine/EventEngine';

interface LocationAction {
  id: string;
  label: string;
  description: string;
  onAction: () => void;
}

export default function School() {
  const {
    age,
    ambition,
    chaos,
    relations,
    updateStats,
    setCurrentLocation,
    investmentUnlocked,
    setInvestmentUnlocked,
  } = useGameStore();

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const actions: LocationAction[] = [
    {
      id: 'attend',
      label: 'Attend Class',
      description: 'Focus on learning',
      onAction: () => {
        updateStats(8, -5, 2);
        setMessage(
          'You paid attention today. The teacher seemed impressed, or at least not disappointed.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'skip',
      label: 'Skip Class',
      description: 'Risk it for a biscuit',
      onAction: () => {
        if (Math.random() > 0.5) {
          updateStats(-5, 10, 5);
          setMessage('You got away with it. The thrill was almost worth it.');
        } else {
          updateStats(-10, 5, -10);
          setMessage(
            'You got caught. Now you have detention AND more homework.'
          );
        }
        setSelectedAction(null);
      },
    },
    {
      id: 'social',
      label: 'Hang with Friends',
      description: 'Build relationships',
      onAction: () => {
        updateStats(0, 5, 12);
        setMessage(
          'You made someone laugh today. They\'ll remember it. So will you.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'debate',
      label: 'Debate in Class',
      description: 'Show your intellect',
      onAction: () => {
        if (ambition > 50) {
          updateStats(15, 8, -5);
          setMessage(
            'You made a compelling argument. People looked impressed. Or annoyed. Probably both.'
          );
        } else {
          updateStats(5, 10, 2);
          setMessage('You tried to argue. It was... a moment.');
        }
        setSelectedAction(null);
      },
    },
    {
      id: 'parents-meeting',
      label: 'Convince Parents About Investing',
      description: 'Unlock stock market feature',
      onAction: () => {
        const result = ConvinceParentsGame.play(ambition, relations);
        updateStats(result.ambitionDelta, result.chaosDelta, result.relationsDelta);

        if (result.success) {
          setInvestmentUnlocked(true);
          setMessage(
            'Surprisingly, your argument worked. Parents said you could invest. This feels like a mistake.'
          );
        } else {
          setMessage(
            'Your parents shut down the idea immediately. Maybe try again when they\'re in a better mood.'
          );
        }
        setSelectedAction(null);
      },
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-purple-50 to-blue-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">School</h1>
          <p className="text-gray-600">Age {age}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm font-semibold text-gray-600">Ambition</div>
            <div className="text-3xl font-bold text-blue-600">{ambition}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm font-semibold text-gray-600">Chaos</div>
            <div className="text-3xl font-bold text-red-600">{chaos}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm font-semibold text-gray-600">Relations</div>
            <div className="text-3xl font-bold text-green-600">{relations}</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-3">Another day at school.</h2>
          <p className="text-gray-700 mb-4">
            {age <= 8
              ? 'Recess is coming. That\'s all that matters right now.'
              : age <= 12
                ? 'The teacher is explaining something. You\'re either learning or daydreaming.'
                : 'Everyone looks tired. You look tired. Even the teachers look tired.'}
          </p>
          {message && (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-3">
              <p className="text-purple-900">{message}</p>
            </div>
          )}
          {investmentUnlocked && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3 mt-3">
              <p className="text-green-900 font-semibold">
                ✓ Investment unlocked! You can now trade on the stock market.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => {
                setSelectedAction(action.id);
                action.onAction();
              }}
              className="text-left p-4 bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-purple-500"
            >
              <div className="font-semibold text-gray-800">{action.label}</div>
              <div className="text-sm text-gray-600">{action.description}</div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={() => setCurrentLocation('')}
            className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
          >
            ← Back to Map
          </button>
        </div>
      </div>
    </div>
  );
}
