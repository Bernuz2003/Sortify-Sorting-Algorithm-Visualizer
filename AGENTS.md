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

- **Separazione degli Stili**: Attualmente, lo stile è gestito con classi Tailwind CSS direttamente nel JSX o tramite file `.module.css`. L'obiettivo è di passare a file CSS standard per una separazione più netta.
  - **Azione**: Per ogni componente, estrai le classi Tailwind in un file CSS standard dedicato (es. `Controls.css`, `Visualizer.css`).
  - **Implementazione**: Invece di `<div className="p-4 bg-blue-500 rounded">`, crea una classe in `Visualizer.css` come `.visualizer-container { padding: 1rem; background-color: #3b82f6; border-radius: 0.25rem; }` e importa il file CSS nel componente (`import './Visualizer.css'`). Quindi, usa la classe nel JSX: `<div className="visualizer-container">`.
  - **Obiettivo**: Rendere i file `.tsx` completamente puliti dalla logica di stile, separando la struttura (JSX) dalla presentazione (CSS).

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

- **Modalità Confronto**:
  - **Azione**: Implementare una modalità di confronto che permetta all'utente di selezionare due algoritmi diversi e visualizzarli mentre ordinano lo stesso array iniziale, fianco a fianco.
  - **UI**:
    - Aggiungere un interruttore o un pulsante per attivare/disattivare la modalità confronto.
    - Quando attiva, l'interfaccia dei controlli dovrebbe mostrare due selettori di algoritmi.
    - La `Visualizer` dovrebbe dividersi in due pannelli, ognuno dei quali mostra l'animazione per uno degli algoritmi selezionati.
  - **Logica**:
    - L'hook `useSorting` dovrà essere istanziato o modificato per gestire due processi di ordinamento indipendenti ma simultanei.
    - Entrambi i visualizzatori dovrebbero partire dallo stesso array non ordinato.
    - I controlli di velocità e dimensione dovrebbero applicarsi a entrambe le visualizzazioni.

- **Pannello Informativo sugli Algoritmi**:
  - **Azione**: Fornire informazioni dettagliate su ogni algoritmo per migliorare il valore didattico.
  - **UI**:
    - Aggiungere un'icona "info" (`(i)`) accanto al menu a tendina per la selezione dell'algoritmo.
    - Cliccando sull'icona, si dovrebbe aprire un modale o un pannello a comparsa.
  - **Contenuto**:
    - Il pannello dovrebbe contenere:
      - Una breve **descrizione** di come funziona l'algoritmo.
      - La **complessità temporale** (Best, Average, Worst case) in notazione Big O (es. O(n²)).
      - La **complessità spaziale** (es. O(1) per in-place, O(n) per merge sort).
      - Una nota sui **casi d'uso ideali** o sulle sue caratteristiche (es. "Stabile", "Adattivo").
  - **Implementazione**:
    - Creare una struttura dati (es. un oggetto o una mappa in un file `algorithms/info.ts`) che associ ogni nome di algoritmo (`'bubble'`, `'quick'`, ecc.) alle informazioni corrispondenti.
    - Il componente `Controls` recupererà e visualizzerà queste informazioni quando l'utente lo richiede.
