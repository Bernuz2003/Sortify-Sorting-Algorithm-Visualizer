import React from 'react';
import styled from 'styled-components';
import { ArrayBar } from '../types';

const VisualizerContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: calc(100vh - 200px);
  gap: 1px;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
`;

const Bar = styled.div<{ height: number; state: ArrayBar['state'] }>`
  flex: 1;
  height: ${({ height }) => `${height}%`};
  background-color: ${({ theme, state }) => {
    switch (state) {
      case 'active':
        return theme.colors.barActive;
      case 'sorted':
        return theme.colors.barSorted;
      default:
        return theme.colors.barDefault;
    }
  }};
  transition: ${({ theme }) => theme.transitions.default};
  min-width: 2px;
`;

interface VisualizerProps {
  bars: ArrayBar[];
}

export const Visualizer: React.FC<VisualizerProps> = ({ bars }) => {
  const maxValue = Math.max(...bars.map((bar) => bar.value));

  return (
    <VisualizerContainer>
      {bars.map((bar, index) => (
        <Bar
          key={index}
          height={(bar.value / maxValue) * 100}
          state={bar.state}
        />
      ))}
    </VisualizerContainer>
  );
};