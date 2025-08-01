import React, { useState, ChangeEvent } from 'react';
import { Play, Square, RefreshCw } from 'lucide-react';
import { SortingAlgorithm } from '../types';
import styles from './Controls.module.css';

interface ControlsProps {
  algorithm: SortingAlgorithm;
  speed: number;       // Stato "globale" da App
  size: number;        // Stato "globale" da App
  isRunning: boolean;
  onAlgorithmChange: (algorithm: SortingAlgorithm) => void;
  onSpeedChange: (speed: number) => void;
  onSizeChange: (size: number) => void;
  onStart: () => void;
  onStop: () => void;
  onGenerateNewArray: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  algorithm,
  speed,
  size,
  isRunning,
  onAlgorithmChange,
  onSpeedChange,
  onSizeChange,
  onStart,
  onStop,
  onGenerateNewArray,
}) => {
  // Stati "locali" per slider/input, così evitiamo di rigenerare array di continuo.
  const [localSpeed, setLocalSpeed] = useState(speed);
  const [localSize, setLocalSize] = useState(size);

  // Se il valore globale cambia per qualche motivo (reset?), aggiorniamo i locali:
  React.useEffect(() => {
    setLocalSpeed(speed);
  }, [speed]);

  React.useEffect(() => {
    setLocalSize(size);
  }, [size]);

  // HANDLER ALGORITMO
  function handleAlgorithmSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    onAlgorithmChange(e.target.value as SortingAlgorithm);
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
  function handleSpeedInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
  function handleSizeInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  }

  return (
    <div className={styles.controlsContainer}>
      {/* ALGORITHM SELECT */}
      <select
        className={`${styles.select} ${styles.wrapper}`}
        value={algorithm}
        onChange={handleAlgorithmSelect}
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

      {/* SPEED */}
      <div className={styles.wrapper}>
        <label>Speed: </label>
        <input
          className={styles.numberInput}
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
          className={styles.slider}
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
      <div className={styles.wrapper}>
        <label>Size: </label>
        <input
          className={styles.numberInput}
          type="number"
          min="5"
          max="300"
          value={localSize}
          onChange={handleSizeInputChange}
          onBlur={handleSizeInputBlur}
          onKeyDown={handleSizeInputKeyDown}
          disabled={isRunning}
        />
        <input
          className={styles.slider}
          type="range"
          min="5"
          max="300"
          value={localSize}
          onChange={handleSizeSliderChange}
          onMouseUp={handleSizeSliderRelease}
          onTouchEnd={handleSizeSliderRelease}
          disabled={isRunning}
        />
      </div>

      {/* START/STOP BUTTON */}
      <button
        className={`${styles.button} ${styles.primary}`}
        onClick={isRunning ? onStop : onStart}
      >
        {isRunning ? <Square size={16} /> : <Play size={16} />}
        {isRunning ? 'Stop' : 'Start'}
      </button>

      {/* NEW ARRAY */}
      <button
        className={`${styles.button} ${styles.secondary}`}
        onClick={onGenerateNewArray}
        disabled={isRunning}
      >
        <RefreshCw size={16} />
        New Array
      </button>
    </div>
  );
};
