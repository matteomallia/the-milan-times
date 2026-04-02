# 📰 The Milan Times

**The Milan Times** è una Single Page Application (SPA) dinamica ispirata al design iconico del New York Times. Il progetto è stato sviluppato come elaborato per il Master in Front-End Development, focalizzandosi sull'integrazione di API reali, gestione dello stato globale e un'interfaccia utente raffinata.

---

## 🚀 Funzionalità

- **Notizie in Tempo Reale**: Integrazione con l'API *Top Stories* del New York Times per visualizzare le ultime notizie mondiali.
- **Struttura Editoriale**: Layout a tre colonne con griglia responsiva, con evidenza sulla notizia principale al centro.
- **Sistema Multilingua (i18n)**: Gestione completa tramite Redux per passare istantaneamente tra **Italiano**, **Inglese** e **Spagnolo**.
- **Breaking News Ticker**: Barra scorrevole sotto la testata che mostra i titoli dell'ultima ora.
- **Widget Meteo Dinamico**: Visualizzazione del meteo di Milano sincronizzata con la lingua selezionata.
- **Navigazione per Categorie**: Navigazione fluida tra le sezioni Mondo, Economia, Lifestyle e Cucina tramite React Router.

---

## 🛠️ Tech Stack

- **React 18** (Vite come build tool)
- **Redux Toolkit**: Gestione dello stato globale per news e preferenze lingua.
- **React Router Dom**: Gestione del routing e dei parametri URL.
- **Axios**: Chiamate HTTP asincrone verso le API del NYT.
- **CSS Modules**: Styling incapsulato per una manutenibilità superiore.
- **Google Fonts**: Utilizzo di *Playfair Display* e *Libre Franklin* per un look editoriale premium.

---

## 📂 Struttura del Progetto

```text
src/
├── app/            # Configurazione Store Redux
├── components/     # Componenti riutilizzabili (Navbar, Ticker, Weather)
├── features/       # Slice Redux (newsSlice, languageSlice)
├── pages/          # Componenti di pagina (Home)
├── styles/         # CSS Modules
└── main.jsx        # Entry point dell'applicazione