import { useCart } from '../context/CartContext'; // Importa el contexto

// eslint-disable-next-line react/prop-types
const CartItem = ({ item }) => {
  const { removeItemFromCart } = useCart(); // Función para eliminar el producto del carrito

  // Eliminar producto del carrito
  const handleRemove = () => {
    removeItemFromCart(item.id); // Llamada a la función para eliminar el producto
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
