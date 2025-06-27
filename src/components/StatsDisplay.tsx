import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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

const StatItem = styled.div<{ isHighlighted: boolean; highlightColor?: string }>`
  text-align: center;
  padding: 10px;
  background: ${props => {
    if (!props.isHighlighted) return 'rgba(255, 255, 255, 0.1)';
    if (props.highlightColor === 'red') return 'rgba(255, 107, 107, 0.3)';
    if (props.highlightColor === 'green') return 'rgba(76, 175, 80, 0.3)';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  border-radius: 12px;
  border: 1px solid ${props => {
    if (!props.isHighlighted) return 'rgba(255, 255, 255, 0.2)';
    if (props.highlightColor === 'red') return 'rgba(255, 107, 107, 0.6)';
    if (props.highlightColor === 'green') return 'rgba(76, 175, 80, 0.6)';
    return 'rgba(255, 255, 255, 0.2)';
  }};
  transition: all 0.3s ease;
  position: relative;
  cursor: help;
  box-shadow: ${props => {
    if (!props.isHighlighted) return 'none';
    if (props.highlightColor === 'red') return '0 0 20px rgba(255, 107, 107, 0.4)';
    if (props.highlightColor === 'green') return '0 0 20px rgba(76, 175, 80, 0.4)';
    return 'none';
  }};

  &:hover {
    background: ${props => {
      if (!props.isHighlighted) return 'rgba(255, 255, 255, 0.15)';
      if (props.highlightColor === 'red') return 'rgba(255, 107, 107, 0.4)';
      if (props.highlightColor === 'green') return 'rgba(76, 175, 80, 0.4)';
      return 'rgba(255, 255, 255, 0.15)';
    }};
    transform: scale(1.02);
  }

  ${props => props.isHighlighted && props.highlightColor && `
    animation: highlightPulse 2s ease-in-out infinite;

    @keyframes highlightPulse {
      0%, 100% {
        box-shadow: ${props.highlightColor === 'red' ? '0 0 20px rgba(255, 107, 107, 0.4)' :
                     props.highlightColor === 'green' ? '0 0 20px rgba(76, 175, 80, 0.4)' :
                     'none'};
        border-color: ${props.highlightColor === 'red' ? 'rgba(255, 107, 107, 0.6)' :
                       props.highlightColor === 'green' ? 'rgba(76, 175, 80, 0.6)' :
                       'rgba(255, 255, 255, 0.2)'};
      }
      50% {
        box-shadow: ${props.highlightColor === 'red' ? '0 0 30px rgba(255, 107, 107, 0.7)' :
                     props.highlightColor === 'green' ? '0 0 30px rgba(76, 175, 80, 0.7)' :
                     'none'};
        border-color: ${props.highlightColor === 'red' ? 'rgba(255, 107, 107, 0.8)' :
                       props.highlightColor === 'green' ? 'rgba(76, 175, 80, 0.8)' :
                       'rgba(255, 255, 255, 0.2)'};
      }
    }
  `}
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

const Tooltip = styled(motion.div)`
  position: absolute;
  bottom: 80%;
  left: -20px;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.8rem;
  line-height: 1.4;
  width: 200px;
  z-index: 9999;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  white-space: normal;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.79);
  }
`;

const TooltipTitle = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
  color: #FFD700;
  font-size: 0.9rem;
`;

const TooltipContent = styled.div`
  opacity: 0.9;
  font-size: 0.75rem;
`;

interface StatsDisplayProps {
  stats: GameStats;
  pendingChanges?: Partial<GameStats> | null;
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

const getStatTooltip = (statName: keyof GameStats): { title: string; content: string } => {
  const tooltips = {
    environnement: {
      title: '🌱 Environnement',
      content: 'Impact écologique des technologies IA. Équilibrez entre innovation technologique et préservation de la planète. Une valeur trop basse = dégradation environnementale, trop haute = frein au développement.'
    },
    intelligenceArtificielle: {
      title: '🤖 Intelligence Artificielle',
      content: 'Avancées technologiques et capacités de l\'IA. Développez l\'innovation responsable sans compromettre l\'éthique. Une valeur trop basse = retard technologique, trop haute = IA incontrôlable.'
    },
    humanite: {
      title: '👥 Humanité',
      content: 'Impact sur la société et le bien-être humain. Privilégiez les solutions qui améliorent la vie des gens. Une valeur trop basse = déshumanisation, trop haute = dépendance excessive à l\'IA.'
    },
    ethique: {
      title: '⚖️ Éthique',
      content: 'Respect des valeurs morales et de la vie privée. Maintenez l\'équilibre entre utilité et éthique. Une valeur trop basse = violations éthiques, trop haute = paralysie par excès de précaution.'
    }
  };
  return tooltips[statName];
};

const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats, pendingChanges }) => {
  const [hoveredStat, setHoveredStat] = useState<keyof GameStats | null>(null);
  const isCritical = (value: number) => value <= 10 || value >= 90;

  // Fonction pour calculer la couleur de surbrillance selon l'impact
  const getHighlightColor = (statKey: keyof GameStats): string | undefined => {
    if (!pendingChanges || pendingChanges[statKey] === undefined) return undefined;

    const change = pendingChanges[statKey]!;
    
    // Rouge pour les changements négatifs, vert pour les positifs
    if (change > 0) return 'green';
    if (change < 0) return 'red';
    return undefined; // Gris pour les changements nuls
  };

  return (
    <StatsContainer>
      <StatsTitle>📊 Vos Statistiques</StatsTitle>
      <StatsGrid>
        {Object.entries(stats).map(([key, value]) => {
          const critical = isCritical(value);
          const tooltip = getStatTooltip(key as keyof GameStats);
          const highlightColor = getHighlightColor(key as keyof GameStats);

          return (
            <StatItem
              key={key}
              onMouseEnter={() => setHoveredStat(key as keyof GameStats)}
              onMouseLeave={() => setHoveredStat(null)}
              isHighlighted={!!(pendingChanges && pendingChanges[key as keyof GameStats] !== undefined)}
              highlightColor={highlightColor}
            >
              <StatLabel>{getStatLabel(key as keyof GameStats)}</StatLabel>
              <StatValue isCritical={critical}>{value}</StatValue>
              <StatBar
                value={value}
                color={getStatColor(key as keyof GameStats)}
                isCritical={critical}
              />

              <AnimatePresence>
                {hoveredStat === key && (
                  <Tooltip
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TooltipTitle>{tooltip.title}</TooltipTitle>
                    <TooltipContent>{tooltip.content}</TooltipContent>
                  </Tooltip>
                )}
              </AnimatePresence>
            </StatItem>
          );
        })}
      </StatsGrid>
    </StatsContainer>
  );
};

export default StatsDisplay;
