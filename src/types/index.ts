export type SortingAlgorithm = 'bubble' | 'insertion' | 'selection' | 'quick' | 'merge' | 'radix' | 'shaker';

export interface ArrayBar {
  value: number;
  state: 'default' | 'active' | 'sorted';
}

export interface SortingState {
  array: ArrayBar[];
  isRunning: boolean;
  algorithm: SortingAlgorithm;
  speed: number;
  size: number;
}