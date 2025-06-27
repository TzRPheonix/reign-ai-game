import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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

const Tooltip = styled(motion.div)`
  position: absolute;
  bottom: 120%;
  left: 50%;
  width: 400px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.23);
  backdrop-filter: blur(10px);
`;

interface GameContainerProps {
  onStatsUpdate: (changes: Partial<GameStats>) => void;
  currentStats: GameStats;
  onPendingChanges?: (changes: Partial<GameStats> | null) => void;
}

const GameContainer: React.FC<GameContainerProps> = ({ onStatsUpdate, currentStats, onPendingChanges }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState<'defeat' | 'neutral'>('neutral');
  const [pendingChanges, setPendingChanges] = useState<Partial<GameStats> | null>(null);

  // Motion values pour le drag et la rotation
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const currentCard = gameCards[currentCardIndex];

  // Réinitialiser la position à chaque changement de carte
  useEffect(() => {
    x.set(0);
  }, [currentCardIndex, x]);

  // Fonction pour calculer l'impact coloré des changements
  const calculateColoredChanges = (changes: Partial<GameStats>) => {
    const coloredChanges: { [key: string]: { value: number; color: 'red' | 'green' } } = {};

    Object.entries(changes).forEach(([key, value]) => {
      const currentValue = currentStats[key as keyof GameStats];
      const newValue = currentValue + value;

      // Calculer la distance par rapport au centre (50)
      const currentDistance = Math.abs(currentValue - 50);
      const newDistance = Math.abs(newValue - 50);

      // Rouge si on s'éloigne du centre, vert si on s'en rapproche
      const color = newDistance > currentDistance ? 'red' : 'green';

      coloredChanges[key] = { value, color };
    });

    return coloredChanges;
  };

  // Mettre à jour les changements en cours pendant le drag
  useEffect(() => {
    let lastDirection = 'none';

    const unsubscribe = x.on('change', (latest) => {
      const currentDirection = latest > 0 ? 'right' : latest < 0 ? 'left' : 'none';

      // Seulement mettre à jour si la direction a changé ou si on dépasse le seuil
      if (Math.abs(latest) > 50 && currentDirection !== lastDirection) {
        lastDirection = currentDirection;

        // Appliquer les changements selon la direction du swipe
        if (currentDirection === 'right') {
          // Swipe vers la droite = accepter
          setPendingChanges(currentCard.statsChange);
          onPendingChanges?.(currentCard.statsChange);
        } else if (currentDirection === 'left') {
          // Swipe vers la gauche = refuser (inverser les changements)
          const invertedChanges = Object.entries(currentCard.statsChange).reduce((acc, [key, value]) => {
            acc[key as keyof GameStats] = -value;
            return acc;
          }, {} as Partial<GameStats>);

          setPendingChanges(invertedChanges);
          onPendingChanges?.(invertedChanges);
        }
      } else if (Math.abs(latest) <= 50) {
        // Si le swipe n'est pas assez loin, pas de changements
        if (lastDirection !== 'none') {
          lastDirection = 'none';
          setPendingChanges(null);
          onPendingChanges?.(null);
        }
      }
    });

    return unsubscribe;
  }, [x, currentCard, onPendingChanges]);

  // Réinitialiser les highlights quand on change de carte
  useEffect(() => {
    // Réinitialiser seulement si on n'est pas en train de drag
    if (Math.abs(x.get()) < 10) {
      setPendingChanges(null);
      onPendingChanges?.(null);
    }
  }, [currentCardIndex, onPendingChanges, x]);

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

    // Réinitialiser la surbrillance
    setPendingChanges(null);
    onPendingChanges?.(null);

    // Déterminer les changements selon la direction
    let changesToApply: Partial<GameStats>;
    
    if (direction === 'right') {
      // Swipe vers la droite = accepter (changements normaux)
      changesToApply = currentCard.statsChange;
    } else {
      // Swipe vers la gauche = refuser (changements inversés)
      changesToApply = Object.entries(currentCard.statsChange).reduce((acc, [key, value]) => {
        acc[key as keyof GameStats] = -value;
        return acc;
      }, {} as Partial<GameStats>);
    }

    // Calculer les nouvelles stats avec les changements corrects
    const newStats = {
      environnement: Math.max(0, Math.min(100, currentStats.environnement + (changesToApply.environnement || 0))),
      intelligenceArtificielle: Math.max(0, Math.min(100, currentStats.intelligenceArtificielle + (changesToApply.intelligenceArtificielle || 0))),
      humanite: Math.max(0, Math.min(100, currentStats.humanite + (changesToApply.humanite || 0))),
      ethique: Math.max(0, Math.min(100, currentStats.ethique + (changesToApply.ethique || 0)))
    };

    // Appliquer les changements de stats
    onStatsUpdate(changesToApply);

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
      // Réinitialiser les highlights pour la nouvelle carte
      setPendingChanges(null);
      onPendingChanges?.(null);
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

  // Fonction pour analyser les statistiques finales
  const analyzeFinalStats = () => {
    const stats = currentStats;

    // Détecter quelle stat a causé l'échec critique
    const criticalStat = Object.entries(stats).find(([key, value]) => value <= 10 || value >= 90);
    const criticalReason = criticalStat ? {
      stat: criticalStat[0],
      value: criticalStat[1],
      direction: criticalStat[1] >= 90 ? 'trop élevée' : 'trop basse'
    } : null;

    const analysis = {
      environnement: {
        status: stats.environnement <= 20 ? 'critique' : stats.environnement <= 40 ? 'faible' : stats.environnement >= 80 ? 'excellent' : 'équilibré',
        message: stats.environnement <= 20 ? 'L\'environnement est gravement menacé par vos choix technologiques.' :
                stats.environnement <= 40 ? 'L\'impact environnemental de vos décisions est préoccupant.' :
                stats.environnement >= 80 ? 'Vous avez privilégié la protection environnementale avec succès.' :
                'Vous avez maintenu un bon équilibre environnemental.'
      },
      intelligenceArtificielle: {
        status: stats.intelligenceArtificielle <= 20 ? 'critique' : stats.intelligenceArtificielle <= 40 ? 'faible' : stats.intelligenceArtificielle >= 80 ? 'excellent' : 'équilibré',
        message: stats.intelligenceArtificielle <= 20 ? 'Le développement technologique a été négligé.' :
                stats.intelligenceArtificielle <= 40 ? 'L\'innovation technologique est insuffisante.' :
                stats.intelligenceArtificielle >= 80 ? 'Vous avez permis un développement technologique remarquable.' :
                'Vous avez favorisé une innovation technologique responsable.'
      },
      humanite: {
        status: stats.humanite <= 20 ? 'critique' : stats.humanite <= 40 ? 'faible' : stats.humanite >= 80 ? 'excellent' : 'equilibré',
        message: stats.humanite <= 20 ? 'L\'impact humain de vos décisions est préoccupant.' :
                stats.humanite <= 40 ? 'Le bien-être humain n\'a pas été suffisamment priorisé.' :
                stats.humanite >= 80 ? 'Vous avez excellé dans la protection du bien-être humain.' :
                'Vous avez maintenu un bon équilibre pour l\'humanité.'
      },
      ethique: {
        status: stats.ethique <= 20 ? 'critique' : stats.ethique <= 40 ? 'faible' : stats.ethique >= 80 ? 'excellent' : 'équilibré',
        message: stats.ethique <= 20 ? 'Les considérations éthiques ont été négligées.' :
                stats.ethique <= 40 ? 'L\'éthique n\'a pas été suffisamment prise en compte.' :
                stats.ethique >= 80 ? 'Vous avez maintenu des standards éthiques exemplaires.' :
                'Vous avez équilibré utilité et éthique avec succès.'
      }
    };

    // Déterminer le type de fin
    const hasCritical = Object.values(stats).some(stat => stat <= 10 || stat >= 90);
    const hasExcellent = Object.values(stats).some(stat => stat >= 80);
    const hasLow = Object.values(stats).some(stat => stat <= 20);
    const isBalanced = Object.values(stats).every(stat => stat >= 30 && stat <= 70);

    let resultType = 'neutral';
    if (hasCritical) resultType = 'defeat';
    else if (isBalanced && !hasLow) resultType = 'victory';
    else if (hasExcellent && !hasLow) resultType = 'success';

    return { analysis, resultType, criticalReason };
  };

  if (gameOver) {
    const { analysis, resultType, criticalReason } = analyzeFinalStats();

    return (
      <GameContainerWrapper>
        <GameOver>
          {resultType === 'defeat' ? (
            <>
              <h3>💥 Échec Critique</h3>
              {criticalReason && (
                <div style={{ marginBottom: '15px', padding: '12px', background: 'rgba(255, 107, 107, 0.2)', borderRadius: '8px', border: '1px solid rgba(255, 107, 107, 0.3)' }}>
                  <p style={{ margin: '0 0 8px 0', color: '#FF6B6B', fontWeight: 'bold' }}>
                    🚨 Cause de l'échec : {criticalReason.stat === 'environnement' ? '🌱 Environnement' :
                                          criticalReason.stat === 'intelligence Artificielle' ? '🤖 Intelligence Artificielle' :
                                          criticalReason.stat === 'humanite' ? '👥 Humanité' : '⚖️ Éthique'}
                    a atteint {criticalReason.value} !
                  </p>
                  <p style={{ margin: '0', fontSize: '0.9rem', opacity: '0.9' }}>
                    {criticalReason.direction === 'trop élevée' ?
                      `Cette dimension est devenue excessive et incontrôlable, causant un déséquilibre majeur dans l'écosystème de l'IA for Good.` :
                      `Cette dimension a été négligée au point de compromettre l'efficacité et la légitimité de l'IA for Good.`
                    }
                  </p>
                </div>
              )}
              <p>L'IA a perdu son équilibre et ne peut plus servir le bien commun efficacement.</p>
              <p>Vous avez survécu {currentCardIndex} mois sur {gameCards.length}.</p>

              <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <h4 style={{ color: '#FFD700', marginBottom: '10px' }}>📊 Analyse Détaillée :</h4>
                {Object.entries(analysis).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: '8px', fontSize: '0.9rem' }}>
                    <strong style={{ color: value.status === 'critique' ? '#FF6B6B' : '#FFD700' }}>
                      {key === 'environnement' ? '🌱' : key === 'intelligenceArtificielle' ? '🤖' : key === 'humanite' ? '👥' : '⚖️'} {key.charAt(0).toUpperCase() + key.slice(1)} ({currentStats[key as keyof GameStats]}):
                    </strong>
                    <span style={{ color: value.status === 'critique' ? '#FF6B6B' : 'white' }}>
                      {value.message}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : resultType === 'victory' ? (
            <>
              <h3>🏆 Victoire Équilibrée</h3>
              <p>Félicitations ! Vous avez réussi à maintenir un équilibre parfait entre toutes les dimensions.</p>
              <p>Votre gestion de l'IA for Good a été exemplaire et responsable.</p>
              <p>Vous avez terminé {gameCards.length} mois de mandat avec succès !</p>

              <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <h4 style={{ color: '#4CAF50', marginBottom: '10px' }}>📊 Analyse Détaillée :</h4>
                {Object.entries(analysis).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: '8px', fontSize: '0.9rem' }}>
                    <strong style={{ color: '#4CAF50' }}>
                      {key === 'environnement' ? '🌱' : key === 'intelligenceArtificielle' ? '🤖' : key === 'humanite' ? '👥' : '⚖️'} {key.charAt(0).toUpperCase() + key.slice(1)} ({currentStats[key as keyof GameStats]}):
                    </strong>
                    <span style={{ color: 'white' }}>
                      {value.message}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3>🏁 Fin de Mandat</h3>
              <p>Vous avez terminé votre période de gestion de l'IA for Good.</p>
              <p>Vos décisions ont façonné l'avenir de l'IA pour le bien commun.</p>
              <p>Vous avez survécu {gameCards.length} mois complets !</p>

              <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <h4 style={{ color: '#FFD700', marginBottom: '10px' }}>📊 Analyse Détaillée :</h4>
                {Object.entries(analysis).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: '8px', fontSize: '0.9rem' }}>
                    <strong style={{ color: value.status === 'faible' ? '#FF9800' : value.status === 'excellent' ? '#4CAF50' : '#FFD700' }}>
                      {key === 'environnement' ? '🌱' : key === 'intelligenceArtificielle' ? '🤖' : key === 'humanite' ? '👥' : '⚖️'} {key.charAt(0).toUpperCase() + key.slice(1)} ({currentStats[key as keyof GameStats]}):
                    </strong>
                    <span style={{ color: 'white' }}>
                      {value.message}
                    </span>
                  </div>
                ))}
              </div>
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
    <GameContainerWrapper className='game-container'>

      <CardContainer>
        <SwipeLeft>👎</SwipeLeft>
        <SwipeRight>👍</SwipeRight>

        <AnimatePresence>
          <GameCard
            className='card'
            key={`${currentCard.id}-${currentCardIndex}`}
            initial={{ scale: 0.8, opacity: 0, x: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: -100, right: 100 }}
            dragElastic={0.8}
            style={{ x, rotate }}
            onDragEnd={(e, info) => {
              if (info.offset.x > 100) {
                handleSwipe('right');
              } else if (info.offset.x < -100) {
                handleSwipe('left');
              }
              // Reset position et surbrillance
              x.set(0);
              setPendingChanges(null);
              onPendingChanges?.(null);
            }}
          >
            <CardImage image={currentCard.image} />
            <CardContent className='card-content'>
              <div className='card-content'>
                <CardTitle>{currentCard.title}</CardTitle>
                <CardDescription className='card-description'>{currentCard.description}</CardDescription>
              </div>
            </CardContent>
          </GameCard>
        </AnimatePresence>
      </CardContainer>

      <SwipeInstructions className='swipe-instructions'>
      📋 Carte {currentCardIndex + 1} sur {gameCards.length}
      <ProgressBar>
          <ProgressFill progress={((currentCardIndex + 1) / gameCards.length) * 100} />
        </ProgressBar>
        <div>👈 Refuser | Accepter 👉 </div>
      </SwipeInstructions>
    </GameContainerWrapper>
  );
};

export default GameContainer;
