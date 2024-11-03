import React from 'react';
import './Informes.css';

const Informes = () => {
  // Datos simulados de informes
  const reports = [
    { id: 1, title: 'Informe Anual 2023', date: '01/01/2023' },
    { id: 2, title: 'Reporte de Ventas Q1', date: '15/03/2023' },
    { id: 3, title: 'Informe de Auditoría', date: '30/06/2023' },
  ];

  const openReport = (reportId) => {
    // Simulación de abrir el informe como un PDF
    window.open(`/reportes/${reportId}`, '_blank');
  };

  return (
    <div className="reports-container">
      <h2><span>Informes</span></h2>
      <div className="report-list">
        {reports.map((report) => (
          <div key={report.id} className="report-card">
            <h3>{report.title}</h3>
            <p>{report.date}</p>
            <button onClick={() => openReport(report.id)}>Ver Informe</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Informes;
