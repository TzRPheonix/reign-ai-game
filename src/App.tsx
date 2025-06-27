import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameContainer from './components/GameContainer';
import StatsDisplay from './components/StatsDisplay';
import { GameStats } from './types/gameTypes';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  background: linear-gradient(45deg, #4CAF50, #8BC34A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 10px 0 0 0;
  opacity: 0.9;
  font-weight: 300;
`;

const RoleDescription = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  margin: 20px 0;
  text-align: center;
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const RoleTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: #4CAF50;
`;

const RoleText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  opacity: 0.9;
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 400px;
  width: 100%;
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

    checkGameEnd();
  }, [gameStats]);

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
  };

  return (
    <AppContainer>
      <Header>
        <Title>IA for Good</Title>
        <Subtitle>Gestionnaire d'Intelligence Artificielle</Subtitle>
      </Header>
      
      <RoleDescription>
        <RoleTitle>🎯 Votre Mission</RoleTitle>
        <RoleText>
          Vous êtes le gestionnaire principal de l'IA for Good. Le peuple vous présente des demandes 
          d'utilisation de l'IA. Votre rôle : maintenir l'équilibre entre intelligence artificielle, environnement, 
          humanité et éthique. Une dimension qui prend le dessus = échec critique !
        </RoleText>
      </RoleDescription>
      
      <GameWrapper>
        <StatsDisplay stats={gameStats} />
        {gameEnded ? (
          <div style={{ textAlign: 'center', color: 'white', padding: '20px' }}>
            <h2 style={{ color: '#ff6b6b', marginBottom: '10px' }}>💥 FIN DE PARTIE</h2>
            <p style={{ marginBottom: '20px' }}>{endReason}</p>
            <button 
              onClick={resetGame}
              style={{
                background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 24px',
                color: 'white',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
            >
              Recommencer
            </button>
          </div>
        ) : (
          <GameContainer onStatsUpdate={updateStats} currentStats={gameStats} />
        )}
      </GameWrapper>
    </AppContainer>
  );
}

export default App;
