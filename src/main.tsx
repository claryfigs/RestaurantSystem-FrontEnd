import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import HomeClient from "./pages/home-client";
import RestaurantClient from "./pages/restaurant-client";
import FinalizeOrder from "./pages/finalize-order";
import WalletClient from "./pages/wallet-client";
import TrackOrderClient from "./pages/track-order-client";
import OrderRecordClient from "./pages/order-record-client";
import RestaurantProfile from "./pages/restaurant-profile";
import Login from "./pages/login";
import LoginCliente from "./pages/login-cliente";
import LoginRestaurante from "./pages/login-restaurante";
import CadastroCliente from "./pages/cadastro-cliente";
import CadastroRestaurante from "./pages/cadastro-restaurante";
import TrackOrderRestaurant from "./pages/track-order-restaurant";
import OrderRecordRestaurant from "./pages/order-record-restaurant";
import SuportRestaurant from "./pages/suport-restaurant";
import SuportClient from "./pages/suport-client";
import ProfileClient from "./pages/client-profile";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-cliente" element={<LoginCliente />} />
        <Route path="/login-restaurante" element={<LoginRestaurante />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
        <Route path="/cadastro-restaurante" element={<CadastroRestaurante />} />
        <Route path="/home-client" element={<HomeClient />} />
        <Route path="/restaurant-client/:id" element={<RestaurantClient />} />
        <Route path="/finalize-order" element={<FinalizeOrder />} />
        <Route path="/wallet-client" element={<WalletClient />} />
        <Route path="/track-order-client" element={<TrackOrderClient />} />
        <Route path="/order-record-client" element={<OrderRecordClient />} />
        <Route path="/restaurant-profile" element={<RestaurantProfile />} />
        <Route
          path="/track-order-restaurant"
          element={<TrackOrderRestaurant />}
        />
        <Route
          path="/order-record-restaurant"
          element={<OrderRecordRestaurant />}
        />
        <Route path="/suport-restaurant" element={<SuportRestaurant />} />
        <Route path="/suport-client" element={<SuportClient />} />
        <Route path="/client-profile" element={<ProfileClient />} />
        <Route
          path="/cadastro"
          element={
            <div style={{ padding: "100px", textAlign: "center" }}>
              Página de Cadastro (em construção)
            </div>
          }
        />
        <Route
          path="/ajuda"
          element={
            <div style={{ padding: "100px", textAlign: "center" }}>
              Página de Ajuda (em construção)
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
