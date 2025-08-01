import { useState, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { Controls } from './components/Controls';
import { Visualizer } from './components/Visualizer';
import { theme, GlobalStyle } from './styles/theme';
import { ArrayBar, SortingAlgorithm } from './types';
import { useSorting } from './hooks/useSorting';

function App() {
  const [array, setArray] = useState<ArrayBar[]>(() => generateArray(50));
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [speed, setSpeed] = useState(200);
  const [size, setSize] = useState(50);

  function generateArray(size: number): ArrayBar[] {
    return Array.from({ length: size }, () => ({
      value: Math.floor(Math.random() * 496) + 5,
      state: 'default',
    }));
  }

  const handleGenerateNewArray = useCallback(() => {
    setArray(generateArray(size));
  }, [size]);


  function handleSizeChange(newSize: number) {
    setSize(newSize);
    // Se rigeneri l’array appena cambia size:
    setArray(generateArray(newSize));
  }

  const { startSorting, stopSorting } = useSorting(array, speed, setArray, setIsRunning);

  const handleStart = () => {
    startSorting(algorithm);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="p-4">
        <Controls
          algorithm={algorithm}
          speed={speed}
          size={size}
          isRunning={isRunning}
          onAlgorithmChange={setAlgorithm}
          onSpeedChange={setSpeed}
          onSizeChange={handleSizeChange}
          onStart={handleStart}
          onStop={stopSorting}
          onGenerateNewArray={handleGenerateNewArray}
        />
        <Visualizer bars={array} />
      </div>
    </ThemeProvider>
  );
}

export default App;