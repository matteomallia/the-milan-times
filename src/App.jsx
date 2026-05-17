import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopTicker from './components/TopTicker';
import ArticlesPage from './pages/ArticlesPage'; 

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <TopTicker/>
        <Routes>
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/section/:id" element={<ArticlesPage />} /> {/* Gestirà le categorie */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;