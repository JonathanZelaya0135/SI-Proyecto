import { useState } from "react";
import axios from "../../api/axios";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import LoginTitle from "../../features/ui/Title/LoginTitle";
import Input from "../../features/ui/Input/Input";
import RegisterUserModal from "../../features/ui/Modal/RegisterUserModal";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "BUYER",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("id", user.id);
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.name);

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

  const handleChangeNewUser = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      await axios.post("/users/register", newUser);
      alert("Usuario registrado con éxito");
      setShowRegister(false);
      setNewUser({ name: "", email: "", password: "", role: "BUYER" });
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="login-container">
      <LoginTitle title={"RawSource"} />
      <form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <p className="register-link" onClick={() => setShowRegister(true)}>
          ¿No tienes cuenta? Registrarse
        </p>

      
        <button className="login-button" type="submit">
          INICIAR SESIÓN
        </button>
      </form>

      {showRegister && (
        <RegisterUserModal
          user={newUser}
          handleChange={handleChangeNewUser}
          handleRegister={handleAddUser}
          handleClose={() => setShowRegister(false)}
        />
      )}
    </div>
  );
}
