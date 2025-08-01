import type { FC, ChangeEvent, KeyboardEvent } from 'react';
import { useState, useEffect } from 'react';
import { Play, Square, RefreshCw } from 'lucide-react';
import { SortingAlgorithm } from '../types';
import { InfoPanel } from './InfoPanel';
import './Controls.css';

interface ControlsProps {
  algorithm1: SortingAlgorithm;
  algorithm2: SortingAlgorithm;
  isComparisonMode: boolean;
  speed: number;
  size: number;
  isRunning: boolean;
  onAlgorithm1Change: (algorithm: SortingAlgorithm) => void;
  onAlgorithm2Change: (algorithm: SortingAlgorithm) => void;
  onToggleComparisonMode: (value: boolean) => void;
  onSpeedChange: (speed: number) => void;
  onSizeChange: (size: number) => void;
  onStart: () => void;
  onStop: () => void;
  onGenerateNewArray: () => void;
}

export const Controls: FC<ControlsProps> = ({
  algorithm1,
  algorithm2,
  isComparisonMode,
  speed,
  size,
  isRunning,
  onAlgorithm1Change,
  onAlgorithm2Change,
  onToggleComparisonMode,
  onSpeedChange,
  onSizeChange,
  onStart,
  onStop,
  onGenerateNewArray,
}) => {
  // Stati "locali" per slider/input, così evitiamo di rigenerare array di continuo.
  const [localSpeed, setLocalSpeed] = useState(speed);
  const [localSize, setLocalSize] = useState(size);
  const [showInfo, setShowInfo] = useState<SortingAlgorithm | null>(null);

  // Se il valore globale cambia per qualche motivo (reset?), aggiorniamo i locali:
  useEffect(() => {
    setLocalSpeed(speed);
  }, [speed]);

  useEffect(() => {
    setLocalSize(size);
  }, [size]);

  // HANDLER ALGORITHM
  function handleAlgorithm1Select(e: ChangeEvent<HTMLSelectElement>) {
    onAlgorithm1Change(e.target.value as SortingAlgorithm);
  }
  function handleAlgorithm2Select(e: ChangeEvent<HTMLSelectElement>) {
    onAlgorithm2Change(e.target.value as SortingAlgorithm);
  }

  function openInfoPanel(algo: SortingAlgorithm) {
    setShowInfo(algo);
  }

  function closeInfoPanel() {
    setShowInfo(null);
  }

  // HANDLER SPEED
  function handleSpeedSliderChange(e: ChangeEvent<HTMLInputElement>) {
    setLocalSpeed(Number(e.target.value));
  }
  function handleSpeedSliderRelease() {
    onSpeedChange(localSpeed);
  }
  function handleSpeedInputChange(e: ChangeEvent<HTMLInputElement>) {
    setLocalSpeed(Number(e.target.value));
  }
  function handleSpeedInputBlur() {
    onSpeedChange(localSpeed);
  }
  function handleSpeedInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  }

  // HANDLER SIZE
  function handleSizeSliderChange(e: ChangeEvent<HTMLInputElement>) {
    setLocalSize(Number(e.target.value));
  }
  function handleSizeSliderRelease() {
    onSizeChange(localSize);
  }
  function handleSizeInputChange(e: ChangeEvent<HTMLInputElement>) {
    setLocalSize(Number(e.target.value));
  }
  function handleSizeInputBlur() {
    onSizeChange(localSize);
  }
  function handleSizeInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  }

  return (
    <div className="controls-container">
      <label className="toggle">
        <input
          type="checkbox"
          checked={isComparisonMode}
          onChange={(e) => onToggleComparisonMode(e.target.checked)}
          disabled={isRunning}
        />
        Comparison Mode
      </label>

      <div className="wrapper">
        <select
          className="select"
          value={algorithm1}
          onChange={handleAlgorithm1Select}
          disabled={isRunning}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="radix">Radix Sort</option>
          <option value="shaker">Cocktail Shaker Sort</option>
        </select>
        <span className="info-icon" onClick={() => openInfoPanel(algorithm1)}>
          ℹ️
        </span>
      </div>

      {isComparisonMode && (
        <div className="wrapper">
          <select
            className="select"
            value={algorithm2}
            onChange={handleAlgorithm2Select}
            disabled={isRunning}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="radix">Radix Sort</option>
            <option value="shaker">Cocktail Shaker Sort</option>
          </select>
          <span className="info-icon" onClick={() => openInfoPanel(algorithm2)}>
            ℹ️
          </span>
        </div>
      )}

      {/* SPEED */}
      <div className="wrapper">
        <label>Speed: </label>
        <input
          className="number-input"
          type="number"
          min="1"
          max="1000"
          value={localSpeed}
          onChange={handleSpeedInputChange}
          onBlur={handleSpeedInputBlur}
          onKeyDown={handleSpeedInputKeyDown}
          disabled={isRunning}
        />
        <input
          className="slider"
          type="range"
          min="1"
          max="500"
          value={localSpeed}
          onChange={handleSpeedSliderChange}
          onMouseUp={handleSpeedSliderRelease}
          onTouchEnd={handleSpeedSliderRelease}
          disabled={isRunning}
        />
      </div>

      {/* SIZE */}
      <div className="wrapper">
        <label>Size: </label>
        <input
          className="number-input"
          type="number"
          min="5"
          max="500"
          value={localSize}
          onChange={handleSizeInputChange}
          onBlur={handleSizeInputBlur}
          onKeyDown={handleSizeInputKeyDown}
          disabled={isRunning}
        />
        <input
          className="slider"
          type="range"
          min="5"
          max="500"
          value={localSize}
          onChange={handleSizeSliderChange}
          onMouseUp={handleSizeSliderRelease}
          onTouchEnd={handleSizeSliderRelease}
          disabled={isRunning}
        />
      </div>

      {/* START/STOP BUTTON */}
      <button
        className={`button primary`}
        onClick={isRunning ? onStop : onStart}
      >
        {isRunning ? <Square size={16} /> : <Play size={16} />}
        {isRunning ? 'Stop' : 'Start'}
      </button>

      {/* NEW ARRAY */}
      <button
        className={`button secondary`}
        onClick={onGenerateNewArray}
        disabled={isRunning}
      >
        <RefreshCw size={16} />
        New Array
      </button>
      {showInfo && (
        <InfoPanel algorithm={showInfo} onClose={closeInfoPanel} />
      )}
    </div>
  );
};
