/*
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ItemListContainer.css';
import { getProducts } from '../../config/firebase';
import { Circles } from 'react-loader-spinner';

// eslint-disable-next-line react/prop-types
const ItemListContainer = ({ mensaje }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        setItems(products);
      } catch (error) {
        setError("Error al cargar los productos");
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="item-list-container">
      <h2>{mensaje}</h2>
      
      {loading ? (
        <div className="loader-container">
          <Circles 
            height="80" 
            width="80" 
            color="#4fa94d" 
            ariaLabel="circles-loading" 
            visible={true} 
          />
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <img
                src={item.image}
                style={{ minWidth: 200, maxWidth: 200, width: 200, height: 200 }}
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Precio: ${item.price}</p>
              <Link to={`/item/${item.id}`}>Ver detalle</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemListContainer;
*/
import { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import './ItemListContainer.css';
import { getProducts } from '../../config/firebase';
import { Circles } from 'react-loader-spinner';

// eslint-disable-next-line react/prop-types
const ItemListContainer = ({ mensaje }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        setItems(products);
      } catch (error) {
        setError("Error al cargar los productos");
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="item-list-container">
      <h2>{mensaje}</h2>
      
      {loading ? (
        <div className="loader-container">
          <Circles 
            height="80" 
            width="80" 
            color="#4fa94d" 
            ariaLabel="circles-loading" 
            visible={true} 
          />
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setLoading(true)}>Reintentar</button>
        </div>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <img
                src={item.image}
                className="item-image"
                alt={`Imagen de ${item.name}`}
              />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Precio: ${item.price}</p>
              <Link to={`/item/${item.id}`} className="detail-link">Ver detalle</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemListContainer;
