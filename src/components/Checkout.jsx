import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../config/firebase'; // Asegúrate de importar Firestore
import { collection, addDoc } from 'firebase/firestore'; // Funciones para agregar documentos a Firestore

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

  // Maneja la apertura del modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Maneja el cierre del modal
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

  // Guarda el cliente en Firestore y registra la orden
  const handleConfirmPurchase = async () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío. No puedes realizar una compra.');
      return;
    }

    // Validación de datos del cliente
    if (!clientData.firstName || !clientData.lastName || !clientData.dni || !clientData.phone || !clientData.email) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    try {
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

      // Redirigir a la página de agradecimiento con el ID de la orden
      navigate(`/thank-you/${orderRef.id}`);
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      alert('Hubo un error al procesar tu compra. Intenta de nuevo.');
    }

    // Cerrar el modal después de confirmar la compra
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

      {/* Modal para ingresar los datos del cliente */}
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
