import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchNews } from '../features/news/newsSlice'; // Importazione dell'azione asincrona [cite: 606]
import styles from '../styles/Home.module.css'; // Utilizzo dei CSS Modules [cite: 345, 346]

const Home = () => {
  const { id } = useParams(); // Hook di React Router per i parametri URL [cite: 79]
  const dispatch = useDispatch(); // Hook per inviare azioni allo store [cite: 502, 509]
  
  // Selezione degli stati globali da Redux [cite: 489, 497]
  const { articles, status, error } = useSelector((state) => state.news);
  const currentLang = useSelector((state) => state.language.current);

  // Messaggi di stato multilingua
  const messages = {
    it: { loading: 'Caricamento notizie...', error: 'Errore nel caricamento dei dati', noData: 'Nessuna notizia disponibile.', readMore: 'Leggi di più' },
    en: { loading: 'Loading news...', error: 'Error loading data', noData: 'No news available.', readMore: 'Read more' },
    es: { loading: 'Cargando noticias...', error: 'Error al cargar datos', noData: 'No hay noticias disponibles.', readMore: 'Leer más' }
  };

  const m = messages[currentLang];

  useEffect(() => {
    // Effetto collaterale: recupero dati all'avvio o al cambio categoria [cite: 181, 182]
    dispatch(fetchNews(id || 'world')); 
    window.scrollTo(0, 0); // Riporta l'utente in cima alla pagina [cite: 550]
  }, [dispatch, id]);

  // 1. Stato di caricamento (Loading) [cite: 549, 557]
  if (status === 'loading') {
    return <div className="status-msg">{m.loading}</div>;
  }

  // 2. Stato di errore (Error) [cite: 558, 567]
  if (status === 'failed') {
    return (
      <div className="status-msg" style={{ color: 'red' }}>
        {m.error}: {error}
      </div>
    );
  }

  // 4. Stato di "no data" [cite: 589, 597]
  if (status === 'succeeded' && articles.length === 0) {
    return <div className="status-msg">{m.noData}</div>;
  }

  // Dividiamo gli articoli per la struttura a tre colonne (Stato di Successo) [cite: 576, 582]
  const leftArticles = articles.slice(0, 3);
  const centerArticles = articles.slice(3, 8);
  const rightArticles = articles.slice(8, 12);

  // Funzione modulare per renderizzare la card dell'articolo [cite: 89, 108]
  const renderArticle = (article, index) => (
    <article key={index} className={styles.articleCard}>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.articleLink}>
        {article.multimedia && article.multimedia.length > 0 && (
          <div className={styles.imageWrapper}>
            <img src={article.multimedia[0].url} alt={article.title} />
          </div>
        )}
        <div className={styles.content}>
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.abstract}>{article.abstract}</p>
          <div className={styles.footerInfo}>
            <span className={styles.author}>{article.byline}</span>
            <span className={styles.readMore}>{m.readMore} →</span>
          </div>
        </div>
      </a>
    </article>
  );

  return (
    <div className="container">
      <div className={styles.mainLayout}>
        {/* Colonna Sinistra: Notizie Secondarie */}
        <aside className={styles.column}>
          {leftArticles.map(renderArticle)}
        </aside>

        {/* Colonna Centrale: Notizie Principali */}
        <main className={`${styles.column} ${styles.centerColumn}`}>
          {centerArticles.map(renderArticle)}
        </main>

        {/* Colonna Destra: Approfondimenti */}
        <aside className={styles.column}>
          {rightArticles.map(renderArticle)}
        </aside>
      </div>
    </div>
  );
};

export default Home;