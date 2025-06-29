import { useEffect, useState } from "react";
import instance from "../../api/axios";
import AppMenu from "../../features/ui/Menu/Menu";
import MainTitle from "../../features/ui/Title/MainTitle";
import Input from "../../features/ui/Input/Input";
import "./Profile.css"

export default function ProfilePage(){
    const [showMessage, setShowMessage] = useState(false);
    const myId = localStorage.getItem("id");
    const [newPassword, setPassword] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        role: ''
    });

    const fetchUser = async() => {
        instance.get(`/users/${myId}`)
      .then((res) => {
        const user = res.data;
        setUserInfo(user); 
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
      });
    }

    useEffect(() => {
    fetchUser();
  }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword(prev => ({ ...prev, [name]: value }));
    };

    const handleNewPassword = async () => {
        const payload = {
            name: userInfo.name,
            email: userInfo.email,
            password: newPassword.newPassword,
            role: userInfo.role
        };
        try {
            await instance.put(`/users/${myId}`, payload);
            fetchUser();
            setPassword({ newPassword: '', confirmNewPassword: '' });
        } catch (err) {
            console.error('Failed to update user password:', err);
        }
    };

    return (
        <div className="page-container">
            <AppMenu />
            <div className="page-content">
                <MainTitle title={"Perfil"} icon={"person"} />
                <div className="user-info-card">
                    <p>Nombre: <b>{userInfo.name}</b></p>
                    <p>Email: <b>{userInfo.email}</b></p>
                    <p>Rol: <b>{userInfo.role}</b></p>
                </div>
                <div className="change-password">
                    <h3>Cambia tu contaseña</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (newPassword.newPassword !== newPassword.confirmNewPassword) {
                            setShowMessage(true);
                            return null;
                        }
                        setShowMessage(false);
                        handleNewPassword();
                    }}>
                        <Input name = {"newPassword"} type={"password"} placeholder={"Nueva contraseña"} value={newPassword.newPassword} onChange={handleChange}/>
                        <Input name = {"confirmNewPassword"} type={"password"} placeholder={"Confirmar contraseña"} value={newPassword.confirmNewPassword} onChange={handleChange}/>
                        {showMessage && <p className="error-message">Las contraseñas son diferentes</p>}
                        <button type="submit">Cambiar contraseña</button>
                    </form>
                </div>
            </div>
        </div>
      );
}