import { useCallback, useRef } from 'react';
import { ArrayBar, SortingAlgorithm } from '../types';
import * as algorithms from '../algorithms';

export const useSorting = (
  array: ArrayBar[],
  speed: number,
  setArray: (array: ArrayBar[]) => void,
  setIsRunning: (isRunning: boolean) => void
) => {
  const isActiveRef = useRef(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const startSorting = useCallback(async (algorithm: SortingAlgorithm) => {
    isActiveRef.current = true;
    setIsRunning(true);
    
    const sortFunction = algorithms[`${algorithm}Sort`] as (arr: ArrayBar[]) => Generator<ArrayBar[]>;
    const generator = sortFunction([...array]);

    try {
      while (isActiveRef.current) {
        const { value, done } = generator.next();
        if (done) break;
        setArray([...value]);
        await sleep(speed);
      }
    } finally {
      setIsRunning(false);
    }
  }, [array, speed, setArray, setIsRunning]);

  const stopSorting = useCallback(() => {
    isActiveRef.current = false;
  }, []);

  return { startSorting, stopSorting };
};