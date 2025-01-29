/* eslint-disable react/prop-types */
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeItemFromCart } = useCart();

  const handleRemove = () => {
    removeItemFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} style={{ maxWidth: 100 }} />
      <div>
        <h3>{item.name}</h3>
        <p>Cantidad: {item.quantity}</p>
        <p>Precio: ${item.price}</p>
        <p>Subtotal: ${(item.price * item.stock).toFixed(2)}</p>
        <button onClick={handleRemove}>Eliminar</button>
      </div>
    </div>
  );
};

export default CartItem;
