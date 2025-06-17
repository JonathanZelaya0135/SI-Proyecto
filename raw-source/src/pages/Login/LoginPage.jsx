import { useState } from 'react';
import Input from '../../components/Input';
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login clicked with:', { username, password });
  };

  return (
    <div className="login-container">
      <h2>RawSource</h2>
      <Input
        placeholder="Usuario"
        type="text"
        defaultValue="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Contraseña"
        type="password"
        message="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="forgot-password">Olvidaste tu contraseña?</p>
      <button className="login-button" onClick={handleLogin}>INICIAR SESION</button>
    </div>
  );
}
