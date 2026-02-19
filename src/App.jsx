import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalog from './components/Catalog';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Recetas from './pages/Recetas';

// ScrollToTop component to handle scroll on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  // Smooth scroll fix for anchor links global
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-[#D4A373] selection:text-white">
        <ScrollToTop />
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/catalogo" element={<div className="pt-20"><Catalog /></div>} />
            <Route path="/recetas" element={<Recetas />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
