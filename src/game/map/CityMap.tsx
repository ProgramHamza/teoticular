'use client';

import React, { useState, useEffect } from 'react';
import { useGameStore, GameAct } from '@/game/state/useGameStore';
import { InteractiveMap } from '@/game/map/InteractiveMap';
import Home from '@/game/locations/Home';
import School from '@/game/locations/School';
import Bar from '@/game/locations/Bar';
import Office from '@/game/locations/Office';
import Airport from '@/game/locations/Airport';
import Grandma from '@/game/locations/Grandma';
import Sports from '@/game/locations/Sports';
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
    activeEventId,
    ambition,
    chaos,
    relations,
    setAge,
    day,
  } = useGameStore();

  const [isEditingAge, setIsEditingAge] = useState(false);
  const [newAge, setNewAge] = useState(age);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedDays, setElapsedDays] = useState(day);
  const [mounted, setMounted] = useState(false);
  const [showMap, setShowMap] = useState(!currentLocation);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const interval = setInterval(() => {
      if (startTime) {
        const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedDays(secondsElapsed);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAge(Number(e.target.value));
  };

  const handleAgeSubmit = () => {
    if (newAge >= 0 && newAge <= 18) {
      setAge(newAge);
    } else {
      alert('Please enter a valid age between 0 and 18.');
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  if (currentLocation) {
    const location = LOCATIONS.find((loc) => loc.id === currentLocation);
    if (location) {
      const LocationComponent = location.component;
      return <LocationComponent />;
    }
  }

  if (activeEventId && showMap) {
    setShowMap(false);
  }

  return (
    <div className="p-6 bg-gradient-to-br from-sky-100 via-blue-50 to-green-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Teo's Life</h1>
          <p className="text-lg text-gray-600">
            Make choices. Explore locations. Watch your story unfold.
          </p>
        </div>

        {/* Interactive Map */}
        <InteractiveMap />

        {/* Quick Stats Sidebar */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-600">
            <div className="text-sm font-semibold text-gray-600">Ambition</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">{ambition}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-red-600">
            <div className="text-sm font-semibold text-gray-600">Chaos</div>
            <div className="text-3xl font-bold text-red-600 mt-2">{chaos}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-green-600">
            <div className="text-sm font-semibold text-gray-600">Relations</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{relations}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-purple-600">
            <div className="text-sm font-semibold text-gray-600">Age</div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                value={newAge}
                onChange={handleAgeChange}
                className="w-16 border border-gray-300 rounded p-1 text-center"
                min="0"
                max="18"
              />
              <button
                onClick={handleAgeSubmit}
                className="bg-blue-500 text-white py-1 px-2 rounded"
              >
                Set
              </button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-yellow-600">
            <div className="text-sm font-semibold text-gray-600">Day</div>
            <div className="text-3xl font-bold text-yellow-600 mt-2">{elapsedDays}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
