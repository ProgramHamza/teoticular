# Quick Start Guide

## 🚀 Installation & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Start Playing!
- Click "Start Game" on the title screen
- Navigate through locations using the city map
- Make decisions and earn stats
- Reach age 18 for your personalized ending

---

## 🎮 Game Controls

### Navigation
- **Click location buttons** to visit a location
- **Click back arrow** (← Back to Map) to return to the city map
- **"Pass the Day →" button** advances the game and can trigger random events

### Actions
- **Click action buttons** to perform activities
- Each action has a description and will modify your stats
- Messages appear showing the outcome of your choice

### Stats
- **Ambition** (Blue): Drive and career focus
- **Chaos** (Red): Recklessness and unpredictability
- **Relations** (Green): Social bonds and relationships

---

## 🎯 Key Features

### 3 Acts of Life
1. **Childhood** (Ages 0-6): Tutorial progression
2. **School Years** (Ages 7-12): First social branching
3. **Teenage Years** (Ages 13-18): Full gameplay with 7 locations

### 7 Game Locations (Teen Years)
- **Home**: Family and rest
- **School**: Education and socializing
- **Bar/Party**: Social events and chaos
- **Office**: Work and investing
- **Airport**: Major life decisions
- **Grandma's House**: Emotional anchor
- **Sports/Outdoor**: Physical challenges

### Mini-Games
1. **Convince Parents**: Argument game to unlock stock trading
2. **Clean Up After Party**: Time management minigame
3. **Stock Market**: Trading simulation with 5 fictional assets

### 8 Unique Endings
Based on your final stats at age 18:
- Buffalo Soldier (Australia explorer)
- Academic Teo (Scholar)
- Investor Teo (Crypto trader)
- Chaos But Happy (Party animal)
- Real Teo (Balanced person)
- Parent's Favorite (Golden child)
- Nobody Knows (Unremarkable)
- And more based on specific stat combinations

---

## 💡 Tips & Strategy

### Balancing Stats
- **Pure paths**: Focus on one stat for specific endings
- **Balanced approach**: Keep stats in 30-70 range for "Real Teo" ending
- **Extremes**: Very high/low stats unlock unique endings

### Unlocking Features
- **Stock Market**: Win the "Convince Parents" minigame at school
- **Special Events**: Maintain relations for deeper story branches
- **Photos**: Unlock naturally through key milestones

### Maximizing Replayability
- Different choices lead to different stats
- Random events ensure unique playthroughs
- All 8 endings are discoverable

---

## 🛠️ Development

### File Structure Smart Tips
- **Game Logic**: `/src/game/` (state, engines, data)
- **UI Components**: `/src/game/locations/` and `/src/game/map/`
- **App Pages**: `/src/app/` (Next.js routing)

### Making Changes
1. **Add events**: Edit `/src/game/data/events.ts`
2. **Add endings**: Edit `/src/game/data/endings.ts`
3. **Add locations**: Create new file in `/src/game/locations/`
4. **Tweak stats**: Adjust deltas in any action or minigame

### Extending the Game
```typescript
// Example: Add a new event
const MY_EVENT: GameEvent = {
  id: 'my-event',
  title: 'Something Happens',
  description: 'Description',
  flavor: 'Story text here',
  minAge: 15,
  maxAge: 18,
  probability: 0.2,
  choices: [
    {
      id: 'choice-1',
      text: 'First option',
      statDeltas: { ambition: 5, chaos: 0, relations: 3 },
    },
    // ...more choices
  ],
  photoUnlock: 'photo-id', // optional
};
```

---

## 📊 Game Data

### Stats Range
- **0-100**: Each stat is clamped to this range
- **Hidden**: Parental suspicion (influences some outcomes)

### Example Stat Changes
- **Study**: +8 ambition, -5 chaos
- **Party**: -3 ambition, +15 chaos, +8 relations
- **Grandma**: -15 chaos, +15 relations
- **Work**: +10 ambition, -3 chaos, +2 relations

---

## 🎨 Customization

The game is fully data-driven, making it easy to customize:

### Change Ending Conditions
Edit `src/game/data/endings.ts`

### Change Event Behaviors
Edit `src/game/data/events.ts` or minigame files

### Change UI Colors
TailwindCSS classes in location components (e.g., `bg-yellow-100`)

### Change Stat Impacts
Each action button's `onAction` handler defines stat changes

---

## 🐛 Troubleshooting

### Game not loading?
- Clear browser cache
- Restart dev server: `npm run dev`
- Check console for errors (F12)

### Stats not changing?
- Verify action's `updateStats()` call
- Check stat range (0-100)

### Endings not triggering?
- Verify stats match ending conditions
- Check weighted priority (higher weight = more likely)

---

## 🎓 Learning Resources

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Zustand**: https://github.com/pmndrs/zustand
- **TailwindCSS**: https://tailwindcss.com/docs

---

**Enjoy the game!** 🎮✨
