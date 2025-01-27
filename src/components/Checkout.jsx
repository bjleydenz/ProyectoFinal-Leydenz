import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleConfirmPurchase = () => {
    clearCart();
    navigate('/thank-you');
  };

  return (
    <div className="checkout-container">
      <h2>Resumen de Compra</h2>
      {cart.map(item => (
        <div key={item.id}>
          <img src={item.image} alt={item.name} style={{ width: 100 }} />
          <p>{item.name} - {item.quantity} x ${item.price}</p>
        </div>
      ))}
      <p>Total: ${getTotalPrice()}</p>
      <button onClick={handleConfirmPurchase}>Confirmar Compra</button>
    </div>
  );
};

export default Checkout;
