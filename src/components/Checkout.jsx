import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import './Checkout.css';

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // Estado para el modal y datos del cliente
  const [showModal, setShowModal] = useState(false);
  const [clientData, setClientData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Actualiza los datos del cliente en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getProductById = async (id) => {
    try {
      const docRef = doc(db, "product", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error obteniendo el producto por ID:", error);
      throw error;
    }
  };

  // Función para actualizar el stock del producto
  const updateProductStock = async (productId, newStock) => {
    console.log(`Actualizando stock del producto ${productId} a ${newStock}`);
    try {
      const productRef = doc(db, "product", productId);
      await updateDoc(productRef, { stock: newStock });
      console.log(`Stock actualizado para el producto ${productId}`);
    } catch (error) {
      console.error(`Error al actualizar stock para ${productId}:`, error);
      throw error;
    }
  };

  const handleConfirmPurchase = async () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío. No puedes realizar una compra.');
      return;
    }

    if (!clientData.firstName || !clientData.lastName || !clientData.dni || !clientData.phone || !clientData.email) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    try {
      for (const item of cart) {
        const product = await getProductById(item.id);
        console.log(`Producto en Firebase: ${JSON.stringify(product)}`);

        if (product.stock < item.quantity) {
          console.error(`Stock insuficiente para el producto ${item.name}`);
          alert(`No hay suficiente stock para el producto: ${item.name}`);
          return;
        }

        // Actualizar stock después de la compra
        const newStock = product.stock - item.quantity;
        await updateProductStock(item.id, newStock);
      }

      // Guarda el cliente en Firestore
      const clientRef = await addDoc(collection(db, 'clients'), clientData);
      console.log('Cliente registrado con ID:', clientRef.id);

      // Registra la orden en Firestore
      const orderDetails = {
        items: cart,
        total: getTotalPrice(),
        date: new Date().toISOString(),
        clientId: clientRef.id, // Asociamos la orden al cliente
      };

      const orderRef = await addDoc(collection(db, 'orders'), orderDetails);
      console.log('Compra registrada con ID:', orderRef.id);

      // Vaciar carrito
      clearCart();

      navigate(`/thank-you/${orderRef.id}`);
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      alert('Hubo un error al procesar tu compra. Intenta de nuevo.');
    }

    setShowModal(false);
  };

  return (
    <div className="checkout-container">
      <h2>Resumen de Compra</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.name} style={{ width: 100 }} />
          <p>{item.name} - {item.quantity} x ${item.price}</p>
        </div>
      ))}
      <p>Total: ${getTotalPrice()}</p>
      <button onClick={handleOpenModal}>Confirmar Compra</button>

      {}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Datos del Cliente</h3>
            <form>
              <label>
                Nombre:
                <input
                  type="text"
                  name="firstName"
                  value={clientData.firstName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Apellido:
                <input
                  type="text"
                  name="lastName"
                  value={clientData.lastName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                DNI:
                <input
                  type="text"
                  name="dni"
                  value={clientData.dni}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Teléfono:
                <input
                  type="text"
                  name="phone"
                  value={clientData.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Correo:
                <input
                  type="email"
                  name="email"
                  value={clientData.email}
                  onChange={handleInputChange}
                />
              </label>
              <button type="button" onClick={handleConfirmPurchase}>
                Confirmar Compra
              </button>
              <button type="button" onClick={handleCloseModal}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
