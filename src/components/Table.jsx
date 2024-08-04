import React from 'react';

const convertTransmission = (transmission) => {
  switch (transmission) {
    case 'a':
      return 'Automático';
    case 'm':
      return 'Manual';
    default:
      return 'Desconocido';
  }
};
const Table = ({ cars, loading, error, currentPage, totalPages, setCurrentPage, onSelectCar }) => {
  if (loading) return <p>Cargando Datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='bg-white rounded-lg'>
      <div className='overflow-y-auto' style={{ maxHeight: '700px' }}>
        <table className="text-center w-full ">
          <thead className='bg-white sticky top-0 z-10' style={{ boxShadow: '0 2px 5px -2px rgba(0, 0, 0, 0.7)' }}>
            <tr className='text-gray-700 font-bold'>
              <th>Tipo de Auto</th>
              <th>Tipo de Combustible</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Tipo de Transmisión</th>
              <th>Consumo en Ciudad (km/l)</th>
              <th>Consumo en Carretera (km/l)</th>
              <th>Consumo Mixto (km/l)</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr
                key={index}
                className='border-b border-gray-400 hover:bg-gray-200 cursor-pointer'
                onClick={() => onSelectCar(car)}
              >
                <td>{car.class}</td>
                <td>{car.fuel_type}</td>
                <td>{car.make}</td>
                <td className='ps-4 pe-4'>{car.model}</td>
                <td>{car.year}</td>
                <td>{convertTransmission(car.transmission)}</td>
                <td>{car.city_mpg}</td>
                <td>{car.highway_mpg}</td>
                <td>{car.combination_mpg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4 bg-gray-100">
        <button
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-500/80 text-white rounded"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-500/80 text-white rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Table;
