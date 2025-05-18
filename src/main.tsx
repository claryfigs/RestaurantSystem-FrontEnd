import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/home-client';
import RestaurantClient from './pages/restaurant-client'; // Crie esse componente/página

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant-client" element={<RestaurantClient />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);