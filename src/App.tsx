import React from "react";
import "./styles/global.scss";
import "./styles/Content.scss";
import "./styles/Sidebar.scss";
import Content from "./content/Content";
import Sidebarr from "./sidebar/Sidebarr";
import Login from "./Login";
import { Route, Routes, Navigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";
import { lightTheme } from "./lightTheme";

export const AuthState = atom<boolean>({
  key: "authStateKeyForAuth",
  default: false,
});

export const DarkModeState = atom<boolean>({
  key: "modeState",
  default: false,
});

const App: React.FC = () => {

  const [auth, setAuth] = useRecoilState(AuthState);

  React.useEffect(() => {
    const token = localStorage.getItem("tokenforadmin");
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  const [mode, setMode] = useRecoilState(DarkModeState);

  React.useEffect(() => {
    const darkmode = localStorage.getItem('modeforadmin');
    if (darkmode === 'true') {
      setMode(true);
    } else {
      setMode(false);
    }
  }, [setMode]);

  React.useEffect(() => {
    localStorage.setItem('modeforadmin', JSON.stringify(mode));
  }, [mode]);

  return (
    <ThemeProvider theme={mode ? darkTheme : lightTheme}>
      <div className={`admin ${mode ? 'dark-mode' : ""}`}>
      <Routes>
        <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/*"
          element={
            auth ? (
              <>
                <Sidebarr />
                <Content />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
    </ThemeProvider>
  );
};

export default App;
