import React from 'react';
import styled from 'styled-components';
import { GameStats } from '../types/gameTypes';

const StatsContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 350px;
`;

const StatsTitle = styled.h3`
  text-align: center;
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: 600;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #7f8c8d;
  margin-bottom: 5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div<{ isCritical: boolean }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.isCritical ? '#e74c3c' : '#2c3e50'};
  transition: color 0.3s ease;
`;

const StatBar = styled.div<{ value: number; color: string; isCritical: boolean }>`
  width: 100%;
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  margin-top: 5px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.value}%;
    background: ${props => props.isCritical ? '#e74c3c' : props.color};
    border-radius: 4px;
    transition: width 0.5s ease, background 0.3s ease;
  }
  
  ${props => props.isCritical && `
    animation: pulse 1s infinite;
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); }
      100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
    }
  `}
`;

interface StatsDisplayProps {
  stats: GameStats;
}

const getStatColor = (statName: keyof GameStats): string => {
  const colors = {
    environnement: '#27ae60',
    intelligenceArtificielle: '#3498db',
    humanite: '#e74c3c',
    ethique: '#f39c12'
  };
  return colors[statName];
};

const getStatLabel = (statName: keyof GameStats): string => {
  const labels = {
    environnement: 'Environnement',
    intelligenceArtificielle: 'IA',
    humanite: 'Humanité',
    ethique: 'Éthique'
  };
  return labels[statName];
};

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  const isCritical = (value: number) => value <= 10 || value >= 90;

  return (
    <StatsContainer>
      <StatsTitle>Vos Statistiques</StatsTitle>
      <StatsGrid>
        {Object.entries(stats).map(([key, value]) => {
          const critical = isCritical(value);
          return (
            <StatItem key={key}>
              <StatLabel>{getStatLabel(key as keyof GameStats)}</StatLabel>
              <StatValue isCritical={critical}>{value}</StatValue>
              <StatBar 
                value={value} 
                color={getStatColor(key as keyof GameStats)}
                isCritical={critical}
              />
            </StatItem>
          );
        })}
      </StatsGrid>
    </StatsContainer>
  );
};

export default StatsDisplay; 