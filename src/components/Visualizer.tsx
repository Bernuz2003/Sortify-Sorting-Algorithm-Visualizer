import React from 'react';
import { ArrayBar } from '../types';
import styles from './Visualizer.module.css';

interface VisualizerProps {
  bars: ArrayBar[];
}

export const Visualizer: React.FC<VisualizerProps> = ({ bars }) => {
  const maxValue = Math.max(...bars.map((bar) => bar.value));

  return (
    <div className={styles.visualizerContainer}>
      {bars.map((bar, index) => (
        <div
          key={index}
          className={`${styles.bar} ${styles[bar.state]}`}
          style={{ height: `${(bar.value / maxValue) * 100}%` }}
        />
      ))}
    </div>
  );
};