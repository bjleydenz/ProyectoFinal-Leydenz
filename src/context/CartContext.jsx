import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItemToCart = (product, selectedQuantity) => {
    if (!product || !product.id || !product.stock || !product.price) {
      console.error("Producto inválido", product);
      return;
    }

    if (selectedQuantity <= 0 || selectedQuantity > product.stock) {
      alert("Cantidad seleccionada no válida. No puedes agregar más de " + product.stock + " unidades.");
      return;
    }

    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);

      if (productIndex === -1) {
        return [...prevCart, { ...product, quantity: selectedQuantity }];
      } else {
        const updatedCart = [...prevCart];
        const newQuantity = updatedCart[productIndex].quantity + selectedQuantity;

        if (newQuantity > product.stock) {
          alert("No puedes agregar más de " + product.stock + " unidades.");
          return prevCart;
        } else {
          updatedCart[productIndex].quantity = newQuantity;
          return updatedCart;
        }
      }
    });
  };


  const removeItemFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        clearCart,
        getTotalQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
