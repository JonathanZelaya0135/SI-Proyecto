import { useState } from "react";
import axios from "../../api/axios";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import LoginTitle from "../../features/ui/Title/LoginTitle";
import Input from "../../features/ui/Input/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", {
        email, 
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("id", user.id);
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.name)
      console.log(JSON.stringify(user));

      // Redirect based on role
      switch (user.role) {
        case "BUYER":
          navigate("/buyer");
          break;
        case "PROVIDER":
          navigate("/provider");
          break;
        case "ADMIN":
          navigate("/admin");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <LoginTitle title={"RawSource"} />
        <Input type={"text"} placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type={"text"} placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p className="forgot-password">¿Olvidaste tu contraseña?</p>

      <button className="login-button" onClick={handleLogin}>
        INICIAR SESIÓN
      </button>
    </div>
  );
}
