import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.nytimes.com/svc/topstories/v2',
});

export const nytApi = {
  /**
   * @param {string} section - La categoria da cercare (es. world, business, food)
   * @returns {Promise<Array>} - Un array di articoli
   */
  fetchTopStories: async (section) => {
    const apiKey = import.meta.env.VITE_NYT_API_KEY;

    if (!apiKey) {
      throw new Error('API Key mancante nel file .env locale');
    }

    const response = await api.get(`/${section}.json?api-key=${apiKey}`);
    
    return response.data.results;
  }
};