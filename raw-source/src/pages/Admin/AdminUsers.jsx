import TableOrder from "../../features/ui/Table/TableOrder"
import MainTitle from "../../features/ui/Title/MainTitle";
import AppMenu from "../../features/ui/Menu/Menu";
import MainButton from "../../features/ui/Button/MainButton";
import { useState, useEffect } from 'react';
import instance from "../../api/axios";
import AddUserModal from "../../features/ui/Modal/AddUserModal";
import RoleDropdown from "../../features/ui/Input/RoleDropdown";

export default function AdminUsers(){
    const [tableData, setTableData] = useState([]);
    const [newUser, setNewUser] = useState({
      name: '',
      email: '',
      role: '',
      password: ''
    });
    const tableHeaders = [
        { label: "ID", key: "id" },
        { label: "Nombre", key: "name" },
        { label: "Correo", key: "email" },
        { label: "Rol", key: "role" },
    ];
    const [selectedRole, setSelectedRole] = useState('');

    const fetchUsers = async (role = selectedRole) => {
      try {
        const params = {};
        if (role && role !== '') params.role = role;
        const res = await instance.get('/users', { params });
        setTableData(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

  useEffect(() => {
      fetchUsers();      
  }, []);

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setSelectedRole(value);
    fetchUsers(value);
  };

  const [showModal, setShowModal] = useState(false);

const handleOpenModal = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setNewUser(prev => ({ ...prev, [name]: value }));
};

const handleAddUser = async () => {
  try {
    await instance.post('/users/register', newUser);
    fetchUsers(); 
    setShowModal(false);
    setNewUser({ name: '', email: '', role: '', password: '' });
  } catch (err) {
    console.error('Failed to register user:', err);
  }
};

const handleDeleteUser = async (userId) => {
    try {
      await instance.delete(`/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Delete was unsuccessful", error); 
    }
  };


    return(
        <div className="page-container">
          {showModal && <AddUserModal user={newUser} handleChange={handleChange} handleCloseModal={handleCloseModal} handleAddUser={handleAddUser}/>}
                <AppMenu />
            <div className="page-content">
                <MainTitle title={"Usuarios"} icon={"groups"}/>
                <div style={{display: "flex", justifyContent: "flex-end", marginRight:"2rem", alignItems: 'center'}}>
                  <RoleDropdown value={selectedRole} onChange={handleRoleChange} />
                  <MainButton text={"Agregar Usuario +"} handleClick={handleOpenModal}/>
                </div>
                <div className="table-container">
                  <TableOrder data={tableData} headers={tableHeaders} onDelete={handleDeleteUser}/>
                </div>
            </div>
        </div>
    )
}