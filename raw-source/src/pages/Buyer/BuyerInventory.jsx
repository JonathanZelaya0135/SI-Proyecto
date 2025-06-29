import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AppMenu from "../../features/ui/Menu/Menu";
import ProductCard from "../../components/ProductCard/ProductCardBuyerInventory";
import MainTitle from "../../features/ui/Title/MainTitle";
import "./BuyerPage.css";

export default function BuyerInventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name-asc");

  useEffect(() => {
    axios
      .get("/inventories/current")
      .then((res) => {
        const data = res.data;
        setInventoryItems(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching inventory:", err);
        setInventoryItems([]);
      });
  }, []);

  const handleRegisterUsage = (product, amount) => {
    alert(`Registrando uso de ${amount} unidades para el producto: ${product.product.name}`);
    // TODO: Implement POST to usage endpoint
  };

  const filteredAndSortedItems = inventoryItems
    .filter(
      (item) =>
        item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const getProvider = (item) => item.product.provider?.toLowerCase?.() ?? "";

      switch (sortOption) {
        case "provider-asc":
          return getProvider(a).localeCompare(getProvider(b));
        case "provider-desc":
          return getProvider(b).localeCompare(getProvider(a));
        case "name-desc":
          return b.product.name.localeCompare(a.product.name);
        case "name-asc":
        default:
          return a.product.name.localeCompare(b.product.name);
      }
    });

  return (
    <div className="page-container">
      <AppMenu />
      <div className="page-content">
        <MainTitle title={"Mi Inventario"} icon={"inventory"} />

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
          {filteredAndSortedItems.map((item) => (
            <ProductCard
              key={item.id}
              product={item.product}
              onRegisterUsage={(product, amount) => handleRegisterUsage(item, amount)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
