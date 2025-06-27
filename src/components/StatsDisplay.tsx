import React from 'react';
import styled from 'styled-components';
import { GameStats } from '../types/gameTypes';

const StatsContainer = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const StatsTitle = styled.h3`
  text-align: center;
  margin: 0 0 12px 0;
  color: #FFD700;
  font-size: 1.1rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  letter-spacing: 1px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.02);
  }
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const StatValue = styled.div<{ isCritical: boolean }>`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${props => props.isCritical ? '#FF6B6B' : '#FFFFFF'};
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  margin-bottom: 6px;

  ${props => props.isCritical && `
    animation: criticalPulse 1s infinite;
    
    @keyframes criticalPulse {
      0% { 
        text-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 0 0 0 rgba(255, 107, 107, 0.7);
      }
      70% { 
        text-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 0 0 10px rgba(255, 107, 107, 0);
      }
      100% { 
        text-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 0 0 0 rgba(255, 107, 107, 0);
      }
    }
  `}
`;

const StatBar = styled.div<{ value: number; color: string; isCritical: boolean }>`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.value}%;
    background: ${props => props.isCritical ? '#FF6B6B' : props.color};
    border-radius: 4px;
    transition: width 0.5s ease, background 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  ${props => props.isCritical && `
    animation: barPulse 1s infinite;
    
    @keyframes barPulse {
      0% { 
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(255, 107, 107, 0.7);
      }
      70% { 
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 0 8px rgba(255, 107, 107, 0);
      }
      100% { 
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1), 0 0 0 0 rgba(255, 107, 107, 0);
      }
    }
  `}
`;

interface StatsDisplayProps {
  stats: GameStats;
}

const getStatColor = (statName: keyof GameStats): string => {
  const colors = {
    environnement: '#4CAF50',
    intelligenceArtificielle: '#2196F3',
    humanite: '#FF9800',
    ethique: '#9C27B0'
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
      <StatsTitle>📊 Vos Statistiques</StatsTitle>
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