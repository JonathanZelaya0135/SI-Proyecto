import { useState } from 'react';
import Input from '../../components/Input';
import './LoginPage.css';
import MainButton from '../../features/ui/Button/MainButton';
import LoginTitle from '../../features/ui/Title/LoginTitle';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login clicked with:', { username, password });
  };

  return (
    <div className="login-container">
      <LoginTitle title={"RawSource"} />
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
      <MainButton handleClick={handleLogin} text={"INICIAR SESSION"} />
    </div>
  );
}
