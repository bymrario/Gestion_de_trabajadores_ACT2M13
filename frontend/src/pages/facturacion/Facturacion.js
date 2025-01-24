import React, { useState, useEffect } from 'react';
import FacturaForm from 'components/facturacion/FacturaForm';

const Facturacion = () => {
  const [facturas, setFacturas] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    clienteId: '', 
    items: [],
    total: '',
    impuestos: '',
    descuento: '',
    estado: 'Pendiente', 
    fecha: '',
    fechaVencimiento: '2025-02-01', 
  });

  // Obtener todas las facturas desde el backend
  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await fetch('http://localhost:8083/facturas');
        const data = await response.json();
        if (response.ok) {
          setFacturas(data);
        } else {
          console.error('Error al obtener facturas', data);
        }
      } catch (error) {
        console.error('Error de conexión', error);
      }
    };

    fetchFacturas();
  }, []);

  // Función para crear una nueva factura y enviarla al backend
  const addNewFactura = async () => {
    if (invoiceData.clienteId && invoiceData.items.length > 0 && invoiceData.total && invoiceData.impuestos) {
      try {
        const response = await fetch('http://localhost:8083/facturas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clienteId: invoiceData.clienteId, 
            items: invoiceData.items,
            total: parseFloat(invoiceData.total),
            impuestos: parseFloat(invoiceData.impuestos),
            descuento: parseFloat(invoiceData.descuento),
            estado: invoiceData.estado,
            fecha: invoiceData.fecha,
            fechaVencimiento: invoiceData.fechaVencimiento,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setFacturas((prevFacturas) => [
            ...prevFacturas,
            { ...data, id: prevFacturas.length + 1 },
          ]);
          setInvoiceData({
            clienteId: '',
            items: [],
            total: '',
            impuestos: '',
            descuento: '',
            estado: 'Pendiente',
            fecha: '',
            fechaVencimiento: '2025-02-01',
          });
        } else {
          console.error('Error al crear la factura', data);
        }
      } catch (error) {
        console.error('Error de conexión', error);
      }
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
    formContainer: {
      marginBottom: '30px',
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
    tableContainer: {
      marginTop: '30px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    tableHeader: {
      backgroundColor: '#f2f2f2',
      textAlign: 'left',
      padding: '10px',
    },
    tableRow: {
      textAlign: 'left',
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    tableCell: {
      padding: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Facturación</h1>

      {/* Formulario para crear facturas */}
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

      {/* Listado de facturas */}
      <div style={styles.tableContainer}>
        <h2>Listado de Facturas</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Cliente</th>
              <th style={styles.tableHeader}>Número de Factura</th>
              <th style={styles.tableHeader}>Fecha</th>
              <th style={styles.tableHeader}>Monto</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{factura.id}</td>
                <td style={styles.tableCell}>{factura.clienteId}</td> {/* Usar clienteId o nombre del cliente si lo tienes */}
                <td style={styles.tableCell}>{factura.idFactura}</td>
                <td style={styles.tableCell}>{factura.fecha}</td>
                <td style={styles.tableCell}>{factura.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Facturacion;
