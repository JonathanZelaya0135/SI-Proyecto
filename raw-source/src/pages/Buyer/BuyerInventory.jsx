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
    const fetchInventoryAndProducts = async () => {
      try {
        // Fetch current inventory
        const inventoryRes = await axios.get("/inventories/current");
        const inventoryId = inventoryRes.data.id;

        // Fetch inventory items
        const itemsRes = await axios.get(
          `/inventories/${inventoryId}/products`
        );
        const items = itemsRes.data;

        // Fetch full product details for each item
        const detailedItems = await Promise.all(
          items.map(async (item) => {
            try {
              const productRes = await axios.get(`/products/${item.productId}`);
              return {
                ...item,
                product: productRes.data,
              };
            } catch (err) {
              console.warn(
                `No se pudo obtener detalles del producto ${item.productId}`,
                err
              );
              return {
                ...item,
                product: {
                  name: item.productName,
                  description: "Sin descripción",
                  image: "/images/placeholder-image.png",
                },
              };
            }
          })
        );

        setInventoryItems(detailedItems);
      } catch (err) {
        console.error("Error al obtener inventario:", err);
        setInventoryItems([]);
      }
    };

    fetchInventoryAndProducts();
  }, []);

  const handleRegisterUsage = async (item, amount) => {
    if (amount <= 0) {
      alert("Ingresa una cantidad válida.");
      return;
    }

    if (amount > item.quantity) {
      alert("No puedes registrar más unidades de las que tienes.");
      return;
    }

    try {
      const inventoryId = (await axios.get("/inventories/current")).data.id;
      const newQuantity = item.quantity - amount;

      await axios.put(
        `/inventories/${inventoryId}/products/${item.productId}`,
        {
          id: item.id,
          quantity: newQuantity,
          minimumStock: 0,
          maximumStock: null,
          unitPrice: null,
          status: "ACTIVE",
        }
      );

      alert(`Uso registrado correctamente para ${item.productName}`);

      const items = (await axios.get(`/inventories/${inventoryId}/products`))
        .data;

      const detailedItems = await Promise.all(
        items.map(async (item) => {
          try {
            const productRes = await axios.get(`/products/${item.productId}`);
            return {
              ...item,
              product: productRes.data,
            };
          } catch {
            return {
              ...item,
              product: {
                name: item.productName,
                description: "Sin descripción",
                image: "/images/placeholder-image.png",
              },
            };
          }
        })
      );

      setInventoryItems(detailedItems);
    } catch (err) {
      console.error("Error al registrar uso:", err);
      alert("Hubo un error al registrar el uso.");
    }
  };

  const filteredAndSortedItems = inventoryItems
    .filter((item) =>
      item.product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "name-desc":
          return b.product.name.localeCompare(a.product.name);
        case "name-asc":
        default:
          return a.product.name.localeCompare(b.product.name);
      }
    });

    const lowStockCount = inventoryItems.filter(i => i.quantity < 5).length;

  return (
    <div className="page-container">

      <AppMenu lowStockCount={lowStockCount} />

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
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
          </select>
        </div>

        <div className="product-grid">
          {filteredAndSortedItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onRegisterUsage={(item, amount) =>
                handleRegisterUsage(item, amount)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
