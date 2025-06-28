import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import BuyerPage from './pages/Buyer/BuyerPage';
import ProviderPage from './pages/Provider/ProviderPage';
import AdminPage from './pages/Admin/AdminPage';
import AdminUsers from './pages/Admin/AdminUsers';
import BuyerOrders from './pages/Buyer/BuyerOrders';
import AdminProducts from './pages/Admin/AdminProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/buyer" element={<BuyerPage />} />
        <Route path="/provider" element={<ProviderPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/buyer" element={<BuyerPage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/buyer/orders" element={<BuyerOrders />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/provider/products" element={<Navigate to={"/provider"} />} />
      </Routes>
    </Router>
  );
}

export default App;
