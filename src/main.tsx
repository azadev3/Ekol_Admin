import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./styles/responsive.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <HashRouter>
      <App />
    </HashRouter>
  </RecoilRoot>
);
