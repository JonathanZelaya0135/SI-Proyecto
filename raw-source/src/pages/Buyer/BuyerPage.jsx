import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import ProductCard from '../../components/ProductCard/ProductCardBuyer';

export default function BuyerPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  const handleBuy = (productId) => {
    alert(`Comprar producto con ID: ${productId}`);
    // You can later call the orders API here
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Productos Disponibles</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} onBuy={handleBuy} />
        ))}
      </div>
    </div>
  );
}
