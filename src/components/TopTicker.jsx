import { useSelector } from 'react-redux';
import { translations } from '../data/translations';
import styles from '../styles/TopTicker.module.css';

const TopTicker = () => {
  const { articles, status } = useSelector((state) => state.news);
  const currentLang = useSelector((state) => state.language.current);

  // Recuperiamo le traduzioni centralizzate basandoci sulla lingua dello stato Redux
  const t = translations[currentLang] || translations.en;

  if (status !== 'succeeded' || !Array.isArray(articles) || articles.length === 0) {
    return null;
  }

  const topArticles = articles.slice(0, 3);

  return (
    <div className={styles.tickerWrapper}>
      {/* Usiamo la traduzione centralizzata */}
      <div className={styles.label}>{t.ticker.label}</div>
      <div className={styles.scrollContainer}>
        <div className={styles.scrollText}>
          {topArticles.map((article) => (
            // Usiamo article.uri come richiesto da Giorgio nel punto 6 per evitare l'uso di index
            <span key={article.uri} className={styles.tickerItem}>
              {article?.title?.toUpperCase() || t.ticker.fallback} • 
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTicker;