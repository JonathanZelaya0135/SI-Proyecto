import AppMenu from "../../features/ui/Menu/Menu";
import MainTitle from "../../features/ui/Title/MainTitle";
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
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  const [newProducts, setNewProducts] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    providerId,
    providerName
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
      await instance.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      console.error("Delete was unsuccessful", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (role == null) {
    navigate("/login");
    return null;
  }

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProducts((prevState) => ({
      ...prevState,
      [name]: name === "price" ? Number(value) : value
    }));
  };

  const handleAddProduct = async () => {
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
        providerId,
        providerName
      });
    } catch (err) {
      console.error('Failed to register user:', err);
    }
  };

  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "name-asc":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // navigate to transactions page for a product
  const handleCardClick = (product) => {
    const id = product?.id ?? product?._id ?? product?.productId;
    if (!id) return;
    navigate(`/transactions/${id}`);
  };

  return (
    <div className="page-container">
      {showModal && (
        <AddProductModal
          product={newProducts}
          handleChange={handleChange}
          handleCloseModal={handleCloseModal}
          handleAddProduct={handleAddProduct}
        />
      )}

      <AppMenu />
      <div className="page-content">
        <MainTitle title={"Productos"} icon={"inventory"} />

        <div className="search-sort-container">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            className="sort-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "2rem" }}>
          <MainButton text={"Agregar Producto +"} handleClick={handleOpenModal} />
        </div>

        <div className="cards-container">
          {filteredProducts.map(product => (
            <div
              key={product.id ?? product._id ?? product.productId}
              onClick={() => handleCardClick(product)}
              style={{ cursor: "pointer" }}
            >
              <ProductCardAdmin
                product={product}
                onDelete={handleDeleteProduct}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
