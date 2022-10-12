import React, { Suspense, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "../hoc/auth";

import TopBar from "./TopBar/TopBar";
import SideBar from "./SideBar/SideBar";
import Footer from "./Footer/Footer";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export default function App() {
  const sideNavBarRef = useRef();
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopBar ref={sideNavBarRef} />
      <div style={{ display: "flex" }}>
        <SideBar ref={sideNavBarRef} />
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
