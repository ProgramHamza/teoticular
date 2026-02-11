'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/game/state/useGameStore';

interface LocationAction {
  id: string;
  label: string;
  description: string;
  onAction: () => void;
}

export default function Sports() {
  const {
    age,
    ambition,
    chaos,
    relations,
    updateStats,
    setCurrentLocation,
    unlockPhoto,
  } = useGameStore();

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const actions: LocationAction[] = [
    {
      id: 'run',
      label: 'Go for a Run',
      description: 'Clear your mind',
      onAction: () => {
        updateStats(5, -8, 2);
        setMessage(
          'Your legs hurt. Your lungs hurt. You feel alive. That counts as exercise, right?'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'team',
      label: 'Join Team Sport',
      description: 'Camaraderie',
      onAction: () => {
        updateStats(3, -3, 12);
        setMessage(
          'Team sport was chaos. Organized chaos. Everyone sweating equally. Beautiful.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'win',
      label: 'Try to Win',
      description: 'Victory or defeat',
      onAction: () => {
        if (ambition > 50) {
          updateStats(15, 5, 5);
          setMessage(
            'You won. Or at least, you didn\'t lose spectacularly. Your competitive side is showing.'
          );
          unlockPhoto('sports-victory');
        } else {
          updateStats(3, 5, 3);
          setMessage(
            'You did okay. Not great, but also not humiliating. Victory for you.'
          );
        }
        setSelectedAction(null);
      },
    },
    {
      id: 'chill',
      label: 'Just Hang Out',
      description: 'No pressure',
      onAction: () => {
        updateStats(0, -2, 8);
        setMessage(
          'You shot hoops with friends. Nobody counted. Nobody cared. It was perfect.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'push',
      label: 'Push Your Limits',
      description: 'Test yourself',
      onAction: () => {
        if (Math.random() > 0.4) {
          updateStats(12, 5, 3);
          setMessage(
            'You surprised yourself. Maybe you\'re stronger than you thought.'
          );
        } else {
          updateStats(-3, 8, 0);
          setMessage(
            'You overestimated yourself. Your muscles are yelling at you now.'
          );
        }
        setSelectedAction(null);
      },
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-green-100 to-emerald-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sports / Outdoor
          </h1>
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
          <h2 className="text-xl font-semibold mb-3">The great outdoors.</h2>
          <p className="text-gray-700 mb-4">
            Fresh air. Open space. Your body hasn\'t moved in a while, but it
            remembers. Time to wake it up.
          </p>
          {message && (
            <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3">
              <p className="text-emerald-900">{message}</p>
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
              className="text-left p-4 bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-emerald-600"
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
