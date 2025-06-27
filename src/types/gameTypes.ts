export interface GameStats {
  environnement: number;
  intelligenceArtificielle: number;
  humanite: number;
  ethique: number;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'environnement' | 'intelligenceArtificielle' | 'humanite' | 'ethique';
  statsChange: Partial<GameStats>;
  swipeDirection: 'left' | 'right';
  explanation: string;
}

export interface GameState {
  currentCardIndex: number;
  stats: GameStats;
  gameHistory: Card[];
} 