import React from 'react';

const FacturaForm = ({ invoiceData, setInvoiceData }) => {
  const styles = {
    form: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form style={styles.form}>
      <label style={styles.label}>Nombre del Cliente</label>
      <input
        type="text"
        name="clientName"
        value={invoiceData.clientName}
        onChange={handleChange}
        style={styles.input}
      />
      <label style={styles.label}>Número de Factura</label>
      <input
        type="text"
        name="invoiceNumber"
        value={invoiceData.invoiceNumber}
        onChange={handleChange}
        style={styles.input}
      />
      <label style={styles.label}>Fecha</label>
      <input
        type="date"
        name="invoiceDate"
        value={invoiceData.invoiceDate}
        onChange={handleChange}
        style={styles.input}
      />
      <label style={styles.label}>Costo Total</label>
      <input
        type="number"
        name="amount"
        value={invoiceData.amount}
        onChange={handleChange}
        style={styles.input}
      />
    </form>
  );
};

export default FacturaForm;






