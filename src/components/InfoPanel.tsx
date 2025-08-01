import type { FC } from 'react';
import { SortingAlgorithm } from '../types';
import { algorithmInfo } from '../algorithms/info';
import './InfoPanel.css';

interface InfoPanelProps {
  algorithm: SortingAlgorithm;
  onClose: () => void;
}

export const InfoPanel: FC<InfoPanelProps> = ({ algorithm, onClose }) => {
  const info = algorithmInfo[algorithm];
  if (!info) return null;

  return (
    <div className="info-overlay" onClick={onClose}>
      <div className="info-content" onClick={(e) => e.stopPropagation()}>
        <h3>{info.name}</h3>
        <p>{info.description}</p>
        <p><strong>Time Complexity:</strong></p>
        <ul>
          <li>Best: {info.timeComplexity.best}</li>
          <li>Average: {info.timeComplexity.average}</li>
          <li>Worst: {info.timeComplexity.worst}</li>
        </ul>
        <p><strong>Space Complexity:</strong> {info.spaceComplexity}</p>
        <p><strong>Use Case:</strong> {info.useCase}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
