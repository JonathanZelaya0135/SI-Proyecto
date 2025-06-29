import AppMenu from "../../features/ui/Menu/Menu";
import MainTitle from "../../features/ui/Title/MainTitle"
import "./AdminPage.css";
import { useState, useEffect } from 'react';
import instance from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import ProductCardAdmin from "../../components/ProductCard/ProductCardAdmin";



export default function AdminProducts() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await instance.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

  const handleDeleteProduct = async (productId) => {
    try {
        const token = localStorage.getItem("token");

        await instance.delete(`/products/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchProducts();
    } catch (error) {
    console.error("Delete was unsuccessful", error); 
    }
  };

    useEffect(() => {
        fetchProducts();
    }, []);

    if(role == null){
        navigate("/login");
        return null;
     };

  return (
    <div className="page-container">
      <AppMenu />
      <div className="page-content">
        <MainTitle title={"Products"} icon={"inventory"}/>
        <div className="cards-container">
        {products.map(product => (
            <ProductCardAdmin key={product.id} product={product} onDelete={handleDeleteProduct} />
        ))}
        </div>
      </div>
    </div>
  )
}
