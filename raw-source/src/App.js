import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import AdminPage from './pages/Admin/AdminPage';
import AdminUsers from './pages/Admin/AdminUsers';
import BuyerPage from './pages/Buyer/BuyerPage';
import BuyerInventory from './pages/Buyer/BuyerInventory';
import BuyerOrders from './pages/Buyer/BuyerOrders';
import ProviderPage from './pages/Provider/ProviderPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/buyer" element={<BuyerPage />} />
        <Route path="/buyer/inventory" element={<BuyerInventory />} />
        <Route path="/buyer/orders" element={<BuyerOrders />} />
        <Route path="/provider" element={<ProviderPage />} />
        <Route path="/buyer" element={<BuyerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
