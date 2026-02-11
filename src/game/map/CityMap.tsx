'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore, GameAct } from '@/game/state/useGameStore';
import Home from '@/game/locations/Home';
import School from '@/game/locations/School';
import Bar from '@/game/locations/Bar';
import Office from '@/game/locations/Office';
import Airport from '@/game/locations/Airport';
import Grandma from '@/game/locations/Grandma';
import Sports from '@/game/locations/Sports';
import { EventEngine } from '@/game/engine/EventEngine';
import { getEventById } from '@/game/data/events';

interface LocationMapItem {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
  minAge: number;
  color: string;
}

const LOCATIONS: LocationMapItem[] = [
  {
    id: 'home',
    name: 'Home',
    description: 'Rest & family time',
    component: Home,
    minAge: 0,
    color: 'bg-yellow-100',
  },
  {
    id: 'school',
    name: 'School',
    description: 'Learning & socializing',
    component: School,
    minAge: 7,
    color: 'bg-purple-100',
  },
  {
    id: 'bar',
    name: 'Bar/ Party',
    description: 'Social events',
    component: Bar,
    minAge: 14,
    color: 'bg-red-100',
  },
  {
    id: 'office',
    name: 'Office',
    description: 'Work & investing',
    component: Office,
    minAge: 14,
    color: 'bg-gray-100',
  },
  {
    id: 'airport',
    name: 'Airport',
    description: 'Life decision point',
    component: Airport,
    minAge: 14,
    color: 'bg-blue-100',
  },
  {
    id: 'grandma',
    name: 'Grandma\'s House',
    description: 'Emotional anchor',
    component: Grandma,
    minAge: 8,
    color: 'bg-amber-100',
  },
  {
    id: 'sports',
    name: 'Sports / Outdoor',
    description: 'Physical activity',
    component: Sports,
    minAge: 8,
    color: 'bg-green-100',
  },
];

export function CityMap() {
  const {
    currentLocation,
    setCurrentLocation,
    age,
    act,
    advanceDay,
    day,
    ambition,
    chaos,
    relations,
    activeEventId,
  } = useGameStore();

  const [mounted, setMounted] = useState(false);
  const [showMap, setShowMap] = useState(!currentLocation);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  // Available locations for current age
  const availableLocations = LOCATIONS.filter((loc) => age >= loc.minAge);

  // If a location is selected, render its component
  if (currentLocation) {
    const location = LOCATIONS.find((loc) => loc.id === currentLocation);
    if (location) {
      const LocationComponent = location.component;
      return <LocationComponent />;
    }
  }

  // Show event dialog if active
  if (activeEventId) {
    const event = getEventById(activeEventId);
    if (event && showMap) {
      setShowMap(false);
    }
  }

  // Render the city map
  return (
    <div className="p-6 bg-gradient-to-br from-sky-100 via-blue-50 to-green-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Teo\'s Life</h1>
          <p className="text-lg text-gray-600">
            Age {age} ·{' '}
            {act === GameAct.CHILDHOOD
              ? 'Childhood'
              : act === GameAct.SCHOOL
                ? 'School Years'
                : act === GameAct.TEENAGE
                  ? 'Teenage Years'
                  : 'The End'}{' '}
            · Day {day}
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="text-sm font-semibold text-gray-600">Ambition</div>
            <div className="text-4xl font-bold text-blue-600">{ambition}</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${ambition}%` }}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="text-sm font-semibold text-gray-600">Chaos</div>
            <div className="text-4xl font-bold text-red-600">{chaos}</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-red-600 h-2 rounded-full"
                style={{ width: `${chaos}%` }}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="text-sm font-semibold text-gray-600">Relations</div>
            <div className="text-4xl font-bold text-green-600">{relations}</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${relations}%` }}
              />
            </div>
          </div>
        </div>

        {/* City Map */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Where to?</h2>

          <div className="grid grid-cols-2 gap-4">
            {availableLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => setCurrentLocation(location.id)}
                className={`p-6 rounded-lg shadow hover:shadow-lg transition-all text-left ${location.color} border-2 border-transparent hover:border-gray-400`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {location.name}
                </h3>
                <p className="text-gray-600">{location.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Day Advancement */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <button
            onClick={() => {
              advanceDay();
              // Random chance for event
              if (EventEngine.shouldTriggerRandomEvent()) {
                const randomEvent = EventEngine.getRandomEventForAge(age);
                if (randomEvent) {
                  EventEngine.triggerEvent(randomEvent.id);
                }
              }
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            Pass the Day →
          </button>
          <p className="text-center text-gray-600 text-sm mt-2">
            Eventually you\'ll age up through the story
          </p>
        </div>
      </div>
    </div>
  );
}
