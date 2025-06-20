import { useState } from "react";
import axios from "../../api/axios"; // import your configured instance
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", {
        email: username, // backend expects "email", not "username"
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

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
      <h2>RawSource</h2>

      <input
        className="login-input"
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="login-input"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p className="forgot-password">¿Olvidaste tu contraseña?</p>

      <button className="login-button" onClick={handleLogin}>
        INICIAR SESIÓN
      </button>
    </div>
  );
}
