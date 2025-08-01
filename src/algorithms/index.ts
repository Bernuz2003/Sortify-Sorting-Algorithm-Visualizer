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

export function* quickSort(
  array: ArrayBar[],
  low = 0,
  high = array.length - 1
): Generator<ArrayBar[]> {
  // Se l'intervallo è valido
  if (low < high) {
    const pivot = array[high];
    let i = low - 1;

    // Fase di partizionamento
    for (let j = low; j < high; j++) {
      // Evidenziamo l'elemento in esame e il pivot
      array[j].state = 'active';
      pivot.state = 'active';
      yield array;

      // Se array[j] < pivot, incrementiamo i e scambiamo array[i] e array[j]
      if (array[j].value < pivot.value) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        yield array;
      }

      // Ritorno allo stato di default dopo il confronto
      array[j].state = 'default';
      pivot.state = 'default';
    }

    // Mettiamo il pivot nella sua posizione definitiva
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    const pivotIndex = i + 1;

    // Poiché il pivot è adesso nella sua posizione finale, coloriamolo di verde
    array[pivotIndex].state = 'sorted';
    yield array;

    // Ricorsione a sinistra
    yield* quickSort(array, low, pivotIndex - 1);
    // Ricorsione a destra
    yield* quickSort(array, pivotIndex + 1, high);
  }

  // Se siamo tornati alla chiamata iniziale (quella che copre tutto l'array),
  // coloriamo TUTTE le barre di verde per assicurarci che anche
  // chi non è mai stato pivot sia in "sorted".
  if (low === 0 && high === array.length - 1) {
    for (let i = 0; i < array.length; i++) {
      array[i].state = 'sorted';
    }
    yield array;
  }
}


export function* mergeSort(
  array: ArrayBar[],
  left = 0,
  right = array.length - 1
): Generator<ArrayBar[]> {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Ricorsione sulla metà sinistra
    yield* mergeSort(array, left, mid);

    // Ricorsione sulla metà destra
    yield* mergeSort(array, mid + 1, right);

    // Unione delle due metà
    yield* merge(array, left, mid, right);
  }

  // Se abbiamo terminato la ricorsione nel chiamante principale
  // (ovvero stiamo tornando dalla chiamata iniziale che copriva tutto l’array),
  // coloriamo tutte le barre come "sorted"
  if (left === 0 && right === array.length - 1) {
    for (let i = 0; i < array.length; i++) {
      array[i].state = 'sorted';
    }
    yield array; // Mostra il risultato finale
  }
}

function* merge(
  array: ArrayBar[],
  left: number,
  mid: number,
  right: number
): Generator<ArrayBar[]> {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  // Copie temporanee delle due metà
  const L = array.slice(left, mid + 1);
  const R = array.slice(mid + 1, right + 1);

  let i = 0;    // indice della sottostruttura L
  let j = 0;    // indice della sottostruttura R
  let k = left; // indice nell'array principale

  // Finché ci sono elementi in L e R, li confrontiamo
  while (i < n1 && j < n2) {
    // Mettiamo in stato "active" la posizione dove inseriremo
    array[k].state = 'active';
    yield array;

    if (L[i].value <= R[j].value) {
      // Copiamo l'elemento da L
      array[k] = { ...L[i], state: 'active' };
      i++;
    } else {
      // Copiamo l'elemento da R
      array[k] = { ...R[j], state: 'active' };
      j++;
    }

    yield array;

    // Torniamo allo stato "default" 
    array[k].state = 'default';

    k++;
  }

  // Se rimangono elementi in L
  while (i < n1) {
    array[k].state = 'active';
    yield array;

    array[k] = { ...L[i], state: 'active' };
    yield array;

    array[k].state = 'default';

    i++;
    k++;
  }

  // Se rimangono elementi in R
  while (j < n2) {
    array[k].state = 'active';
    yield array;

    array[k] = { ...R[j], state: 'active' };
    yield array;

    array[k].state = 'default';

    j++;
    k++;
  }
}



export function* radixSort(array: ArrayBar[]): Generator<ArrayBar[]> {
  // Trova il valore massimo nell'array (necessario per sapere quante "cifre" gestire)
  const maxVal = Math.max(...array.map((bar) => bar.value));

  // exp rappresenta il fattore moltiplicativo per accedere alla cifra di interesse
  // (unità, decine, centinaia, ecc.)
  for (let exp = 1; Math.floor(maxVal / exp) > 0; exp *= 10) {
    // Creiamo 10 "bucket", uno per ciascuna cifra da 0 a 9
    const buckets: ArrayBar[][] = Array.from({ length: 10 }, () => []);

    // Distribuiamo gli elementi nei rispettivi bucket in base alla cifra corrente
    for (let i = 0; i < array.length; i++) {
      // Segna l'elemento come attivo
      array[i].state = 'active';
      yield array;

      // Estrae la cifra corrispondente per exp
      const digit = Math.floor((array[i].value / exp) % 10);

      // Inserisce l'elemento nel bucket corrispondente
      buckets[digit].push(array[i]);

      // Reimposta lo stato a default
      array[i].state = 'default';
    }

    // Ricompone l'array prendendo gli elementi dai bucket in ordine
    let index = 0;
    for (let b = 0; b < 10; b++) {
      for (const bar of buckets[b]) {
        array[index] = bar;
        // Mostra il passo dell'ordinamento
        yield array;
        index++;
      }
    }
  }

  // Una volta terminati tutti i passaggi, segniamo tutti gli elementi come "sorted"
  for (let i = 0; i < array.length; i++) {
    array[i].state = 'sorted';
  }
  yield array; // Yield finale per mostrare la disposizione ordinata
}


export function* cocktailShakerSort(array: ArrayBar[]): Generator<ArrayBar[]> {
  let start = 0;
  let end = array.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;

    // Passata da sinistra a destra
    for (let i = start; i < end; i++) {
      // Mettiamo in evidenza gli elementi che stiamo confrontando
      array[i].state = 'active';
      array[i + 1].state = 'active';
      yield array;

      // Se l'elemento a sinistra è più grande di quello a destra, scambiamoli
      if (array[i].value > array[i + 1].value) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        swapped = true;
        yield array; // Mostriamo la situazione dopo lo scambio
      }

      // Torniamo allo stato di default
      array[i].state = 'default';
      array[i + 1].state = 'default';
    }

    // Dopo la passata, possiamo considerare la posizione `end` già "in ordine"
    array[end].state = 'sorted';
    end--;

    // Se non ci sono stati scambi in questa passata, l’array è già ordinato
    if (!swapped) break;

    swapped = false;

    // Passata da destra a sinistra
    for (let i = end; i > start; i--) {
      array[i].state = 'active';
      array[i - 1].state = 'active';
      yield array;

      // Confrontiamo e scambiamo se necessario
      if (array[i - 1].value > array[i].value) {
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        swapped = true;
        yield array;
      }

      array[i].state = 'default';
      array[i - 1].state = 'default';
    }

    // Anche `start` ormai ospita un valore correttamente piazzato (il più piccolo)
    array[start].state = 'sorted';
    start++;
  }

  // Alla fine, segniamo tutto come "sorted"
  for (let i = 0; i < array.length; i++) {
    array[i].state = 'sorted';
  }
  yield array; // Yield finale per mostrare l’array interamente ordinato
}

export { cocktailShakerSort as shakerSort };
