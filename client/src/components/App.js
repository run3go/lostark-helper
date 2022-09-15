import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import Auth from "../hoc/auth";

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
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalStyle />
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Routes>
          <Route exact path="/" element={<AuthLandingPage />} />
          <Route exact path="/login" element={<AuthLoginPage />} />
          <Route exact path="/register" element={<AuthRegisterPage />} />
        </Routes>
      </div>
      <Footer />
    </Suspense>
  );
}
