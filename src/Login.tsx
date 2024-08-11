import React, { FormEvent } from "react";
import "./styles/Login.scss";
import { MdOutlineMailOutline, MdOutlinePassword } from "react-icons/md";
import axios from "axios";
import { URL } from "./Base";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AuthState } from "./App";
import { useRecoilState } from "recoil";

const Login: React.FC = () => {
  const [_, setAuth] = useRecoilState(AuthState);

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const values = {
        email: email,
        password: password,
      };

      const response = await axios.post(`${URL}/login`, values);
      if (response.data && response.status === 200) {
        console.log(response.data);
        toast.success("Giriş uğurludur!", {
          position: "top-center",
        });

        localStorage.setItem("tokenforadmin", response.data?.token);
        localStorage.setItem("usermailforadmin", response.data?.user?.email);
        localStorage.setItem("useridforadmin", response.data?.user?.id);
        setAuth(true);
        navigate("/", { replace: true });
      } else if (response.status === 402) {
        toast.error("Email və ya şifrə yanlışdır", {
          position: "top-center",
        });
        console.log(response.data);
      } else if (response.status === 401) {
        toast.error("İstifadəçi tapılmadı", {
          position: "top-center",
        });
        console.log(response.data);
      } else {
        toast.warning("Bir problem oldu. Daha sonra yenidən yoxlayın", {
          position: "top-center",
        });
        console.log(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 402) {
          toast.error("Email və ya şifrə yanlışdır", {
            position: "top-center",
          });
        } else if (error.response?.status === 401) {
          toast.error("İstifadəçi tapılmadı", {
            position: "top-center",
          });
        } else {
          toast.warning("Bir problem oldu. Daha sonra yenidən yoxlayın", {
            position: "top-center",
          });
        }
      }
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer transition={Zoom} autoClose={1000} pauseOnHover={false} />
      <form method="POST" onSubmit={handleSubmit}>
        <img src="/166.svg" className="logo" alt="166" title="166Tech" />
        <div className="title-form">
          <h1>Sistemə giriş</h1>
          <p>Daxil olmaq üçün lütfən sizə verilən məlumatları daxil edin. Məlumatların düzgünlüyündən əmin olun.</p>
        </div>

        <div className="inputs">
          <section className="input-field">
            <label htmlFor="email">Email:</label>
            <div className="input">
              <input
                name="email"
                id="email"
                type="email"
                required
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <MdOutlineMailOutline className="email" />
            </div>
          </section>
          <section className="input-field">
            <label htmlFor="password">Şifrə:</label>
            <div className="input">
              <input
                name="password"
                id="password"
                type="password"
                required
                placeholder="***********"
                onChange={(e) => setPassword(e.target.value)}
              />
              <MdOutlinePassword className="email" />
            </div>
          </section>
          <section className="button">
            <button type="submit">Daxil ol</button>
          </section>
        </div>
      </form>
    </div>
  );
};

export default Login;
