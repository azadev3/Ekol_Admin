import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./styles/responsive.scss";
import { Bounce, ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <HashRouter>
    <ToastContainer transition={Bounce} autoClose={2000} />
      <App />
    </HashRouter>
  </RecoilRoot>
);
