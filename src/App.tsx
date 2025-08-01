import { useState, useCallback, useEffect } from 'react';
import { Controls } from './components/Controls';
import { Visualizer } from './components/Visualizer';
import { ArrayBar, SortingAlgorithm } from './types';
import { useSorting } from './hooks/useSorting';

function App() {
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [array1, setArray1] = useState<ArrayBar[]>(() => generateArray(50));
  const [array2, setArray2] = useState<ArrayBar[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm1, setAlgorithm1] = useState<SortingAlgorithm>('bubble');
  const [algorithm2, setAlgorithm2] = useState<SortingAlgorithm>('insertion');
  const [speed, setSpeed] = useState(200);
  const [size, setSize] = useState(50);

  function generateArray(size: number): ArrayBar[] {
    return Array.from({ length: size }, () => ({
      value: Math.floor(Math.random() * 496) + 5,
      state: 'default',
    }));
  }

  // When comparison mode is activated, clone the first array
  useEffect(() => {
    if (isComparisonMode) {
      setArray2([...array1]);
    }
  }, [isComparisonMode, array1]);

  const handleGenerateNewArray = useCallback(() => {
    const newArr = generateArray(size);
    setArray1(newArr);
    if (isComparisonMode) {
      setArray2([...newArr]);
    }
  }, [size, isComparisonMode]);


  function handleSizeChange(newSize: number) {
    setSize(newSize);
    const newArr = generateArray(newSize);
    setArray1(newArr);
    if (isComparisonMode) {
      setArray2([...newArr]);
    }
  }

  const sorter1 = useSorting(array1, speed, setArray1, setIsRunning);
  const sorter2 = useSorting(array2, speed, setArray2, setIsRunning);

  const handleStart = () => {
    sorter1.startSorting(algorithm1);
    if (isComparisonMode) {
      sorter2.startSorting(algorithm2);
    }
  };

  const handleStop = () => {
    sorter1.stopSorting();
    if (isComparisonMode) {
      sorter2.stopSorting();
    }
  };

  return (
    <div className="app-container">
      <Controls
        algorithm1={algorithm1}
        algorithm2={algorithm2}
        isComparisonMode={isComparisonMode}
        speed={speed}
        size={size}
        isRunning={isRunning}
        onAlgorithm1Change={setAlgorithm1}
        onAlgorithm2Change={setAlgorithm2}
        onToggleComparisonMode={setIsComparisonMode}
        onSpeedChange={setSpeed}
        onSizeChange={handleSizeChange}
        onStart={handleStart}
        onStop={handleStop}
        onGenerateNewArray={handleGenerateNewArray}
      />
      <Visualizer
        bars1={array1}
        bars2={array2}
        isComparisonMode={isComparisonMode}
      />
    </div>
  );
}

export default App;