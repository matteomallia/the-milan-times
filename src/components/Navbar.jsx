import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLanguage } from '../features/language/languageSlice'; // Assicurati che il percorso sia corretto
import { translations } from '../data/translations';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.language.current);

  // 1. Recuperiamo i testi centralizzati
  const t = translations[currentLang] || translations.en;

  // 2. Array delle lingue disponibili per generare i bottoni in loop
  const availableLanguages = [
    { code: 'it', label: 'IT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  return (
    <header className={styles.header}>
      {/* Top Bar: Lingue e Pulsanti Utility */}
      <div className={styles.topBar}>
        <div className={styles.langSelector}>
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => dispatch(setLanguage(lang.code))}
              className={`${styles.langBtn} ${currentLang === lang.code ? styles.activeLang : ''}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
        
        <div className={styles.utilityBtns}>
          <button className={styles.subscribeBtn}>{t.nav.subscribe}</button>
          <button className={styles.loginBtn}>{t.nav.login}</button>
          <button className={styles.donateBtn}>{t.nav.donate}</button>
        </div>
      </div>

      {/* Main Brand Header */}
      <div className={styles.brandHeader}>
        <h1 className={styles.logo}>The Milan Times</h1>
      </div>

      {/* Navigation Links delle Categorie */}
      <nav className={styles.mainNav}>
        <ul className={styles.navList}>
          {/* Generiamo i link in loop partendo dall'array nel file traduzioni */}
          {t.categories.map((cat) => (
            <li key={cat.id} className={styles.navItem}>
              <Link 
                to={cat.id === 'world' ? '/' : `/section/${cat.id}`} 
                className={styles.navLink}
              >
                {cat.label.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;