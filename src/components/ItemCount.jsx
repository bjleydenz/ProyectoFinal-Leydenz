import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

// eslint-disable-next-line react/prop-types
const ItemCount = ({ stock, product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useCart();

  useEffect(() => {
    // Asegurarse de que la cantidad no sea mayor que el stock disponible al cambiar el stock.
    if (quantity > stock) {
      setQuantity(stock);
    }
  }, [stock, quantity]);

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addItemToCart(product, quantity);
  };

  return (
    <div className="item-count">
      <div className="quantity-controls">
        <button onClick={handleDecrement} disabled={quantity <= 1} aria-label="Disminuir cantidad">-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrement} disabled={quantity >= stock} aria-label="Aumentar cantidad">+</button>
      </div>
      <p>Stock disponible: {stock}</p>
      {quantity > stock && <p style={{ color: 'red' }}>No puedes añadir más de {stock} unidades.</p>}
      <button 
        onClick={handleAddToCart} 
        disabled={stock <= 0 || quantity > stock}
        aria-label={`Añadir ${quantity} unidad(es) al carrito`}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ItemCount;
