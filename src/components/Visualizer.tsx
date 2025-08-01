import type { FC } from 'react';
import { ArrayBar } from '../types';
import './Visualizer.css';

interface VisualizerProps {
  bars1: ArrayBar[];
  bars2?: ArrayBar[];
  isComparisonMode: boolean;
}

export const Visualizer: FC<VisualizerProps> = ({ bars1, bars2 = [], isComparisonMode }) => {
  const maxValue1 = Math.max(...bars1.map((bar) => bar.value));
  const maxValue2 = bars2.length ? Math.max(...bars2.map((bar) => bar.value)) : maxValue1;

  return (
    <div className={`visualizer-container ${isComparisonMode ? 'comparison' : ''}`}>
      <div className="panel">
        {bars1.map((bar, index) => (
          <div
            key={index}
            className={`bar ${bar.state}`}
            style={{ height: `${(bar.value / maxValue1) * 100}%` }}
          />
        ))}
      </div>
      {isComparisonMode && (
        <div className="panel">
          {bars2.map((bar, index) => (
            <div
              key={index}
              className={`bar ${bar.state}`}
              style={{ height: `${(bar.value / maxValue2) * 100}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};