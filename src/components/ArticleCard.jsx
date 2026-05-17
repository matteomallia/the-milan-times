import styles from '../styles/Home.module.css'; 

const ArticleCard = ({ article, readMoreText }) => {
  
  if (!article) return null;

  return (
    <article className={styles.articleCard}>
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
            <span className={styles.readMore}>{readMoreText} →</span>
          </div>
        </div>
      </a>
    </article>
  );
};

export default ArticleCard;