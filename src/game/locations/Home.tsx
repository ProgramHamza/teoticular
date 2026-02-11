'use client';

import React, { useState } from 'react';
import { useGameStore, GameAct } from '@/game/state/useGameStore';
import { EventEngine } from '@/game/engine/EventEngine';
import { getEventById } from '@/game/data/events';

interface LocationAction {
  id: string;
  label: string;
  description: string;
  onAction: () => void;
}

export default function Home() {
  const {
    age,
    act,
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
      id: 'rest',
      label: 'Rest & Sleep',
      description: 'Reduce stress and chaos',
      onAction: () => {
        updateStats(0, -15, 5);
        setMessage(
          'You took a nap. Everything seems less terrible now. Your parents are proud.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'study',
      label: 'Study Solo',
      description: 'Focus on academics',
      onAction: () => {
        updateStats(12, -5, -3);
        setMessage('You cracked open a textbook. Your future self thanks you.');
        setSelectedAction(null);
      },
    },
    {
      id: 'conflict',
      label: 'Pick a Fight with Parents',
      description: 'Increase chaos, damage relations',
      onAction: () => {
        updateStats(-5, 20, -15);
        setMessage(
          'You yelled about something stupid. Everyone regrets it now.'
        );
        setSelectedAction(null);
      },
    },
    {
      id: 'sneak',
      label: 'Sneak Out',
      description: 'Risky, but fun',
      onAction: () => {
        if (Math.random() > 0.4) {
          updateStats(3, 10, 5);
          setMessage('You made it out without them noticing. Adventure awaits!');
        } else {
          updateStats(-10, 15, -10);
          setMessage(
            'You got caught. The lecture will haunt you for days.'
          );
        }
        setSelectedAction(null);
      },
    },
    {
      id: 'dinner',
      label: 'Have Dinner with Family',
      description: 'Connect with parents',
      onAction: () => {
        updateStats(5, -8, 15);
        setMessage(
          'The meal was nice. Your parents asked about your life. You answered honestly, mostly.'
        );
        setSelectedAction(null);
        if (age >= 14 && Math.random() > 0.7) {
          const event = EventEngine.getRandomEventForAge(age);
          if (event) {
            EventEngine.triggerEvent(event.id);
          }
        }
      },
    },
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-yellow-50 to-blue-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Home</h1>
          <p className="text-gray-600">
            Age {age} · Act: {act === GameAct.CHILDHOOD ? 'Childhood' : 
              act === GameAct.SCHOOL ? 'School Years' : 
              act === GameAct.TEENAGE ? 'Teenage Years' : 'Ending'}
          </p>
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
          <h2 className="text-xl font-semibold mb-3">You're at home.</h2>
          <p className="text-gray-700 mb-4">
            {age <= 6
              ? 'Your parents are watching. Everything you do seems important to them.'
              : age <= 12
                ? 'Your room is messy. There\'s homework somewhere on your desk.'
                : 'Your parents are downstairs. You can hear the TV. Should you go down?'}
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
              className="text-left p-4 bg-white rounded-lg shadow hover:shadow-md hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-blue-500"
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
