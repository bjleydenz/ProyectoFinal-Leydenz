import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './ThankYou.css';
import { Circles } from 'react-loader-spinner';

const ThankYou = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderAndClientDetails = async () => {
      try {
        const orderDocRef = doc(db, 'orders', orderId);
        const orderDoc = await getDoc(orderDocRef);

        if (orderDoc.exists()) {
          const orderData = orderDoc.data();
          setOrder(orderData);

          const clientDocRef = doc(db, 'clients', orderData.clientId);
          const clientDoc = await getDoc(clientDocRef);

          if (clientDoc.exists()) {
            setClient(clientDoc.data());
          } else {
            setError('Datos del cliente no encontrados');
          }
        } else {
          setError('Orden no encontrada');
        }
      } catch (error) {
        setError('Error al cargar los detalles de la orden o cliente');
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndClientDetails();
  }, [orderId]);

  // Función para imprimir la pantalla
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Circles 
          height="80" 
          width="80" 
          color="#4fa94d" 
          ariaLabel="circles-loading" 
          visible={true} 
        />
        <p>Cargando detalles de la compra...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="thank-you-container">
      {order && client ? (
        <>
          <h2>¡Gracias por tu compra, {client.firstName}!</h2>
          <p>ID de la orden: <strong>{orderId}</strong></p>
          <p>Fecha de la compra: {new Date(order.date).toLocaleString()}</p>
          <p>Total de la compra: <strong>${order.total}</strong></p>

          <h3>Información del cliente:</h3>
          <p>Nombre: {client.firstName} {client.lastName}</p>
          <p>Email: {client.email}</p>
          <p>Teléfono: {client.phone}</p>
          <p>DNI: {client.dni}</p>

          <h3>Productos adquiridos:</h3>
          <ul>
            {order.items.map((item) => (
              <li key={item.id} style={{ overflow: 'hidden', marginBottom: '10px' }}>
                <div style={{ float: 'left' }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: 200, marginRight: 10 }} 
                  />
                </div>
                <div style={{ float: 'right' }}>
                  {item.name} - {item.quantity} x ${item.price} = ${item.total}
                </div>
              </li>
            ))}
          </ul>

          <button 
            onClick={handlePrint} 
            style={{ 
              marginTop: '20px', 
              padding: '10px 20px', 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}
          >
            Imprimir Pantalla
          </button>
        </>
      ) : (
        <p>No se pudieron cargar los datos de la orden y/o cliente.</p>
      )}
    </div>
  );
};

export default ThankYou;
