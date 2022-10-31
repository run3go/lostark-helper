import React, { Suspense, useRef } from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "../hoc/auth";

import TopBar from "./TopBar/TopBar";
import SideBar from "./SideBar/SideBar";
import Footer from "./Footer/Footer";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import TodayPage from "../pages/Today.page/TodayPage";
import WeekPage from "../pages/WeekPage/WeekPage";
import RegionPage from "../pages/RegionPage/RegionPage";
import TodoPage from "../pages/TodoPage/TodoPage";

export default function App() {
  const sideNavBarRef = useRef();
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthTodayPage = Auth(TodayPage, true);
  const AuthWeekPage = Auth(WeekPage, true);
  const AuthRegionPage = Auth(RegionPage, true);
  const AutoTodoPage = Auth(TodoPage, true);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopBar ref={sideNavBarRef} />
      <div style={{ display: "flex" }}>
        <SideBar ref={sideNavBarRef} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
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
              <Route exact path="/todo/all" element={<AutoTodoPage />} />
              <Route exact path="/todo/today" element={<AuthTodayPage />} />
              <Route exact path="/todo/week" element={<AuthWeekPage />} />
              <Route exact path="/todo/region" element={<AuthRegionPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Suspense>
  );
}
