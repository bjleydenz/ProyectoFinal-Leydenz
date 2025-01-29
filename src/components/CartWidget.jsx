import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
// import PropTypes from 'prop-types';

const CartWidget = () => {
  const { getTotalQuantity } = useCart();
  const totalItems = getTotalQuantity();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/carrito");
  };

  if (totalItems === 0) return null;

  return (
    <button
      onClick={handleClick}
      className="cart-widget-button"
      aria-label={`Ver carrito con ${totalItems} productos`}
      role="button"
    >
      🛒 Carrito ({totalItems})
    </button>
  );
};

CartWidget.propTypes = {
};

export default CartWidget;
