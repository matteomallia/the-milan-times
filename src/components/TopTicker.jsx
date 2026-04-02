import { useSelector } from 'react-redux';
import styles from '../styles/TopTicker.module.css';

const TopTicker = () => {
  // Estraiamo i dati dallo stato 'news' di Redux
  const { articles, status } = useSelector((state) => state.news);
  const currentLang = useSelector((state) => state.language.current);

  const labels = {
    it: 'ULTIME NOTIZIE',
    en: 'BREAKING NEWS',
    es: 'ÚLTIMAS NOTICIAS'
  };

  // --- CONTROLLO DI SICUREZZA ---
  // Se non siamo in stato 'succeeded' o articles non è un array valido, 
  // restituiamo null. Questo impedisce al resto del codice di mandare in crash l'app.
  if (status !== 'succeeded' || !Array.isArray(articles) || articles.length === 0) {
    return null; 
  }

  // Prendiamo i primi 3 articoli in modo sicuro
  const topArticles = articles.slice(0, 3);

  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.label}>{labels[currentLang] || labels.en}</div>
      <div className={styles.scrollContainer}>
        <div className={styles.scrollText}>
          {topArticles.map((article, index) => (
            // Usiamo l'operatore optional chaining (?.) per sicurezza extra su title
            <span key={`ticker-${index}`} className={styles.tickerItem}>
              {article?.title?.toUpperCase() || 'NEWS'} • 
            </span>
          ))}
          {/* Duplichiamo il contenuto per l'effetto loop infinito */}
          {topArticles.map((article, index) => (
            <span key={`dup-${index}`} className={styles.tickerItem}>
              {article?.title?.toUpperCase() || 'NEWS'} • 
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTicker;