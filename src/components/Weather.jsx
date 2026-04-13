import { useSelector } from 'react-redux';

const Weather = () => {
  // Usiamo useSelector per leggere la lingua e mostrare il meteo coerente
  const currentLang = useSelector((state) => state.language.current);

  const weatherLabels = {
    it: { city: 'Milano', condition: 'Soleggiato' },
    en: { city: 'Milan', condition: 'Sunny' },
    es: { city: 'Milán', condition: 'Soleado' }
  };

  const labels = weatherLabels[currentLang] || weatherLabels.en;

  return (
    <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginTop: '5px', textAlign: 'center' }}>
      {labels.city} • 18°C • {labels.condition}
    </div>
  );
};

export default Weather;
