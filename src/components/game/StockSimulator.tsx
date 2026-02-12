import { useState, useEffect, useCallback, useRef } from 'react';
import { seededRng } from '@/store/gameStore';
import type { MinigameResult } from '@/types/game';

// ─── Stock Simulator Minigame ───
// Buy/sell 3 stocks over simulated days. Deterministic RNG.

interface Stock {
  id: string;
  name: string;
  icon: string;
  price: number;
  history: number[];
  volatility: number;
  trend: number;
}

interface Props {
  onComplete: (result: MinigameResult) => void;
}

const STARTING_CASH = 1000;
const MAX_DAYS = 15;

const StockSimulator = ({ onComplete }: Props) => {
  const rng = useRef(seededRng(42069)).current;

  const [day, setDay] = useState(1);
  const [cash, setCash] = useState(STARTING_CASH);
  const [portfolio, setPortfolio] = useState<Record<string, number>>({});
  const [stocks, setStocks] = useState<Stock[]>([
    { id: 'bluebrick', name: 'BlueBrick', icon: '🧱', price: 50, history: [50], volatility: 0.08, trend: 0.02 },
    { id: 'neomind', name: 'NeoMind', icon: '🧠', price: 120, history: [120], volatility: 0.15, trend: 0.05 },
    { id: 'mooncat', name: 'MoonCat', icon: '🐱', price: 10, history: [10], volatility: 0.25, trend: -0.01 },
  ]);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [news, setNews] = useState('Markets are open. Good luck!');

  const newsHeadlines = [
    'BlueBrick announces new factory — shares stable.',
    'NeoMind AI breakthrough rumors swirl.',
    'MoonCat meme goes viral on social media.',
    'Market jitters as interest rates discussed.',
    'Tech stocks rally on earnings surprise.',
    'Crypto crash sends ripples through meme stocks.',
    'BlueBrick CEO tweets something controversial.',
    'NeoMind secures government contract.',
    'MoonCat holders diamond-handing through the dip.',
    'Analysts say "buy the dip" — but which dip?',
    'Markets flat. Traders bored. Cats napping.',
    'Flash crash! Just kidding. Or am I?',
    'End of quarter rebalancing shakes things up.',
    'MoonCat to the moon? Or to the floor?',
    'Breaking: markets do market things.',
  ];

  const simulateDay = useCallback(() => {
    if (day >= MAX_DAYS) {
      setGameOver(true);
      return;
    }

    setStocks((prev) =>
      prev.map((stock) => {
        const change = stock.trend + (rng() - 0.5) * 2 * stock.volatility;
        const newPrice = Math.max(1, Math.round((stock.price * (1 + change)) * 100) / 100);
        return {
          ...stock,
          price: newPrice,
          history: [...stock.history, newPrice],
        };
      })
    );

    setDay((d) => d + 1);
    setNews(newsHeadlines[day % newsHeadlines.length]);
  }, [day, rng]);

  const buyStock = (stockId: string) => {
    const stock = stocks.find((s) => s.id === stockId);
    if (!stock || cash < stock.price) return;
    setCash((c) => Math.round((c - stock.price) * 100) / 100);
    setPortfolio((p) => ({ ...p, [stockId]: (p[stockId] || 0) + 1 }));
  };

  const sellStock = (stockId: string) => {
    if (!portfolio[stockId] || portfolio[stockId] <= 0) return;
    const stock = stocks.find((s) => s.id === stockId);
    if (!stock) return;
    setCash((c) => Math.round((c + stock.price) * 100) / 100);
    setPortfolio((p) => ({ ...p, [stockId]: p[stockId] - 1 }));
  };

  const getPortfolioValue = () => {
    return Object.entries(portfolio).reduce((sum, [id, qty]) => {
      const stock = stocks.find((s) => s.id === id);
      return sum + (stock ? stock.price * qty : 0);
    }, 0);
  };

  const totalValue = Math.round((cash + getPortfolioValue()) * 100) / 100;
  const profitLoss = Math.round((totalValue - STARTING_CASH) * 100) / 100;

  useEffect(() => {
    if (!gameOver) return;
    const timer = setTimeout(() => {
      const success = profitLoss > 0;
      onComplete({
        success,
        ambitionDelta: profitLoss > 200 ? 3 : profitLoss > 0 ? 1 : 0,
        chaosDelta: profitLoss < -200 ? 3 : profitLoss < 0 ? 1 : 0,
        relationsDelta: 0,
        metadata: { profitLoss, totalValue },
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [gameOver]);

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background p-8">
        <div className="pixel-border bg-card p-8 max-w-md text-center">
          <div className="text-6xl mb-4 animate-pixel-idle">
            {profitLoss > 0 ? '📈' : '📉'}
          </div>
          <h2 className={`font-pixel text-lg mb-3 ${profitLoss > 0 ? 'text-primary neon-glow-cyan' : 'text-destructive'}`}>
            {profitLoss > 0 ? 'PROFIT!' : 'LOSS!'}
          </h2>
          <p className="font-body text-3xl text-foreground mb-2">
            ${totalValue.toFixed(2)}
          </p>
          <p className={`font-pixel text-sm ${profitLoss > 0 ? 'text-pastel-mint' : 'text-destructive'}`}>
            {profitLoss > 0 ? '+' : ''}{profitLoss.toFixed(2)}
          </p>
        </div>
      </div>
    );
  }

  const selected = stocks.find((s) => s.id === selectedStock);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-pixel text-sm text-primary neon-glow-cyan tracking-wider mb-1">
          STOCK SIMULATOR
        </h2>
        <p className="font-body text-lg text-muted-foreground">
          Day {day}/{MAX_DAYS}
        </p>
      </div>

      {/* Portfolio summary */}
      <div className="pixel-border bg-card p-4 max-w-lg w-full mb-4 flex justify-between items-center">
        <div>
          <span className="font-pixel text-[8px] text-muted-foreground">CASH</span>
          <p className="font-body text-xl text-foreground">${cash.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <span className="font-pixel text-[8px] text-muted-foreground">TOTAL VALUE</span>
          <p className={`font-body text-xl ${profitLoss >= 0 ? 'text-pastel-mint' : 'text-destructive'}`}>
            ${totalValue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* News ticker */}
      <div className="pixel-border bg-muted p-3 max-w-lg w-full mb-4">
        <span className="font-pixel text-[7px] text-secondary">📰 NEWS:</span>
        <p className="font-body text-lg text-foreground">{news}</p>
      </div>

      {/* Stocks */}
      <div className="flex flex-col gap-2 max-w-lg w-full mb-4">
        {stocks.map((stock) => {
          const change = stock.history.length > 1
            ? stock.price - stock.history[stock.history.length - 2]
            : 0;
          const changePct = stock.history.length > 1
            ? ((change / stock.history[stock.history.length - 2]) * 100)
            : 0;
          const owned = portfolio[stock.id] || 0;

          return (
            <button
              key={stock.id}
              onClick={() => setSelectedStock(stock.id === selectedStock ? null : stock.id)}
              className={`pixel-border p-3 text-left transition-all ${
                selectedStock === stock.id ? 'bg-primary/10 border-primary' : 'bg-card hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{stock.icon}</span>
                  <div>
                    <p className="font-pixel text-[8px] text-foreground">{stock.name}</p>
                    {owned > 0 && (
                      <p className="font-pixel text-[7px] text-accent">Own: {owned}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-body text-xl text-foreground">${stock.price.toFixed(2)}</p>
                  <p className={`font-pixel text-[7px] ${change >= 0 ? 'text-pastel-mint' : 'text-destructive'}`}>
                    {change >= 0 ? '▲' : '▼'} {changePct.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Mini chart */}
              <div className="mt-2 h-8 flex items-end gap-[2px]">
                {stock.history.slice(-10).map((price, i) => {
                  const min = Math.min(...stock.history.slice(-10));
                  const max = Math.max(...stock.history.slice(-10));
                  const range = max - min || 1;
                  const height = ((price - min) / range) * 100;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${change >= 0 ? 'bg-pastel-mint' : 'bg-destructive'}`}
                      style={{ height: `${Math.max(10, height)}%`, opacity: 0.4 + (i / 10) * 0.6 }}
                    />
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3 max-w-lg w-full mb-4">
        {selected && (
          <>
            <button
              onClick={() => buyStock(selected.id)}
              disabled={cash < selected.price}
              className="flex-1 pixel-border bg-pastel-mint text-background font-pixel text-xs py-3 hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            >
              BUY ${selected.price.toFixed(2)}
            </button>
            <button
              onClick={() => sellStock(selected.id)}
              disabled={!portfolio[selected.id]}
              className="flex-1 pixel-border bg-destructive text-destructive-foreground font-pixel text-xs py-3 hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
            >
              SELL
            </button>
          </>
        )}
        <button
          onClick={simulateDay}
          className="flex-1 pixel-border bg-primary text-primary-foreground font-pixel text-xs py-3 hover:opacity-80 transition-opacity"
        >
          NEXT DAY →
        </button>
      </div>
    </div>
  );
};

export default StockSimulator;
