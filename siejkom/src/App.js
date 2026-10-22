// src/App.js
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Oferta from "./pages/Oferta/Oferta";
import Transport from "./pages/Transport/Transport";
import Realizacje from "./pages/Realizacje/Realizacje";
import Kontakt from "./pages/Kontakt/Kontakt";
import Admin from "./pages/Admin/Admin";
import { HelmetProvider } from "react-helmet-async";
import "./styles/global.css";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isAdmin = pathname === "/admin";

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oferta" element={<Oferta />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/realizacje" element={<Realizacje />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/admin" element={<Admin />} />
          {/* 404 */}
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: "70vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <h1 style={{ color: "var(--color-accent)", fontSize: "6rem" }}>
                  404
                </h1>
                <p style={{ color: "var(--color-muted)" }}>
                  Strona nie istnieje
                </p>
                <a href="/" className="btn btn--outline">
                  Wróć do strony głównej
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      <SpeedInsights />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </HelmetProvider>
  );
}
