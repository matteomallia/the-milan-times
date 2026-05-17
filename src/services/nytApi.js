import axios from 'axios';

// Creiamo un'istanza di Axios pre-configurata con l'URL di base del NYT
const api = axios.create({
  baseURL: 'https://api.nytimes.com/svc/topstories/v2',
});

export const nytApi = {
  /**
   * Recupera le top stories per una determinata categoria
   * @param {string} section - La categoria da cercare (es. world, business, food)
   * @returns {Promise<Array>} - Un array di articoli
   */
  fetchTopStories: async (section) => {
    const apiKey = import.meta.env.VITE_NYT_API_KEY;

    if (!apiKey) {
      throw new Error('API Key mancante nel file .env locale');
    }

    // Effettuiamo la chiamata accodando la sezione e la chiave API
    const response = await api.get(`/${section}.json?api-key=${apiKey}`);
    
    return response.data.results;
  }
};