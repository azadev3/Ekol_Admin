import React from "react";
import "./styles/global.scss";
import "./styles/Content.scss";
import "./styles/Sidebar.scss";
import Content from "./content/Content";
import Sidebarr from "./sidebar/Sidebar";
import Login from "./Login";
import { Route, Routes, Navigate } from "react-router-dom";
import { atom, useRecoilState } from "recoil";
import { ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme";
import { lightTheme } from "./lightTheme";
import { useUserInfos } from "./uitils/useUser";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const toastMsg = () => {
  return toast.error("Bu əməliyyat üçün icazəniz yoxdur", {
    position: "top-center",
  });
};

export const toastSuccess = () => {
  return toast.success("Uğurlu!", {
    position: "top-center",
  });
};

export const toastError = () => {
  return toast.error("Bir problem oldu, yenidən yoxlayın", {
    position: "top-center",
  });
};

export const AuthState = atom<boolean>({
  key: "authStateKeyForAuth",
  default: false,
});

export const DarkModeState = atom<boolean>({
  key: "modeState",
  default: false,
});

export const IsAdminEnteredState = atom<boolean>({
  key: "adminEnteredState",
  default: false,
});

export const Option = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenforadmin")?.toString()}`,
    },
  };
};

export const OptionWithFormData = () => {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("tokenforadmin")?.toString()}`,
    },
  };
};

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
    const darkmode = localStorage.getItem("modeforadmin");
    if (darkmode === "true") {
      setMode(true);
    } else {
      setMode(false);
    }
  }, [setMode]);

  React.useEffect(() => {
    localStorage.setItem("modeforadmin", JSON.stringify(mode));
  }, [mode]);

  const { getUser, user } = useUserInfos();

  React.useEffect(() => {
    getUser();
  }, []);

  React.useEffect(() => {
    console.log(user, "userrr");
  }, [user]);

  return (
    <ThemeProvider theme={mode ? darkTheme : lightTheme}>
      <ToastContainer transition={Bounce} autoClose={2000} />
      <div className={`admin ${mode ? "dark-mode" : ""}`}>
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
