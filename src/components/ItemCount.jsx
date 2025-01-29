import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import './ItemCount.css';

const ItemCount = ({ stock, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItemToCart, cart } = useCart();
  const navigate = useNavigate();

  const cartItem = cart.find((item) => item.id === product.id);
  const availableStock = stock - (cartItem?.quantity || 0);

  useEffect(() => {
    if (quantity > availableStock) {
      setQuantity(availableStock);
    }
  }, [availableStock, quantity]);

  const handleIncrement = () => {
    if (quantity < availableStock) {
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
    setAddedToCart(true);
    setTimeout(() => {
      navigate("/carrito");
    }, 1500);
  };

  if (availableStock <= 0) {
    return <p style={{ color: "red" }}>Producto sin stock disponible</p>;
  }

  if (addedToCart) {
    return (
      <p style={{ color: "green" }}>
        Producto añadido al carrito. Redirigiendo al carrito...
      </p>
    );
  }

  return (
    <div className="item-count">
      <div className="quantity-controls">
        <button
          onClick={handleDecrement}
          disabled={quantity <= 1}
          aria-label="Disminuir cantidad"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={handleIncrement}
          disabled={quantity >= availableStock}
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>
      <p>Stock disponible: {availableStock}</p>
      {quantity > availableStock && (
        <p style={{ color: "red" }}>
          No puedes añadir más de {availableStock} unidades.
        </p>
      )}
      <button
        onClick={handleAddToCart}
        disabled={availableStock <= 0 || quantity > availableStock}
        aria-label={`Añadir ${quantity} unidad(es) al carrito`}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

ItemCount.propTypes = {
  stock: PropTypes.number.isRequired,
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default ItemCount;
