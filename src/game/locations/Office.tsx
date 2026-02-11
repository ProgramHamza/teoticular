'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/game/state/useGameStore';
import { StockMarketGame } from '@/game/minigames/StockMarket';

interface LocationAction {
  id: string;
  label: string;
  description: string;
  onAction: () => void;
}

export default function Office() {
  const {
    age,
    ambition,
    chaos,
    relations,
    updateStats,
    setCurrentLocation,
    investmentUnlocked,
  } = useGameStore();

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const actions: LocationAction[] = [
    {
      id: 'work',
      label: 'Do Your Job',
      description: 'Be productive',
      onAction: () => {
        updateStats(10, -3, 2);
        setMessage(
          'You completed your tasks. Your boss noticed. Promotion is coming. Or maybe not.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'slack',
      label: 'Slack Off',
      description: 'Goof around',
      onAction: () => {
        updateStats(-5, 8, 5);
        setMessage(
          'You made a coworker laugh. The boss walked by but didn\'t say anything. Yet.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'learn',
      label: 'Learn New Skills',
      description: 'Invest in yourself',
      onAction: () => {
        updateStats(15, -2, 3);
        setMessage(
          'You picked up something new. This will definitely help your future. Probably.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'network',
      label: 'Network',
      description: 'Make connections',
      onAction: () => {
        updateStats(5, 2, 12);
        setMessage(
          'You made a business contact. Or maybe you just had coffee with someone nice.'
        );
        setSelectedAction(null);
      },
    },
    ...(investmentUnlocked
      ? [
          {
            id: 'invest',
            label: 'Trade Stocks',
            description: 'Play the market',
            onAction: () => {
              const result = StockMarketGame.play(ambition, chaos);
              updateStats(result.ambitionDelta, result.chaosDelta, result.relationsDelta);
              setMessage(
                result.success
                  ? `You made $${result.profit || 100}! The market rewarded your boldness.`
                  : `You lost $${Math.abs(result.profit || 100)}. Maybe try again tomorrow.`
              );
              setSelectedAction(null);
            },
          },
        ]
      : []),
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-blue-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Office</h1>
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
          <h2 className="text-xl font-semibold mb-3">Another day at the office.</h2>
          <p className="text-gray-700 mb-4">
            The fluorescent lights hum. Your desk is a hurricane. Time moves differently here.
            {investmentUnlocked && ' (And you have access to the trading platform...)'}
          </p>
          {message && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
              <p className="text-blue-900">{message}</p>
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
              className="text-left p-4 bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-gray-600"
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
