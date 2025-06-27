import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameContainer from './components/GameContainer';
import StatsDisplay from './components/StatsDisplay';
import { GameStats } from './types/gameTypes';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%, #0a0a0a 100%);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 165, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 107, 107, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="rgba(255,255,255,0.02)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 15px;
  color: white;
  z-index: 1;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin: 0;
  background: linear-gradient(45deg, #FFD700, #FFA500, #FF6347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
  font-weight: 800;
  letter-spacing: -2px;
  animation: glow 2s ease-in-out infinite alternate;

  @keyframes glow {
    from {
      filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
    }
    to {
      filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin: 8px 0 0 0;
  opacity: 0.95;
  font-weight: 400;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  letter-spacing: 1px;
`;

const RoleDescription = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  padding: 15px;
  margin: 10px 0;
  text-align: center;
  color: white;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700);
    border-radius: 15px;
    z-index: -1;
    opacity: 0.3;
    animation: borderGlow 3s ease-in-out infinite;
  }

  @keyframes borderGlow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.6; }
  }
`;

const RoleTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: #FFD700;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const RoleText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  opacity: 0.95;
  font-weight: 400;
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  max-width: 450px;
  width: 100%;
  z-index: 1;
  position: relative;
`;

const GameEndContainer = styled.div`
  text-align: center;
  color: white;
  padding: 30px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const GameEndTitle = styled.h2`
  color: #FF6B6B;
  margin-bottom: 15px;
  font-size: 2rem;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  animation: shake 0.5s ease-in-out;

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

const GameEndReason = styled.p`
  margin-bottom: 25px;
  font-size: 1.1rem;
  line-height: 1.5;
  opacity: 0.95;
  font-weight: 500;
`;

const ResetButton = styled.button`
  background: linear-gradient(45deg, #4CAF50, #8BC34A);
  border: none;
  border-radius: 30px;
  padding: 15px 30px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
    background: linear-gradient(45deg, #45a049, #7cb342);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  &::before,
  &::after,
  & > div {
    content: '';
    position: absolute;
    width: 3px;
    height: 3px;
    background: rgba(255, 215, 0, 0.6);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
  }

  &::before {
    top: 15%;
    left: 10%;
    animation-delay: 0s;
  }

  &::after {
    top: 70%;
    right: 15%;
    animation-delay: 4s;
  }

  & > div:nth-child(1) {
    top: 30%;
    left: 80%;
    animation-delay: 2s;
  }

  & > div:nth-child(2) {
    top: 60%;
    left: 20%;
    animation-delay: 6s;
  }

  & > div:nth-child(3) {
    top: 20%;
    left: 60%;
    animation-delay: 1s;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.3;
    }
    50% {
      transform: translateY(-30px) rotate(180deg);
      opacity: 0.8;
    }
  }
`;

const StartButton = styled.button`
  background: linear-gradient(45deg, #4CAF50, #8BC34A);
  border: none;
  border-radius: 30px;
  padding: 15px 30px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
    background: linear-gradient(45deg, #45a049, #7cb342);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

function App() {
  const [gameStats, setGameStats] = useState<GameStats>({
    environnement: 50,
    intelligenceArtificielle: 50,
    humanite: 50,
    ethique: 50
  });

  const [gameEnded, setGameEnded] = useState(false);
  const [endReason, setEndReason] = useState<string>('');
  const [gameStarted, setGameStarted] = useState(false);

  // useEffect pour détecter immédiatement la fin de partie
  useEffect(() => {
    const checkGameEnd = () => {
      const stats = Object.entries(gameStats);
      
      for (const [statName, value] of stats) {
        if (value <= 0) {
          setGameEnded(true);
          setEndReason(`Échec critique : ${statName} a atteint 0 !`);
          return;
        }
        if (value >= 100) {
          setGameEnded(true);
          setEndReason(`Échec critique : ${statName} a atteint 100 !`);
          return;
        }
      }
    };

    if (gameStarted) {
      checkGameEnd();
    }
  }, [gameStats, gameStarted]);

  const updateStats = (changes: Partial<GameStats>) => {
    setGameStats((prev: GameStats) => {
      const newStats = { ...prev };
      Object.keys(changes).forEach(key => {
        const statKey = key as keyof GameStats;
        newStats[statKey] = Math.max(0, Math.min(100, prev[statKey] + changes[statKey]!));
      });
      return newStats;
    });
  };

  const resetGame = () => {
    setGameStats({
      environnement: 50,
      intelligenceArtificielle: 50,
      humanite: 50,
      ethique: 50
    });
    setGameEnded(false);
    setEndReason('');
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <AppContainer>
      <FloatingParticles>
        <div></div>
        <div></div>
        <div></div>
      </FloatingParticles>
      
      <Header>
        <Title>IA for Good</Title>
        <Subtitle>Gestionnaire d'Intelligence Artificielle</Subtitle>
      </Header>
      
      {!gameStarted ? (
        <RoleDescription>
          <RoleTitle>🎯 Votre Mission</RoleTitle>
          <RoleText>
            Vous êtes le gestionnaire principal de l'IA for Good. Le peuple vous présente des demandes 
            d'utilisation de l'IA. Votre rôle : maintenir l'équilibre entre intelligence artificielle, environnement, 
            humanité et éthique. Une dimension qui prend le dessus = échec critique !
          </RoleText>
          <StartButton onClick={startGame}>
            Commencer le Jeu
          </StartButton>
        </RoleDescription>
      ) : (
        <GameWrapper>
          <StatsDisplay stats={gameStats} />
          {gameEnded ? (
            <GameEndContainer>
              <GameEndTitle>💥 FIN DE PARTIE</GameEndTitle>
              <GameEndReason>{endReason}</GameEndReason>
              <ResetButton onClick={resetGame}>
                Recommencer
              </ResetButton>
            </GameEndContainer>
          ) : (
            <GameContainer onStatsUpdate={updateStats} currentStats={gameStats} />
          )}
        </GameWrapper>
      )}
    </AppContainer>
  );
}

export default App;
