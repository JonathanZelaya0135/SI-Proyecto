import TableOrder from "../../features/ui/Table/TableOrder"
import MainTitle from "../../features/ui/Title/MainTitle";
import AppMenu from "../../features/ui/Menu/Menu";
import { useState, useEffect } from 'react';
import instance from "../../api/axios";


export default function AdminUsers(){
    const [tableData, setTableData] = useState([]);
    const tableHeaders = [
        { label: "ID", key: "id" },
        { label: "Nombre", key: "name" },
        { label: "Correo", key: "email" },
        { label: "Rol", key: "role" },
    ];

    const fetchUsers = async () => {
  try {
    const res = await instance.get('/users');
    setTableData(res.data);
  } catch (err) {
    console.error('Error fetching users:', err);
  }
};

    useEffect(() => {
      fetchUsers();      
  }, []);
    
    const handleDelete = async (userId) => {
  try {
    console.log(userId);
    await instance.delete(`/users/${userId}`);
    console.log('Deleted user ID:', userId);

    // Refresh data from the API
    fetchUsers();
  } catch (error) {
    console.error("Delete was unsuccessful", error); 
  }
};

    return(
        <div className="page-container">
                <AppMenu />
            <div className="page-content">
                <MainTitle title={"Usuarios"} icon={"groups"}/>
                <div className="table-container">
                  <TableOrder data={tableData} headers={tableHeaders} onDelete={handleDelete}/>
                </div>
            </div>
        </div>
    )
}