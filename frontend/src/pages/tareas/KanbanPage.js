import React, { useState } from 'react';
import Board, { moveCard } from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';

const KanbanPage = () => {
  const [board, setBoard] = useState({
    columns: [
      {
        id: 1,
        title: 'To Do',
        cards: [
          {
            id: 1,
            title: 'Tarea 1',
            description: 'Completar el diseño para nuevas mejoras',
          },
          {
            id: 2,
            title: 'Tarea 2',
            description: 'Realizar units Test para la API',
          },
        ],
      },
      {
        id: 2,
        title: 'In Progress',
        cards: [
          {
            id: 3,
            title: 'Tarea 3',
            description: 'Implementar nueva API.',
          },
        ],
      },
      {
        id: 3,
        title: 'Done',
        cards: [
          {
            id: 4,
            title: 'Tarea 4',
            description: 'Corregir Bugs.',
          },
        ],
      },
    ],
  });

  const handleCardDragEnd = (card, source, destination) => {
    if (!destination) return; 
    const updatedBoard = moveCard(board, source, destination);
    setBoard(updatedBoard);
  };

  const handleRenameColumn = (columnId, newTitle) => {
    if (!newTitle) return; 
    setBoard((prevBoard) => {
      const updatedColumns = prevBoard.columns.map((column) => {
        if (column.id === columnId) {
          return { ...column, title: newTitle };
        }
        return column;
      });
      return { ...prevBoard, columns: updatedColumns }; 
    });
  };

  const handleRemoveColumn = (columnId) => {
    setBoard((prevBoard) => {
      const updatedColumns = prevBoard.columns.filter(
        (column) => column.id !== columnId
      );
      return { ...prevBoard, columns: updatedColumns }; 
    });
  };

  const handleAddCard = (columnId) => {
    const title = prompt('Titulo:');
    const description = prompt('Descripción:');

    if (title && description) {
      const newCard = {
        id: Date.now(),
        title,
        description,
      };

      setBoard((prevBoard) => {
        const updatedColumns = prevBoard.columns.map((column) => {
          if (column.id === columnId) {
            return { ...column, cards: [...column.cards, newCard] };
          }
          return column;
        });

        return {
          ...prevBoard,
          columns: updatedColumns,
        };
      });
    }
  };

  const handleRemoveCard = (columnId, cardId) => {
    setBoard((prevBoard) => {
      const updatedColumns = prevBoard.columns.map((column) => {
        if (column.id === columnId) {
          const updatedCards = column.cards.filter(
            (card) => card.id !== cardId
          );
          return { ...column, cards: updatedCards };
        }
        return column;
      });

      return {
        ...prevBoard,
        columns: updatedColumns,
      };
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          const newColumn = { id: Date.now(), title: 'New Column', cards: [] };
          setBoard((prevBoard) => ({
            ...prevBoard,
            columns: [...prevBoard.columns, newColumn],
          }));
        }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          margin: '10px',
          position: 'fixed',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        Añadir columna
      </button>

      <div style={{ marginTop: '60px' }}>
        <Board
          children={board}
          onCardDragEnd={handleCardDragEnd} // Agregamos el evento
          renderColumnHeader={({ title, columnId }) => (
            <div
              style={{
                backgroundColor: title === 'To Do' ? '#00BFFF' :
                  title === 'In Progress' ? '#FFA500' : '#4CAF50',
                padding: '10px',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '20px',
                position: 'relative',
              }}
            >
              <span>{title}</span>
              <div>
                <button
                  onClick={() =>
                    handleRenameColumn(columnId, prompt('Nuevo nombre:'))
                  }
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '20px',
                    cursor: 'pointer',
                  }}
                >
                  &#9998; {/* Icono de lápiz */}
                </button>
                <button
                  onClick={() => handleRemoveColumn(columnId)}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '20px',
                    cursor: 'pointer',
                  }}
                >
                  &#10006; 
                </button>
              </div>
            </div>
          )}
          renderColumn={(column) => (
            <div key={column.id}>
              <div
                style={{
                  backgroundColor: column.title === 'To Do' ? '#00BFFF' :
                    column.title === 'In Progress' ? '#FFA500' : '#4CAF50',
                  padding: '10px',
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '20px',
                  position: 'relative',
                }}
              >
                <span>{column.title}</span>
                <div>
                  <button
                    onClick={() =>
                      handleRenameColumn(column.id, prompt('Nuevo nombre:'))
                    }
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontSize: '20px',
                      cursor: 'pointer',
                    }}
                  >
                    &#9998; {/* Icono de lápiz */}
                  </button>
                  <button
                    onClick={() => handleRemoveColumn(column.id)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#fff',
                      fontSize: '20px',
                      cursor: 'pointer',
                    }}
                  >
                    &#10006; 
                  </button>
                </div>
              </div>

              {column.cards.map((card) => (
                <div
                  key={card.id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '5px',
                    padding: '10px',
                    marginBottom: '10px',
                    width: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '120px',
                    position: 'relative',
                  }}
                >
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                  <button
                    onClick={() => handleRemoveCard(column.id, card.id)}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#000',
                      border: 'none',
                      fontSize: '16px',
                      cursor: 'pointer',
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                    }}
                  >
                    &#10006; 
                  </button>
                </div>
              ))}


              <button
                onClick={() => handleAddCard(column.id)}
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  width: '100%',
                }}
              >
                Add New Card
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default KanbanPage;
