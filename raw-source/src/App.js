import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import AdminPage from './pages/Admin/AdminPage';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminProducts from './pages/Admin/AdminProducts';
import BuyerPage from './pages/Buyer/BuyerPage';
import BuyerInventory from './pages/Buyer/BuyerInventory';
import BuyerOrders from './pages/Buyer/BuyerOrders';
import ProviderPage from './pages/Provider/ProviderPage';
import ProviderOrders from './pages/Provider/ProviderOrders';
import ProfilePage from './pages/Profile/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/buyer" element={<BuyerPage />} />
        <Route path="/buyer/inventory" element={<BuyerInventory />} />
        <Route path="/buyer/orders" element={<BuyerOrders />} />
        <Route path="/provider" element={<ProviderPage />} />
        <Route path="/provider/orders" element={<ProviderOrders />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/provider/products" element={<Navigate to={"/provider"} />} />
      </Routes>
    </Router>
  );
}

export default App;
