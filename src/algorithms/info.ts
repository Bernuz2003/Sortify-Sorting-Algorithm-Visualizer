export const algorithmInfo = {
  bubble: {
    name: 'Bubble Sort',
    description: 'Scambia ripetutamente coppie di elementi adiacenti se fuori ordine.',
    timeComplexity: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
    spaceComplexity: 'O(1)',
    useCase: 'Didattico o array quasi ordinati.'
  },
  insertion: {
    name: 'Insertion Sort',
    description: 'Costruisce gradualmente la sequenza ordinata inserendo ogni elemento al posto giusto.',
    timeComplexity: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
    spaceComplexity: 'O(1)',
    useCase: 'Efficiente per piccoli array quasi ordinati.'
  },
  selection: {
    name: 'Selection Sort',
    description: 'Seleziona ripetutamente il minimo dalla parte non ordinata e lo sposta in testa.',
    timeComplexity: { best: 'O(n^2)', average: 'O(n^2)', worst: 'O(n^2)' },
    spaceComplexity: 'O(1)',
    useCase: 'Semplice ma inefficiente su grandi insiemi.'
  },
  quick: {
    name: 'Quick Sort',
    description: 'Divide ricorsivamente l\'array utilizzando un elemento pivot.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n^2)' },
    spaceComplexity: 'O(log n)',
    useCase: 'Ottimo in media per grandi dataset.'
  },
  merge: {
    name: 'Merge Sort',
    description: 'Divide l\'array a metà e unisce le parti ordinate.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    useCase: 'Stabile e prevedibile, buono per strutture esterne.'
  },
  radix: {
    name: 'Radix Sort',
    description: 'Ordina esaminando le cifre degli elementi, da quella meno significativa alla più.',
    timeComplexity: { best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)' },
    spaceComplexity: 'O(n + k)',
    useCase: 'Ideale per numeri interi con range limitato.'
  },
  shaker: {
    name: 'Cocktail Shaker Sort',
    description: 'Versione bidirezionale del bubble sort che ordina in entrambe le direzioni.',
    timeComplexity: { best: 'O(n)', average: 'O(n^2)', worst: 'O(n^2)' },
    spaceComplexity: 'O(1)',
    useCase: 'Utile per array quasi ordinati.'
  }
} as const;
export type AlgorithmKey = keyof typeof algorithmInfo;
