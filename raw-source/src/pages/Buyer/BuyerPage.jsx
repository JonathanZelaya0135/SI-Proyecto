import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import ProductCard from '../../components/ProductCard/ProductCardBuyer';
import AppMenu from '../../features/ui/Menu/Menu';

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
    // Call the orders API here to create an order?
  };

  return (
    <div style={{ padding: '20px' }}>
      <AppMenu />
      <h2>Productos Disponibles</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} onBuy={handleBuy} />
        ))}
        {console.log(products)}
      </div>
    </div>
  );
}
