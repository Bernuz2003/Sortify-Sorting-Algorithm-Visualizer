# Istruzioni per l'Agente AI - Progetto Sortify

Questo documento definisce le linee guida e gli obiettivi per l'agente AI incaricato di analizzare, correggere e migliorare il progetto **Sortify - Sorting Algorithm Visualizer**.

## 🎯 Obiettivo Principale

L'obiettivo è trasformare **Sortify** in uno strumento didattico impeccabile, robusto e performante. L'agente deve analizzare a fondo il codice sorgente, identificare le aree di debolezza e implementare soluzioni efficaci per migliorare la funzionalità, la manutenibilità e l'esperienza utente.

---

## 📝 Task Fondamentali

### 1. Analisi e Comprensione Approfondita del Progetto

Prima di apportare qualsiasi modifica, è cruciale comprendere l'architettura attuale del progetto.

- **Analizza la Struttura delle Cartelle**: Studia come sono organizzati i componenti, gli hook, gli stili e gli algoritmi.
- **Comprendi il Flusso dei Dati**: Mappa come lo stato viene gestito e propagato tra i componenti (es. `App.tsx`, `Controls.tsx`, `Visualizer.tsx`).
- **Studia la Logica di Ordinamento**: Esamina l'hook `useSorting.ts` per capire come vengono gestite le animazioni, lo stato di ordinamento e le interazioni dell'utente.

### 2. Verifica e Correzione degli Algoritmi di Ordinamento

La corretta implementazione degli algoritmi è il cuore del progetto.

- **Controllo di Correttezza**: Verifica che ogni algoritmo (`Bubble Sort`, `Selection Sort`, `Insertion Sort`, `Merge Sort`, `Quick Sort`) sia implementato correttamente secondo la sua definizione teorica.
- **Gestione dei Casi Limite**: Assicurati che gli algoritmi funzionino correttamente con array già ordinati, ordinati al contrario o con elementi duplicati.
- **Correzione Bug**: Se trovi discrepanze o errori logici, correggili documentando chiaramente la modifica.

### 3. Refactoring della Struttura del Progetto

L'organizzazione del codice deve essere migliorata per favorire la manutenibilità.

- **Separazione degli Stili**: Attualmente, lo stile è gestito principalmente con classi Tailwind CSS direttamente nel JSX.
  - **Azione**: Estrai le classi Tailwind in file CSS dedicati per ogni componente (`.css` o `.module.css`). Utilizza la direttiva `@apply` di Tailwind per raggruppare le utility in classi semantiche.
  - **Esempio**: Invece di `<div className="p-4 bg-blue-500 rounded">`, crea un file `Visualizer.css` con `.visualizer-container { @apply p-4 bg-blue-500 rounded; }` e usalo nel componente con `<div className="visualizer-container">`.
  - **Obiettivo**: Rendere i file `.tsx` più puliti e leggibili, separando la logica dalla presentazione.

### 4. Ottimizzazione delle Performance

L'esperienza utente è compromessa da problemi di velocità e controllo.

- **Migliora la Velocità di Esecuzione**: La velocità massima dell'animazione è troppo lenta.
  - **Azione**: Rivedi la logica di `setTimeout` o del meccanismo di delay in `useSorting.ts`. Riduci drasticamente il delay minimo per la velocità massima, portandolo a un valore molto basso (es. 1-5 ms) per rendere l'animazione quasi istantanea.
- **Correggi la Funzionalità di Pausa/Ripresa**: Attualmente, riprendendo l'esecuzione, l'algoritmo riparte da capo.
  - **Azione**: Implementa una gestione dello stato che salvi l'indice corrente (o lo stato completo) dell'algoritmo quando viene messo in pausa. Al momento della ripresa, l'esecuzione deve continuare esattamente da dove si era interrotta, senza generare un nuovo array o riavviare l'ordinamento. Usa `useRef` per mantenere lo stato dell'iterazione tra i render.

---

## 💡 Miglioramenti Aggiuntivi Suggeriti

Una volta completati i task fondamentali, considera le seguenti migliorie per arricchire ulteriormente il progetto:

- **Aggiunta di Nuovi Algoritmi**:
  - Implementa algoritmi più avanzati come **Heap Sort**, **Radix Sort** o **Shell Sort** per offrire un set di strumenti più completo.

- **Visualizzazione di Statistiche**:
  - Mostra dati utili al termine di ogni ordinamento, come:
    - **Numero di confronti**
    - **Numero di accessi/scambi all'array**
    - **Tempo di esecuzione effettivo** (in millisecondi)
  - Questo arricchisce il valore didattico, permettendo un confronto oggettivo tra gli algoritmi.

- **Miglioramento dell'Accessibilità (a11y)**:
  - Rendi l'interfaccia navigabile da tastiera.
  - Aggiungi attributi ARIA per descrivere lo stato degli elementi (es. `aria-valuenow` per gli slider, `aria-live` per le notifiche).

- **Implementazione di Test Unitari**:
  - Scrivi test (usando `Vitest` o `Jest` con `React Testing Library`) per gli algoritmi di ordinamento e per la logica dei componenti, garantendo che le future modifiche non introducano regressioni.

- **Tema Scuro/Chiaro**:
  - Aggiungi un interruttore per permettere all'utente di scegliere tra un tema chiaro e uno scuro, migliorando l'usabilità in diverse condizioni di luce.

- **Salvataggio delle Impostazioni Utente**:
  - Usa `localStorage` per salvare le preferenze dell'utente (es. velocità, dimensione dell'array, algoritmo selezionato) tra una sessione e l'altra.
