import { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner';
import './ItemListContainer.css';
import { getProducts } from '../../config/firebase';
import ItemList from './ItemList';

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
        <ItemList items={items} />
      )}
    </div>
  );
};

export default ItemListContainer;
