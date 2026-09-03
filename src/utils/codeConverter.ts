export type BettingMarket = '1' | '2' | 'X' | 'GG' | 'NG' | 'OV15' | 'OV25' | 'UN25';
export type Platform = 'bet9ja' | 'betway' | 'paripesa' | 'oneXBet' | 'sportyBet';

export interface MarketMapping {
  label: string;
  bet9ja: string;
  betway: string;
  paripesa: string;
  oneXBet: string;
  sportyBet: string;
}

// Complete dictionary map translating shorthand selection styles across bookmakers
export const marketDictionary: Record<BettingMarket, MarketMapping> = {
  '1': { 
    label: 'Home Win', 
    bet9ja: '1', betway: '1 (Home)', paripesa: 'W1', oneXBet: 'W1', sportyBet: '1' 
  },
  '2': { 
    label: 'Away Win', 
    bet9ja: '2', betway: '2 (Away)', paripesa: 'W2', oneXBet: 'W2', sportyBet: '2' 
  },
  'X': { 
    label: 'Draw / Tie', 
    bet9ja: 'X', betway: 'X (Draw)', paripesa: 'X', oneXBet: 'X', sportyBet: 'X' 
  },
  'GG': { 
    label: 'Both Teams To Score (Yes)', 
    bet9ja: 'GG', betway: 'GG / BTS (Yes)', paripesa: 'GG (Yes)', oneXBet: 'Both Teams To Score - Yes', sportyBet: 'GG' 
  },
  'NG': { 
    label: 'Both Teams To Score (No)', 
    bet9ja: 'NG', betway: 'No Goal / BTS (No)', paripesa: 'NG (No)', oneXBet: 'Both Teams To Score - No', sportyBet: 'NG' 
  },
  'OV15': { 
    label: 'Over 1.5 Goals', 
    bet9ja: 'O1.5', betway: 'Over 1.5', paripesa: 'Total Over 1.5', oneXBet: 'Total 1.5 Over', sportyBet: 'Over 1.5' 
  },
  'OV25': { 
    label: 'Over 2.5 Goals', 
    bet9ja: 'O2.5', betway: 'Over 2.5', paripesa: 'Total Over 2.5', oneXBet: 'Total 2.5 Over', sportyBet: 'Over 2.5' 
  },
  'UN25': { 
    label: 'Under 2.5 Goals', 
    bet9ja: 'U2.5', betway: 'Under 2.5', paripesa: 'Total Under 2.5', oneXBet: 'Total 2.5 Under', sportyBet: 'Under 2.5' 
  }
};
