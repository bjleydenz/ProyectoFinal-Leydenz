import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Por favor ingresa un correo válido.");
      return;
    }
    if (formData.message.length < 10) {
      setError("El mensaje debe tener al menos 10 caracteres.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "contactperson"), formData);
      console.log("Documento agregado con ID: ", docRef.id);
      setSubmitted(true);
      setError(null);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("Error al enviar el formulario: ", err);
      setError("Hubo un problema al enviar el formulario. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Contáctanos</h2>
      {submitted && (
        <p className="success-message">
          ¡Gracias por contactarnos! Pronto te responderemos.
        </p>
      )}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Nombre:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Teléfono:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Correo:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mensaje:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <button type="submit" className="submit-button">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
