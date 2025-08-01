# Sortify - Sorting Algorithm Visualizer

![Sorting Visualizer](https://github.com/Bernuz2003/Sortify-Sorting-Algorithm-Visualizer/blob/master/media/screen_Sortify.png)

Questo è un progetto web interattivo creato per visualizzare il funzionamento di vari algoritmi di ordinamento. L'applicazione permette agli utenti di generare un array di dati e osservare in tempo reale come gli algoritmi lo manipolano per ordinarlo, passo dopo passo.

## 📜 Descrizione

Sortify è uno strumento educativo e dimostrativo che rende accessibile la comprensione di algoritmi di ordinamento complessi. Gli utenti possono:
- **Generare** un array di dimensione e velocità personalizzate.
- Scegliere tra diversi **algoritmi classici** di ordinamento.
- **Avviare** la visualizzazione e osservare l'animazione che mostra gli scambi e i confronti tra gli elementi.
- **Mettere in pausa** e riprendere l'esecuzione per analizzare passaggi specifici.

L'interfaccia è stata progettata per essere intuitiva e reattiva, offrendo un'esperienza utente chiara e coinvolgente.

## ✨ Caratteristiche

- **Visualizzazione Animata**: Le animazioni mostrano passo dopo passo il processo di ordinamento di ogni algoritmo, aiutando a capirne la logica interna e le differenze di performance.
- **Controlli Interattivi**: Pieno controllo sulla visualizzazione tramite slider per modificare la dimensione dell'array e la velocità dell'animazione.
- **Algoritmi Multipli**: Supporto per i seguenti algoritmi:
  - **Bubble Sort**: Un semplice algoritmo di ordinamento che scorre ripetutamente la lista, confronta elementi adiacenti e li scambia se sono nell'ordine sbagliato.
  - **Selection Sort**: Un algoritmo che divide la lista in una sottolista ordinata e una non ordinata, e sposta iterativamente l'elemento minimo dalla parte non ordinata a quella ordinata.
  - **Insertion Sort**: Costruisce l'array ordinato finale un elemento alla volta, inserendo ogni elemento nella sua posizione corretta.
  - **Merge Sort**: Un efficiente algoritmo "divide et impera" che divide l'array in due metà, le ordina ricorsivamente e poi le fonde.
  - **Quick Sort**: Un altro algoritmo "divide et impera" che sceglie un elemento "pivot" e partiziona gli altri elementi in due sotto-array, a seconda che siano minori o maggiori del pivot.
- **Controlli di Esecuzione**: Possibilità di avviare, mettere in pausa e riprendere l'animazione in qualsiasi momento.
- **Design Moderno e Responsivo**: L'interfaccia utente è pulita e si adatta per offrire la migliore esperienza visiva.

## 🚀 Installazione ed Avvio Locale

Per eseguire il progetto in locale, segui questi passaggi:

1.  **Clona la repository**
    ```bash
    git clone https://github.com/Bernuz2003/Sortify-Sorting-Algorithm-Visualizer.git
    ```

2.  **Entra nella cartella del progetto**
    ```bash
    cd Sortify-Sorting-Algorithm-Visualizer
    ```

3.  **Installa le dipendenze**
    Il progetto utilizza `npm` per la gestione dei pacchetti.
    ```bash
    npm install
    ```

4.  **Avvia il server di sviluppo**
    Questo comando avvierà l'applicazione in modalità sviluppo con Vite.
    ```bash
    npm run dev
    ```
    Apri il browser e naviga all'indirizzo indicato nel terminale (solitamente `http://localhost:5173`) per vedere l'applicazione in funzione.

## 🎥 Video Dimostrativo
[Guarda il video dimostrativo](https://github.com/Bernuz2003/Sortify-Sorting-Algorithm-Visualizer/blob/master/media/reg_Sortify.mp4)

## 🛠️ Tecnologie Utilizzate

-   **Linguaggio**: [TypeScript](https://www.typescriptlang.org/)
-   **Framework Frontend**: [React](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **State Management**: React Hooks (`useState`, `useRef`) per la gestione dello stato.
-   **Styling**: CSS tradizionale importato nei componenti.
-   **Linting**: [ESLint](https://eslint.org/) per il controllo della qualità del codice.

