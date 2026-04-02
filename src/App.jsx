import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopTicker from './components/TopTicker';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <TopTicker/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/section/:id" element={<Home />} /> {/* Gestirà le categorie */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;