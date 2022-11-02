import React, { useRef } from "react";
import Auth from "../hoc/auth";

import TopBar from "../components/TopBar/TopBar";
import SideBar from "../components/SideBar/SideBar";
import Footer from "../components/Footer/Footer";

function MainPage() {
  const sideNavBarRef = useRef();
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthTodayPage = Auth(TodayPage, true);
  const AuthWeekPage = Auth(WeekPage, true);
  const AuthRegionPage = Auth(RegionPage, true);
  const AutoTodoPage = Auth(TodoPage, true);
  return (
    <div>
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
            <AuthLandingPage />
            <AuthRegisterPage />
            <AuthTodayPage />
            <AuthWeekPage />
            <AuthRegionPage />
            <AutoTodoPage />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
