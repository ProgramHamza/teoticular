'use client';

import React, { useState } from 'react';
import { useGameStore } from '@/game/state/useGameStore';
import { EventEngine } from '@/game/engine/EventEngine';

interface LocationAction {
  id: string;
  label: string;
  description: string;
  onAction: () => void;
}

export default function Airport() {
  const {
    age,
    ambition,
    chaos,
    relations,
    updateStats,
    setCurrentLocation,
    startEvent,
  } = useGameStore();

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const actions: LocationAction[] = [
    {
      id: 'australia',
      label: 'Buy a Ticket to Australia',
      description: 'One-way ticket to freedom',
      onAction: () => {
        updateStats(20, 20, -20);
        setMessage(
          'You booked the flight. Your parents got the email. Everything changes now.'
        );
        startEvent('airport-australia');
        setSelectedAction(null);
      },
    },
    {
      id: 'consider',
      label: 'Walk Around & Think',
      description: 'Maybe later',
      onAction: () => {
        updateStats(5, -5, 0);
        setMessage(
          'The destination boards are hypnotic. All those places... All those possibilities. But not today.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'exchange',
      label: 'Sign Up for Exchange Program',
      description: 'Legal way to travel',
      onAction: () => {
        updateStats(10, 5, 5);
        setMessage(
          'You submitted the exchange application. You\'ll either regret this or celebrate it forever.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'internship',
      label: 'Check Internship Opportunities',
      description: 'Work abroad',
      onAction: () => {
        if (ambition > 60) {
          updateStats(15, 2, 5);
          setMessage(
            'Several companies are hiring. Your career is about to start somewhere far away.'
          );
        } else {
          updateStats(3, 0, 2);
          setMessage('The postings look interesting, but also scary.');
        }
        setSelectedAction(null);
      },
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 to-cyan-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Airport</h1>
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
            The world is waiting.
          </h2>
          <p className="text-gray-700 mb-4">
            You\'re standing in the airport. Planes are taking off and landing.
            Every destination board shows a life you could live. Which one is yours?
          </p>
          {message && (
            <div className="bg-cyan-50 border-l-4 border-cyan-500 p-3">
              <p className="text-cyan-900">{message}</p>
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
              className="text-left p-4 bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-cyan-500"
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
