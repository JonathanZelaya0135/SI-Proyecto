import AppMenu from "../../features/ui/Menu/Menu";
import MainTitle from "../../features/ui/Title/MainTitle"
import MainButton from "../../features/ui/Button/MainButton";
import AddProductModal from "../../features/ui/Modal/AddProductModal";
import "./ProviderPage.css";
import { useState, useEffect } from 'react';
import instance from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import ProductCardAdmin from "../../components/ProductCard/ProductCardAdmin";



export default function ProviderPage() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const providerId = localStorage.getItem("id");
    const providerName = localStorage.getItem("username");
    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([])
    const [newProducts, setNewProducts] = useState({
      name: '',
      description: '',
      price: '',
      image: '',
      providerId: providerId,
      providerName: providerName
    });

    const fetchProducts = async () => {
        try {
            const res = await instance.get(`/products/provider/${providerId}`);
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
    const handleOpenModal = () => {
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleChange = (e) => {
  const { name, value } = e.target;

  setNewProducts((prevState) => ({
    ...prevState,
    [name]: name === "price" ? Number(value) : value
  }));
};


    const handleAddProduct = async () => {
  console.log("Payload:", JSON.stringify(newProducts, null, 2));

  try {
    await instance.post('/products', newProducts, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
        fetchProducts(); 
        setShowModal(false);
        setNewProducts({
      name: '',
      description: '',
      price: '',
      image: '',
      providerId: providerId,
      providerName: providerName
    });
      } catch (err) {
        console.error('Failed to register user:', err);
      }
    };

  return (
    <div className="page-container">
      {showModal && <AddProductModal product={newProducts} handleChange={handleChange} handleCloseModal={handleCloseModal} handleAddProduct={handleAddProduct}/>}
      <AppMenu />
      <div className="page-content">
        <MainTitle title={"Products"} icon={"inventory"}/>
        <div style={{display: "flex", justifyContent: "flex-end", marginRight:"2rem"}}>
          <MainButton text={"Agregar Producto +"} handleClick={handleOpenModal}/>
        </div>
        <div className="cards-container">
        {products.map(product => (
            <ProductCardAdmin key={product.id} product={product} onDelete={handleDeleteProduct} />
        ))}
        </div>
      </div>
    </div>
  )
}
