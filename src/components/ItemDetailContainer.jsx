import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ItemDetailContainer.css';
import { getProductById } from '../../config/firebase';
import ItemCount from './ItemCount';
import { Circles } from 'react-loader-spinner';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const product = await getProductById(id);
        if (!product) {
          setError("Producto no encontrado.");
        } else {
          setItem(product);
        }
      } catch (error) {
        setError("Error al cargar el producto.");
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <div className="item-detail-container">
      {loading ? (
        <div className="loader-container">
                  <Circles 
                    height="80" 
                    width="80" 
                    color="#4fa94d" 
                    ariaLabel="circles-loading" 
                    visible={true} 
                  />
                  <p>Cargando detalle del producto...</p>
                </div>
        
      ) : error ? (
        <p>{error}</p>
      ) : item ? (
        <>
          <img
            src={item.image || "default-image.jpg"}
            alt={item.name}
            style={{ minWidth: 200, maxWidth: 200 }}
          />
          <h2>{item.name}</h2>
          <p>{item.description || "Descripción no disponible."}</p>
          <p>Precio: ${item.price}</p>
          <ItemCount stock={item.stock} product={item} />
        </>
      ) : (
        <p>Producto no encontrado.</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
