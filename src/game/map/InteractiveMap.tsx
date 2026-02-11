'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useGameStore, GameAct } from '@/game/state/useGameStore';

interface MapLocation {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  minAge: number;
  color: string;
  emoji: string;
}

const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'home',
    name: 'Home',
    description: 'Rest & family',
    x: 2,
    y: 2,
    minAge: 0,
    color: 'from-yellow-400 to-yellow-600',
    emoji: '🏠',
  },
  {
    id: 'school',
    name: 'School',
    description: 'Learning',
    x: 4,
    y: 1,
    minAge: 7,
    color: 'from-purple-400 to-purple-600',
    emoji: '🎓',
  },
  {
    id: 'office',
    name: 'Office',
    description: 'Work',
    x: 5,
    y: 3,
    minAge: 14,
    color: 'from-gray-400 to-gray-600',
    emoji: '🏢',
  },
  {
    id: 'bar',
    name: 'Bar / Party',
    description: 'Social',
    x: 1,
    y: 4,
    minAge: 14,
    color: 'from-red-400 to-red-600',
    emoji: '🍻',
  },
  {
    id: 'airport',
    name: 'Airport',
    description: 'Travel',
    x: 5,
    y: 0,
    minAge: 14,
    color: 'from-blue-400 to-blue-600',
    emoji: '✈️',
  },
  {
    id: 'grandma',
    name: 'Grandma\'s House',
    description: 'Family',
    x: 0,
    y: 1,
    minAge: 8,
    color: 'from-amber-400 to-amber-600',
    emoji: '👵',
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Activity',
    x: 3,
    y: 4,
    minAge: 8,
    color: 'from-green-400 to-green-600',
    emoji: '⚽',
  },
];

const MAP_WIDTH = 6;
const MAP_HEIGHT = 5;
const TILE_SIZE = 60;

export function InteractiveMap() {
  const {
    mapPositionX,
    mapPositionY,
    age,
    day,
    act,
    ambition,
    chaos,
    relations,
    setMapPosition,
    setCurrentLocation,
    advanceDays,
    autoAdvanceEnabled,
    daysPerLocation,
  } = useGameStore();

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [visitingLocation, setVisitingLocation] = useState(false);

  // Get available locations
  const availableLocations = MAP_LOCATIONS.filter((loc) => age >= loc.minAge);

  // Keyboard movement handler
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      let newX = mapPositionX;
      let newY = mapPositionY;

      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          newY = Math.max(0, newY - 1);
          e.preventDefault();
          break;
        case 'arrowdown':
        case 's':
          newY = Math.min(MAP_HEIGHT - 1, newY + 1);
          e.preventDefault();
          break;
        case 'arrowleft':
        case 'a':
          newX = Math.max(0, newX - 1);
          e.preventDefault();
          break;
        case 'arrowright':
        case 'd':
          newX = Math.min(MAP_WIDTH - 1, newX + 1);
          e.preventDefault();
          break;
        default:
          return;
      }

      setMapPosition(newX, newY);
      checkLocationAtPosition(newX, newY);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mapPositionX, mapPositionY, setMapPosition]);

  const checkLocationAtPosition = useCallback(
    (x: number, y: number) => {
      const location = availableLocations.find((loc) => loc.x === x && loc.y === y);
      if (location) {
        setSelectedLocation(location.id);
        setFeedback(`Found ${location.name}! Press Enter to enter.`);
      } else {
        setSelectedLocation(null);
        setFeedback('');
      }
    },
    [availableLocations]
  );

  // Check location on position change
  useEffect(() => {
    checkLocationAtPosition(mapPositionX, mapPositionY);
  }, [mapPositionX, mapPositionY, checkLocationAtPosition]);

  // Handle location selection
  const handleEnterLocation = () => {
    if (selectedLocation) {
      setVisitingLocation(true);
      setCurrentLocation(selectedLocation);
      
      // Auto-advance days if enabled
      if (autoAdvanceEnabled) {
        advanceDays(daysPerLocation);
      }
    }
  };

  // Handle clicking on a tile
  const handleTileClick = (x: number, y: number) => {
    setMapPosition(x, y);
  };

  const currentActName =
    act === GameAct.CHILDHOOD
      ? 'Childhood'
      : act === GameAct.SCHOOL
        ? 'School Years'
        : act === GameAct.TEENAGE
          ? 'Teenage Years'
          : 'The End';

  return (
    <div className="w-full">
      {/* Header with stats */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">City Map</h2>
            <p className="text-gray-600">Age {age} · {currentActName} · Day {day}</p>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>📍 Position: ({mapPositionX}, {mapPositionY})</p>
            <p className="text-xs mt-1">Use arrow keys or WASD to move</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-3 rounded-lg text-center">
            <div className="text-xs font-semibold">Ambition</div>
            <div className="text-2xl font-bold">{ambition}</div>
          </div>
          <div className="bg-gradient-to-r from-red-400 to-red-600 text-white p-3 rounded-lg text-center">
            <div className="text-xs font-semibold">Chaos</div>
            <div className="text-2xl font-bold">{chaos}</div>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-3 rounded-lg text-center">
            <div className="text-xs font-semibold">Relations</div>
            <div className="text-2xl font-bold">{relations}</div>
          </div>
        </div>
      </div>

      {/* Map Grid */}
      <div className="bg-gradient-to-b from-sky-200 to-green-200 p-6 rounded-lg shadow-lg mb-6 border-4 border-gray-400 game-boy-style">
        <div
          className="inline-block border-2 border-gray-800 bg-gray-100"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${MAP_WIDTH}, ${TILE_SIZE}px)`,
            gap: '4px',
            padding: '8px',
            backgroundColor: '#88cc88',
          }}
        >
          {Array.from({ length: MAP_HEIGHT }).map((_, y) =>
            Array.from({ length: MAP_WIDTH }).map((_, x) => {
              const location = availableLocations.find((loc) => loc.x === x && loc.y === y);
              const isPlayerHere = mapPositionX === x && mapPositionY === y;
              const isAvailable = availableLocations.some((loc) => loc.x === x && loc.y === y);

              return (
                <button
                  key={`${x}-${y}`}
                  onClick={() => handleTileClick(x, y)}
                  className={`w-full h-full rounded transition-all border-2 flex flex-col items-center justify-center cursor-pointer text-center text-xs font-bold ${
                    isPlayerHere
                      ? 'ring-4 ring-yellow-400 border-yellow-500 scale-105'
                      : 'border-gray-300'
                  } ${
                    location
                      ? `bg-gradient-to-br ${location.color} text-white shadow-lg hover:shadow-xl`
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  disabled={!isAvailable}
                >
                  {isPlayerHere ? (
                    <span className="text-2xl animate-bounce">🧑</span>
                  ) : location ? (
                    <>
                      <span className="text-xl">{location.emoji}</span>
                      <span className="text-xs mt-1 leading-tight">{location.name}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">.</span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Location Info & Action */}
      {selectedLocation && (
        <div className="bg-white border-4 border-gray-400 p-4 rounded-lg shadow-lg mb-6">
          {(() => {
            const location = MAP_LOCATIONS.find((loc) => loc.id === selectedLocation);
            return (
              <>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      {location?.emoji} {location?.name}
                    </h3>
                    <p className="text-gray-600">{location?.description}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {autoAdvanceEnabled
                    ? `Visiting will advance ${daysPerLocation} days`
                    : 'Visiting will let you interact with this location'}
                </p>
                {feedback && (
                  <p className="text-sm font-semibold text-blue-600 mb-3">{feedback}</p>
                )}
                <button
                  onClick={handleEnterLocation}
                  className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
                >
                  Enter {location?.name} (Press Enter)
                </button>
              </>
            );
          })()}
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-100 border-2 border-blue-300 p-4 rounded-lg text-sm text-gray-700">
        <p className="font-bold mb-2">💡 How to Play:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Use <strong>arrow keys</strong> or <strong>WASD</strong> to navigate</li>
          <li>Click on tiles to jump to that location</li>
          <li>Days automatically advance as you visit locations</li>
          <li>Unlock new locations as you age up</li>
        </ul>
      </div>
    </div>
  );
}
