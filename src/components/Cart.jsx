/*
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, removeItemFromCart, getTotalPrice, clearCart, getTotalQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <Link to="/productos" className="view-products-link">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image || "default-image.jpg"}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Total: ${item.price * item.quantity}</p>
              <button
                onClick={() => removeItemFromCart(item.id)}
                className="remove-item"
                aria-label={`Eliminar ${item.name} del carrito`}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total de productos: {getTotalQuantity()}</p>
        <p>Total: ${getTotalPrice()}</p>
        <button
          onClick={clearCart}
          className="clear-cart"
          aria-label="Vaciar el carrito de compras"
        >
          Vaciar carrito
        </button>
        <button className="checkout" aria-label="Ir a la página de pago">
          Realizar compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
*/
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, removeItemFromCart, getTotalPrice, clearCart, getTotalQuantity } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <Link to="/productos" className="view-products-link">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image || "default-image.jpg"}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeItemFromCart(item.id)}
                className="remove-item"
                aria-label={`Eliminar ${item.name} del carrito`}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Total de productos: {getTotalQuantity()}</p>
        <p>Total: ${parseFloat(getTotalPrice()).toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="clear-cart"
          aria-label="Vaciar el carrito de compras"
        >
          Vaciar carrito
        </button>
        <button
          onClick={() => navigate("/checkout")}
          className="checkout"
          aria-label="Ir a la página de pago"
        >
          Realizar compra
        </button>
      </div>
    </div>
  );
};

export default Cart;
