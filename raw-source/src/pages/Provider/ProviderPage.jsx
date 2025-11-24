import AppMenu from "../../features/ui/Menu/Menu";
import MainTitle from "../../features/ui/Title/MainTitle";
import MainButton from "../../features/ui/Button/MainButton";
import AddProductModal from "../../features/ui/Modal/AddProductModal";
import { useState, useEffect } from 'react';
import instance from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import ProductCardAdmin from "../../components/ProductCard/ProductCardAdmin";
import "./ProviderPage.css";

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
  const [categoryFilter, setCategoryFilter] = useState("");

  const [newProducts, setNewProducts] = useState({
    name: '',
    category: '',
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
        //category: '',
        description: '',
        price: '',
        image: '',
        providerId,
        providerName
      });
    } catch (err) {
      console.error('Failed to register product:', err);
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
    const name = product?.name;
    if (!name) return;
    navigate(`/transactions/${name}`);
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
            className="category-dropdown"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="Agujas">Agujas</option>
            <option value="Botones">Botones</option>
            <option value="Broches">Broches</option>
            <option value="Hilos">Hilos</option>
            <option value="Telas">Telas</option>
            <option value="Zippers">Zippers</option>
          </select>

          <select
            className="sort-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="provider-asc">Proveedor (A-Z)</option>
            <option value="provider-desc">Proveedor (Z-A)</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
          </select>
        </div>

        <div className="add-button">
          <MainButton text={"Agregar Producto +"} handleClick={handleOpenModal} />
        </div>

        <div className="product-grid">
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
