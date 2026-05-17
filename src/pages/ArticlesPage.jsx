import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchNews } from '../features/news/newsSlice';
import { translations } from '../data/translations';
import ArticleCard from '../components/ArticleCard';
import styles from '../styles/Home.module.css';

const ArticlesPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { articles, status, error } = useSelector((state) => state.news);
  const currentLang = useSelector((state) => state.language.current);


  const t = translations[currentLang] || translations.en;

  useEffect(() => {
    dispatch(fetchNews(id || 'world')); 
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div className="status-message">{t.status.loading}</div>;
  }

  if (status === 'failed') {
    return (
      <div className="status-message" style={{ color: 'red' }}>
        {t.status.error}: {error}
      </div>
    );
  }

  if (status === 'succeeded' && articles.length === 0) {
    return <div className="status-message">{t.status.empty}</div>;
  }

  const leftArticles = articles.slice(0, 3);
  const centerArticles = articles.slice(3, 8);
  const rightArticles = articles.slice(8, 12);

  return (
    <div className="container">
      <div className={styles.mainLayout}>
        {/* Colonna Sinistra: Notizie Secondarie */}
        <aside className={styles.column}>
          {leftArticles.map((article) => (
            <ArticleCard key={article.uri} article={article} readMoreText={t.article.readMore} />
          ))}
        </aside>

        {/* Colonna Centrale: Notizie Principali */}
        <main className={`${styles.column} ${styles.centerColumn}`}>
          {centerArticles.map((article) => (
            <ArticleCard key={article.uri} article={article} readMoreText={t.article.readMore} />
          ))}
        </main>

        {/* Colonna Destra: Approfondimenti */}
        <aside className={styles.column}>
          {rightArticles.map((article) => (
            <ArticleCard key={article.uri} article={article} readMoreText={t.article.readMore} />
          ))}
        </aside>
      </div>
    </div>
  );
};

export default ArticlesPage;