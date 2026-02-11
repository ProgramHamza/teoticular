/**
 * StockMarket Mini-game
 * A simplified stock trading game with fictional assets
 */

export interface StockMarketResult {
  success: boolean;
  ambitionDelta: number;
  chaosDelta: number;
  relationsDelta: number;
  profit?: number; // How much money was made (for flavor)
}

interface Stock {
  symbol: string;
  name: string;
  startPrice: number;
  volatility: number; // 0-1
}

const ASSETS: Stock[] = [
  { symbol: 'MEME', name: 'MemeStockCo', startPrice: 100, volatility: 0.8 },
  { symbol: 'TECH', name: 'TechFuture', startPrice: 150, volatility: 0.4 },
  { symbol: 'SAFE', name: 'BoringSafe', startPrice: 200, volatility: 0.1 },
  { symbol: 'BTC2', name: 'DigitalGold', startPrice: 50, volatility: 0.9 },
  { symbol: 'FOOD', name: 'SnackKing', startPrice: 80, volatility: 0.2 },
];

export class StockMarketGame {
  /**
   * Play a simplified stock market game
   * @param ambition - Player's ambition (affects risk tolerance)
   * @param chaos - Player's chaos (affects decision making)
   * @returns Game result with profits/losses
   */
  static play(ambition: number, chaos: number): StockMarketResult {
    const initialMoney = 1000;
    let portfolio: { [symbol: string]: number } = {}; // symbol -> quantity

    // Player picks 2-3 stocks based on personality
    const numStocks = 2 + (chaos > 60 ? 1 : 0);
    const selectedAssets = ASSETS.sort(() => Math.random() - 0.5).slice(0, numStocks);

    // Buy phase: distribute money among stocks
    const moneyPerStock = initialMoney / numStocks;
    for (const asset of selectedAssets) {
      portfolio[asset.symbol] = moneyPerStock / asset.startPrice;
    }

    // Simulate 5 trading days
    let currentPrices: { [symbol: string]: number } = {};
    for (const asset of selectedAssets) {
      currentPrices[asset.symbol] = asset.startPrice;
    }

    for (let day = 0; day < 5; day++) {
      for (const asset of selectedAssets) {
        // Price change influenced by volatility and randomness
        const volatilityFactor = asset.volatility * (Math.random() - 0.5) * 2;
        const biasFactor = ambition > 70 ? 0.05 : ambition < 30 ? -0.03 : 0;
        const changePercent = volatilityFactor + biasFactor;

        currentPrices[asset.symbol] *= 1 + changePercent;
        // Keep prices above $0.10 (no bankruptcy)
        currentPrices[asset.symbol] = Math.max(0.1, currentPrices[asset.symbol]);
      }
    }

    // Calculate final portfolio value
    let finalValue = 0;
    for (const asset of selectedAssets) {
      const quantity = portfolio[asset.symbol];
      finalValue += quantity * currentPrices[asset.symbol];
    }

    const profit = finalValue - initialMoney;
    const profitRatio = profit / initialMoney;

    // Success: made money and ambition was high
    const success = profitRatio > 0.05 && ambition > 50;

    return {
      success,
      ambitionDelta: success ? 10 : profit > 0 ? 3 : -5,
      chaosDelta: Math.abs(profitRatio) > 0.2 ? 5 : 0, // Big swings = chaos
      relationsDelta: success ? 5 : profit > 0 ? 0 : -3,
      profit: Math.round(profit),
    };
  }
}
