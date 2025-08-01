import { useCallback, useRef, useEffect } from 'react';
import { ArrayBar, SortingAlgorithm } from '../types';
import * as algorithms from '../algorithms';

export const useSorting = (
  array: ArrayBar[],
  speed: number,
  setArray: (array: ArrayBar[]) => void,
  setIsRunning: (isRunning: boolean) => void
) => {
  const isActiveRef = useRef(false);
  const generatorRef = useRef<Generator<ArrayBar[]> | null>(null);
  const algorithmRef = useRef<SortingAlgorithm | null>(null);
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const startSorting = useCallback(async (algorithm: SortingAlgorithm) => {
    if (!generatorRef.current || algorithmRef.current !== algorithm) {
      const sortFunction = algorithms[`${algorithm}Sort`] as (arr: ArrayBar[]) => Generator<ArrayBar[]>;
      generatorRef.current = sortFunction([...array]);
      algorithmRef.current = algorithm;
    }

    isActiveRef.current = true;
    setIsRunning(true);

    try {
      while (isActiveRef.current && generatorRef.current) {
        const { value, done } = generatorRef.current.next();
        if (done) {
          generatorRef.current = null;
          break;
        }
        setArray([...value]);
        const delay = Math.max(1, 1000 / speedRef.current);
        await sleep(delay);
      }
    } finally {
      isActiveRef.current = false;
      setIsRunning(false);
    }
  }, [array, setArray, setIsRunning]);

  const stopSorting = useCallback(() => {
    isActiveRef.current = false;
  }, []);

  return { startSorting, stopSorting };
};