import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import Auth from "../hoc/auth";

import TopBar from "./TopBar/TopBar";
import SideBar from "./SideBar/SideBar";
import Footer from "./Footer/Footer";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

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
      <TopBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              minHeight: "calc(100vh - 80px)",
            }}
          >
            <Routes>
              <Route exact path="/" element={<AuthLandingPage />} />
              <Route exact path="/login" element={<AuthLoginPage />} />
              <Route exact path="/register" element={<AuthRegisterPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Suspense>
  );
}
