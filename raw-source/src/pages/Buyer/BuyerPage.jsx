import { useEffect, useState } from "react";
import axios from "../../api/axios";
import MainTitle from "../../features/ui/Title/MainTitle";
import ProductCard from "../../components/ProductCard/ProductCardBuyer";
import AppMenu from "../../features/ui/Menu/Menu";
import "./BuyerPage.css";

export default function BuyerPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");
  const [quantities, setQuantities] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  const buyerId = user?.id;

  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        // Initialize quantity state
        const initialQuantities = {};
        res.data.forEach((p) => (initialQuantities[p.id] = 1));
        setQuantities(initialQuantities);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleBuy = async (product) => {
    const quantity = quantities[product.id] || 1;

    try {
      const response = await axios.post("/orders/create", {
        buyerId,
        items: [
          {
            productId: product.id,
            quantity: parseInt(quantity),
          },
        ],
      });

      alert("Orden realizada con éxito!");
      console.log(response.data);
    } catch (error) {
      console.error("Error al realizar la orden:", error);
      alert("Hubo un error al realizar la orden.");
    }
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const getProvider = (p) => p.provider?.toLowerCase?.() ?? "";

      switch (sortOption) {
        case "provider-asc":
          return getProvider(a).localeCompare(getProvider(b));
        case "provider-desc":
          return getProvider(b).localeCompare(getProvider(a));
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "name-asc":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="page-container">
      <AppMenu />
      <div className="page-content">
        <MainTitle title={"Productos"} icon={"store"} />
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
            <option value="provider-asc">Proveedor (A-Z)</option>
            <option value="provider-desc">Proveedor (Z-A)</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id]}
              onQuantityChange={(value) =>
                handleQuantityChange(product.id, value)
              }
              onBuy={() => handleBuy(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
