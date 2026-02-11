'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/game/state/useGameStore';

interface LocationAction {
  id: string;
  label: string;
  description: string;
  onAction: () => void;
}

export default function Grandma() {
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
      id: 'dinner',
      label: 'Have Dinner',
      description: 'She made your favorite',
      onAction: () => {
        updateStats(2, -15, 15);
        setMessage(
          'The food is incredible. She asks about your life. You feel understood. It\'s weird but nice.'
        );
        unlockPhoto('grandma-visit');
        setSelectedAction(null);
      },
    },
    {
      id: 'stories',
      label: 'Listen to Stories',
      description: 'Learn about the past',
      onAction: () => {
        updateStats(5, -10, 12);
        setMessage(
          'Grandma told wild stories from her youth. She was crazier than you. This is comforting.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'advice',
      label: 'Ask for Advice',
      description: 'Wise words',
      onAction: () => {
        updateStats(8, -8, 10);
        setMessage(
          'She gave you real advice. Not the preachy kind. The kind that makes sense. Somehow.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'help',
      label: 'Help Around the House',
      description: 'Be useful',
      onAction: () => {
        updateStats(5, -5, 12);
        setMessage(
          'You fixed something. Grandma was impressed. Your parents will never know, and that\'s okay.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'laugh',
      label: 'Laugh Together',
      description: 'Pure connection',
      onAction: () => {
        updateStats(0, -12, 18);
        setMessage(
          'You both laughed until you cried. The kind of laugh that heals. Tomorrow you\'ll remember this.'
        );
        setSelectedAction(null);
      },
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Grandma\'s House
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
          <h2 className="text-xl font-semibold mb-3">
            You\'re at Grandma\'s house.
          </h2>
          <p className="text-gray-700 mb-4">
            The smell of home cooking fills the air. Grandma smiles when she sees
            you. No questions. No judgment. Just... Grandma.
          </p>
          {message && (
            <div className="bg-amber-50 border-l-4 border-amber-600 p-3">
              <p className="text-amber-900">{message}</p>
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
              className="text-left p-4 bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-amber-600"
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
