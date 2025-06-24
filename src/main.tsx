import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/home-client';
import RestaurantClient from './pages/restaurant-client';
import FinalizeOrder from './pages/finalize-order';
import WalletClient from './pages/wallet-client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-client" element={<Home />} />
        <Route path="/restaurant-client" element={<RestaurantClient />} />
        <Route path="/finalize-order" element={<FinalizeOrder />} />
        <Route path="/wallet-client" element={<WalletClient/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);