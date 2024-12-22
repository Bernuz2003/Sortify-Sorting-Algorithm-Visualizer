import { ArrayBar } from '../types';

export function* bubbleSort(array: ArrayBar[]) {
  const n = array.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      array[j].state = 'active';
      array[j + 1].state = 'active';
      yield array;

      if (array[j].value > array[j + 1].value) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        yield array;
      }

      array[j].state = 'default';
      array[j + 1].state = 'default';
    }
    array[n - i - 1].state = 'sorted';
  }
  array[0].state = 'sorted';
}

export function* insertionSort(array: ArrayBar[]) {
  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    array[i].state = 'active';
    yield array;

    while (j >= 0 && array[j].value > key.value) {
      array[j + 1] = array[j];
      array[j].state = 'active';
      yield array;
      array[j].state = 'default';
      j--;
    }

    array[j + 1] = key;
    array[i].state = 'sorted';
    yield array;
  }

  for (let i = 0; i < array.length; i++) {
    array[i].state = 'sorted';
  }
}

export function* selectionSort(array: ArrayBar[]) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIdx = i;
    array[i].state = 'active';
    
    for (let j = i + 1; j < array.length; j++) {
      array[j].state = 'active';
      yield array;
      
      if (array[j].value < array[minIdx].value) {
        array[minIdx].state = 'default';
        minIdx = j;
      } else {
        array[j].state = 'default';
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      yield array;
    }
    
    array[i].state = 'sorted';
  }
  array[array.length - 1].state = 'sorted';
}

export function* quickSort(array: ArrayBar[], low = 0, high = array.length - 1): Generator<ArrayBar[]> {
  if (low < high) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      array[j].state = 'active';
      pivot.state = 'active';
      yield array;

      if (array[j].value < pivot.value) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        yield array;
      }

      array[j].state = 'default';
      pivot.state = 'default';
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    const pivotIndex = i + 1;
    array[pivotIndex].state = 'sorted';
    yield array;

    yield* quickSort(array, low, pivotIndex - 1);
    yield* quickSort(array, pivotIndex + 1, high);
  }
}

export function* mergeSort(array: ArrayBar[], left = 0, right = array.length - 1): Generator<ArrayBar[]> {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    yield* mergeSort(array, left, mid);
    yield* mergeSort(array, mid + 1, right);
    yield* merge(array, left, mid, right);
  }
}

function* merge(array: ArrayBar[], left: number, mid: number, right: number) {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  const L = array.slice(left, mid + 1);
  const R = array.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < n1 && j < n2) {
    array[k].state = 'active';
    yield array;

    if (L[i].value <= R[j].value) {
      array[k] = { ...L[i], state: 'active' };
      i++;
    } else {
      array[k] = { ...R[j], state: 'active' };
      j++;
    }
    yield array;
    array[k].state = 'sorted';
    k++;
  }

  while (i < n1) {
    array[k] = { ...L[i], state: 'active' };
    yield array;
    array[k].state = 'sorted';
    i++;
    k++;
  }

  while (j < n2) {
    array[k] = { ...R[j], state: 'active' };
    yield array;
    array[k].state = 'sorted';
    j++;
    k++;
  }
}