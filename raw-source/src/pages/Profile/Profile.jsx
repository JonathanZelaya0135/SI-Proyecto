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
        role: '',
        notification: false // keep boolean (controlled)
    });

    const fetchUser = async() => {
        try {
            const res = await instance.get(`/users/${myId}`);
            const user = res.data || {};
            setUserInfo({
                name: user.name ?? '',
                email: user.email ?? '',
                role: user.role ?? '',
                notification: !!user.notification
            });
        } catch (err) {
            console.error('Error fetching user:', err);
        }
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

    function handleNotificationToggle() {
        setUserInfo(prevState => ({
            ...prevState,
            notification: !prevState.notification
        }));
    }

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
                <div className="notifications">
                    <h3>Notificaciones</h3>
                    <p>{userInfo.notification ? "Las notificaciones están activadas" : "Las notificaciones están desactivadas"}</p>
                    <div className="toggle">
                        <label className="switch">
                            <input type="checkbox" onChange={handleNotificationToggle} checked={userInfo.notification}/>
                            <span className="slider"></span>
                            Recibir notificaciones
                        </label>
                    </div>
                </div>
            </div>
        </div>
      );
}