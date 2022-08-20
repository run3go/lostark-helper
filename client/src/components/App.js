import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import Footer from "./views/Footer/Footer";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import NavBar from "./views/NavBar/NavBar";

const GlobalStyle = createGlobalStyle`
${reset}
.text_link {
  text-decoration: none;
}
`;

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyle />
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
      <Footer />
    </Suspense>
  );
}
