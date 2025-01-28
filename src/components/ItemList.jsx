/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './ItemList.css';

const ItemList = ({ items }) => {
  return (
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
          <Link to={`/item/${item.id}`} className="detail-link">
            Ver detalle
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
