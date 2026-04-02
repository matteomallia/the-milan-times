import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../features/language/languageSlice'; // Utilizzo dello stato globale Redux [cite: 17, 372]
import styles from '../styles/Navbar.module.css'; // Utilizzo dei CSS Modules per evitare conflitti [cite: 20, 345]
import Weather from './Weather';

const Navbar = () => {
  const dispatch = useDispatch(); // Hook per inviare azioni a Redux [cite: 28, 501]
  const currentLang = useSelector((state) => state.language.current); // Hook per leggere lo stato globale [cite: 27, 488]

  // Oggetto traduzioni per l'interfaccia multilingua
  const translations = {
    it: { world: 'Mondo', business: 'Economia', lifestyle: 'Stile', food: 'Cucina', login: 'Accedi', donate: 'Sostienici' },
    en: { world: 'World', business: 'Business', lifestyle: 'Lifestyle', food: 'Cooking', login: 'Log In', donate: 'Subscribe' },
    es: { world: 'Mundo', business: 'Negocios', lifestyle: 'Estilo', food: 'Cocina', login: 'Acceder', donate: 'Suscríbete' }
  };

  const t = translations[currentLang];

  // Definizione delle categorie con mappatura per l'API del NYT [cite: 18, 521]
  const categories = [
    { label: t.world, path: 'world' },
    { label: t.business, path: 'business' },
    { label: t.lifestyle, path: 'health' }, // Mappatura tecnica per Lifestyle
    { label: t.food, path: 'food' }          // Mappatura tecnica per Cooking
  ];

  return (
    <nav className={styles.nav}>
      {/* Utility Bar: Lingue, Donazioni e Login */}
      <div className={styles.topUtility}>
        <div className={styles.languages}>
          <button 
            onClick={() => dispatch(setLanguage('it'))} 
            className={currentLang === 'it' ? styles.activeLang : ''}
          >IT</button>
          <button 
            onClick={() => dispatch(setLanguage('en'))} 
            className={currentLang === 'en' ? styles.activeLang : ''}
          >EN</button>
          <button 
            onClick={() => dispatch(setLanguage('es'))} 
            className={currentLang === 'es' ? styles.activeLang : ''}
          >ES</button>
        </div>
        
        <div className={styles.externalLinks}>
          <a href="https://www.nytimes.com/subscription" target="_blank" rel="noreferrer" className={styles.donateBtn}>
            {t.donate.toUpperCase()}
          </a>
          <a href="https://myaccount.nytimes.com/auth/login" target="_blank" rel="noreferrer" className={styles.loginBtn}>
            {t.login}
          </a>
        </div>
      </div>

      {/* Header Centrale: Logo, Data e Meteo */}
      <div className={styles.logoContainer}>
        <h1 className={styles.logo}>The Milan Times</h1>
        <p className={styles.date}>
          {new Date().toLocaleDateString(
            currentLang === 'it' ? 'it-IT' : currentLang === 'es' ? 'es-ES' : 'en-US', 
            { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
          )}
        </p>
        <Weather /> 
      </div>

      {/* Menu di Navigazione Principale tramite React Router [cite: 6, 79] */}
      <ul className={styles.menu}>
        {categories.map((cat) => (
          <li key={cat.path}>
            <Link to={`/section/${cat.path}`} className={styles.link}>
              {cat.label.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;