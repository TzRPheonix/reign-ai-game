import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { GameStats } from '../types/gameTypes';
import { gameCards } from '../data/gameCards';

const GameContainerWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  height: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameCard = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: absolute;
  cursor: grab;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  
  &:active {
    cursor: grabbing;
  }

  &:hover {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
`;

const CardImage = styled.div<{ image: string }>`
  width: 100%;
  height: 180px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.2));
  }
`;

const CardContent = styled.div`
  padding: 20px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
`;

const CardDescription = styled.p`
  margin: 0;
  color: #5a6c7d;
  font-size: 0.9rem;
  line-height: 1.4;
  flex-grow: 1;
  font-weight: 400;
`;

const SwipeInstructions = styled.div`
  text-align: center;
  color: white;
  margin-top: 15px;
  font-size: 0.9rem;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  div {
    margin: 3px 0;
    font-weight: 500;
  }
`;

const ProgressIndicator = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 15px;
  font-size: 0.8rem;
  opacity: 0.9;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  margin-top: 8px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${props => props.progress}%;
  background: linear-gradient(45deg, #FFD700, #FFA500);
  border-radius: 3px;
  transition: width 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const SwipeLeft = styled.div`
  position: absolute;
  left: 25px;
  top: 50%;
  transform: translateY(-50%);
  color: #FF6B6B;
  font-size: 2.5rem;
  opacity: 0.8;
  pointer-events: none;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  animation: pulseLeft 2s ease-in-out infinite;
  
  @keyframes pulseLeft {
    0%, 100% { transform: translateY(-50%) scale(1); }
    50% { transform: translateY(-50%) scale(1.1); }
  }
`;

const SwipeRight = styled.div`
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  color: #4CAF50;
  font-size: 2.5rem;
  opacity: 0.8;
  pointer-events: none;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  animation: pulseRight 2s ease-in-out infinite;
  
  @keyframes pulseRight {
    0%, 100% { transform: translateY(-50%) scale(1); }
    50% { transform: translateY(-50%) scale(1.1); }
  }
`;

const GameOver = styled.div`
  text-align: center;
  color: white;
  font-size: 1.3rem;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.15);
  padding: 30px;
  border-radius: 20px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  h3 {
    color: #FFD700;
    font-size: 1.8rem;
    margin-bottom: 15px;
    font-weight: 800;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  p {
    margin: 10px 0;
    line-height: 1.5;
    opacity: 0.95;
  }
`;

const RestartButton = styled.button`
  background: linear-gradient(45deg, #4CAF50, #8BC34A);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
    background: linear-gradient(45deg, #45a049, #7cb342);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

interface GameContainerProps {
  onStatsUpdate: (changes: Partial<GameStats>) => void;
  currentStats: GameStats;
}

const GameContainer: React.FC<GameContainerProps> = ({ onStatsUpdate, currentStats }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<'defeat' | 'neutral'>('neutral');

  const currentCard = gameCards[currentCardIndex];

  const checkGameOver = (newStats: GameStats) => {
    // Vérifier si une stat atteint 0 ou 100 (défaite uniquement)
    const stats = Object.values(newStats);
    if (stats.some(stat => stat <= 0 || stat >= 100)) {
      return 'defeat';
    }
    return 'neutral';
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (gameOver) return;

    // Calculer les nouvelles stats
    const newStats = {
      environnement: Math.max(0, Math.min(100, currentStats.environnement + (currentCard.statsChange.environnement || 0))),
      intelligenceArtificielle: Math.max(0, Math.min(100, currentStats.intelligenceArtificielle + (currentCard.statsChange.intelligenceArtificielle || 0))),
      humanite: Math.max(0, Math.min(100, currentStats.humanite + (currentCard.statsChange.humanite || 0))),
      ethique: Math.max(0, Math.min(100, currentStats.ethique + (currentCard.statsChange.ethique || 0)))
    };

    // Appliquer les changements de stats
    onStatsUpdate(currentCard.statsChange);

    // Vérifier les conditions de fin de jeu avec les nouvelles stats
    const result = checkGameOver(newStats);
    
    if (result !== 'neutral') {
      setGameResult(result);
      setGameOver(true);
      return;
    }

    // Passer à la carte suivante
    if (currentCardIndex < gameCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setGameResult('neutral');
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentCardIndex(0);
    setGameOver(false);
    setGameResult('neutral');
    // Reset stats to initial values
    onStatsUpdate({
      environnement: 50,
      intelligenceArtificielle: 50,
      humanite: 50,
      ethique: 50
    });
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true
  });

  if (gameOver) {
    return (
      <GameContainerWrapper>
        <GameOver>
          {gameResult === 'defeat' ? (
            <>
              <h3>💥 Échec Critique</h3>
              <p>L'une des dimensions a pris le dessus de manière excessive.</p>
              <p>L'IA a perdu son équilibre et ne peut plus servir le bien commun efficacement.</p>
              <p>Vous avez survécu {currentCardIndex} mois sur {gameCards.length}.</p>
            </>
          ) : (
            <>
              <h3>🏁 Fin de Mandat</h3>
              <p>Vous avez terminé votre période de gestion de l'IA for Good.</p>
              <p>Vos décisions ont façonné l'avenir de l'IA pour le bien commun.</p>
              <p>Vous avez survécu {gameCards.length} mois complets !</p>
            </>
          )}
          <RestartButton onClick={restartGame}>
            Recommencer
          </RestartButton>
        </GameOver>
      </GameContainerWrapper>
    );
  }

  return (
    <GameContainerWrapper>
      <ProgressIndicator>
        📋 Carte {currentCardIndex + 1} sur {gameCards.length}
        <ProgressBar>
          <ProgressFill progress={((currentCardIndex + 1) / gameCards.length) * 100} />
        </ProgressBar>
      </ProgressIndicator>
      
      <CardContainer>
        <SwipeLeft>👎</SwipeLeft>
        <SwipeRight>👍</SwipeRight>
        
        <AnimatePresence>
          <GameCard
            key={currentCard.id}
            {...swipeHandlers}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 100) {
                handleSwipe('right');
              } else if (info.offset.x < -100) {
                handleSwipe('left');
              }
            }}
          >
            <CardImage image={currentCard.image} />
            <CardContent>
              <div>
                <CardTitle>{currentCard.title}</CardTitle>
                <CardDescription>{currentCard.description}</CardDescription>
              </div>
            </CardContent>
          </GameCard>
        </AnimatePresence>
      </CardContainer>
      
      <SwipeInstructions>
        <div>👈 Refuser la demande</div>
        <div>👉 Accepter la demande</div>
        <div style={{ fontSize: '0.85rem', marginTop: '8px', opacity: 0.7 }}>
          Maintenez l'équilibre entre toutes les dimensions !
        </div>
      </SwipeInstructions>
    </GameContainerWrapper>
  );
};

export default GameContainer; 