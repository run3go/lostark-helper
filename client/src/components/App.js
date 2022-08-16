import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./views/Footer/Footer";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import NavBar from "./views/NavBar/NavBar";

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </Suspense>
  );
}
