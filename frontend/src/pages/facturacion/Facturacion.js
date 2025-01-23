import React, { useState } from 'react';
import FacturaForm from 'components/facturacion/FacturaForm';
import FacturacionListComponent from 'components/facturacion/FacturacionListComponent';

const Facturacion = () => {
  const [facturas, setFacturas] = useState([
    {
      id: 1,
      clientName: 'Cliente 1',
      invoiceNumber: '001',
      invoiceDate: '2025-01-20',
      amount: 1200,
    },
    {
      id: 2,
      clientName: 'Cliente 2',
      invoiceNumber: '002',
      invoiceDate: '2025-01-21',
      amount: 950,
    },
  ]);

  const [invoiceData, setInvoiceData] = useState({
    clientName: '',
    invoiceNumber: '',
    invoiceDate: '',
    amount: '',
  });

  const addNewFactura = () => {
    if (invoiceData.clientName && invoiceData.invoiceNumber && invoiceData.invoiceDate && invoiceData.amount) {
      setFacturas((prevFacturas) => [
        ...prevFacturas,
        { ...invoiceData, id: prevFacturas.length + 1 },
      ]);
      setInvoiceData({
        clientName: '',
        invoiceNumber: '',
        invoiceDate: '',
        amount: '',
      });
    }
  };

  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#f0f4f8',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333',
    },
    cardContainer: {
      marginBottom: '30px',
    },
    formContainer: {
      marginTop: '20px',
    },
    addButton: {
      marginTop: '10px',
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
    addButtonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Facturas</h1>
      <div style={styles.cardContainer}>
        <FacturacionListComponent facturas={facturas} />
      </div>
      <div style={styles.formContainer}>
        <FacturaForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
        <button
          style={styles.addButton}
          onClick={addNewFactura}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.addButtonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.addButton.backgroundColor)}
        >
          Añadir Factura
        </button>
      </div>
    </div>
  );
};

export default Facturacion;




