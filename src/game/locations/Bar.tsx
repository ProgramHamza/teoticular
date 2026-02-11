'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/game/state/useGameStore';
import { CleanupAfterPartyGame } from '@/game/minigames/CleanupAfterParty';

interface LocationAction {
  id: string;
  label: string;
  description: string;
  onAction: () => void;
  minAge?: number;
}

export default function Bar() {
  const {
    age,
    ambition,
    chaos,
    relations,
    updateStats,
    setCurrentLocation,
    addParentalSuspicion,
  } = useGameStore();

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const actions: LocationAction[] = [
    {
      id: 'hang',
      label: 'Grab a Drink',
      description: 'Social night out',
      minAge: 15,
      onAction: () => {
        updateStats(-3, 12, 8);
        addParentalSuspicion(8);
        setMessage(
          'The bartender probably shouldn\'t have served you, but here we are. You\'re having fun.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'party',
      label: 'Party Hard',
      description: 'Maximum chaos',
      minAge: 15,
      onAction: () => {
        updateStats(-8, 20, 15);
        addParentalSuspicion(25);
        setMessage(
          'Bad decisions were made. Great memories were created. Or so you\'ll tell yourself tomorrow.'
        );
        setSelectedAction(null);

        // Trigger cleanup minigame after party
        if (Math.random() > 0.3) {
          setTimeout(() => {
            setMessage(
              'Oh no... your place is a disaster. Parents come home in 10 minutes!'
            );
          }, 2000);
        }
      },
    },
    {
      id: 'quiet',
      label: 'Quiet Night',
      description: 'Just vibes',
      onAction: () => {
        updateStats(2, -3, 10);
        setMessage(
          'You sat in the corner, watched people, and slowly nursed a single drink. Pleasant.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'flirt',
      label: 'Flirt & Make Friends',
      description: 'Boost your charm',
      minAge: 14,
      onAction: () => {
        if (relations > 50) {
          updateStats(0, 8, 12);
          addParentalSuspicion(5);
          setMessage('You charmed someone. They smiled back. Is this love? Probably not.');
        } else {
          updateStats(-5, 10, 3);
          addParentalSuspicion(3);
          setMessage(
            'You tried your pickup lines. They didn\'t work. But you got points for confidence.'
          );
        }
        setSelectedAction(null);
      },
    },
    {
      id: 'cleanup',
      label: 'Clean Up the Mess',
      description: 'Aftermath Management',
      onAction: () => {
        const result = CleanupAfterPartyGame.play(chaos);
        updateStats(result.ambitionDelta, result.chaosDelta, result.relationsDelta);

        if (result.success) {
          setMessage(
            'You cleaned it all up just in time. Parents never noticed a thing. Or did they?'
          );
        } else {
          setMessage(
            'You cleaned... something. Hopefully enough. The smell might be permanent though.'
          );
        }
        setSelectedAction(null);
      },
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-red-50 to-yellow-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Bar / Party</h1>
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
          <h2 className="text-xl font-semibold mb-3">It\'s getting late.</h2>
          <p className="text-gray-700 mb-4">
            The bar is packed. Music is loud. Decisions are being made.
            {age < 15 &&
              ' (You\'re a bit young for this... are you sneaking out?)'}
          </p>
          {message && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3">
              <p className="text-red-900">{message}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 gap-3">
          {actions
            .filter((action) => !action.minAge || age >= action.minAge)
            .map((action) => (
              <button
                key={action.id}
                onClick={() => {
                  setSelectedAction(action.id);
                  action.onAction();
                }}
                className="text-left p-4 bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-red-500"
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
