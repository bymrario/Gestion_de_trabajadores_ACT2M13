import React from 'react';

const FacturacionListComponent = ({ facturas }) => {
  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '15px',
      width: '300px',
      textAlign: 'center',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    },
    cardDetails: {
      fontSize: '14px',
      color: '#555',
    },
  };

  return (
    <div style={styles.container}>
      {facturas.map((factura) => (
        <div key={factura.id} style={styles.card}>
          <div style={styles.cardTitle}>{factura.clientName}</div>
          <div style={styles.cardDetails}>
            <p><strong>Número Factura:</strong> {factura.invoiceNumber}</p>
            <p><strong>Fecha:</strong> {factura.invoiceDate}</p>
            <p><strong>Costo Total:</strong> ${factura.amount}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacturacionListComponent;

