import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Play, Square, RefreshCw } from 'lucide-react';
import { SortingAlgorithm } from '../types';

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const Select = styled.select`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  cursor: pointer;
`;

const Slider = styled.input`
  width: 150px;
`;

const NumberInput = styled.input`
  width: 60px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: 4px;
  text-align: center;

  /* Rimuove le freccette da Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Rimuove le freccette da Firefox */
  [type=number] {
    -moz-appearance: textfield;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.accent : theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

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
    <ControlsContainer>
      {/* ALGORITHM SELECT */}
      <Select style={{ marginLeft: '20px', marginRight: '20px' }}
        value={algorithm}
        onChange={handleAlgorithmSelect}
        disabled={isRunning}
      >
        <option value="bubble">Bubble Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="merge">Merge Sort</option>
      </Select>

      {/* SPEED */}
      <div style={{ marginLeft: '30px', marginRight: '30px' }}>
        <label>Delay: </label>
        {/* Input numerico, disabilitato quando isRunning */}
        <NumberInput
          type="number"
          min="1"
          max="1000"
          value={localSpeed}
          onChange={handleSpeedInputChange}
          onBlur={handleSpeedInputBlur}
          onKeyDown={handleSpeedInputKeyDown}
          disabled={isRunning}
        />

        {/* Slider, disabilitato quando isRunning */}
        <Slider style={{ marginLeft: '20px', marginRight: '20px', width: '250px' }}
          type="range"
          min="1"
          max="1000"
          value={localSpeed}
          onChange={handleSpeedSliderChange}
          onMouseUp={handleSpeedSliderRelease}
          onTouchEnd={handleSpeedSliderRelease}
          disabled={isRunning}
        />
      </div>

      {/* SIZE */}
      <div style={{ marginLeft: '30px', marginRight: '30px' }}>
        <label>Size: </label>
        {/* Input numerico, disabilitato quando isRunning */}
        <NumberInput
          type="number"
          min="5"
          max="300"
          value={localSize}
          onChange={handleSizeInputChange}
          onBlur={handleSizeInputBlur}
          onKeyDown={handleSizeInputKeyDown}
          disabled={isRunning}
        />

        {/* Slider, disabilitato quando isRunning */}
        <Slider style={{ marginLeft: '20px', marginRight: '20px', width: '250px' }}
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
      <Button onClick={isRunning ? onStop : onStart} variant="primary">
        {isRunning ? <Square size={16} /> : <Play size={16} />}
        {isRunning ? 'Stop' : 'Start'}
      </Button>

      {/* NEW ARRAY */}
      <Button onClick={onGenerateNewArray} disabled={isRunning}>
        <RefreshCw size={16} />
        New Array
      </Button>
    </ControlsContainer>
  );
};
