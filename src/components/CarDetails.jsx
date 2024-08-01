import React from 'react';

const CarDetails = ({ car, onBack }) => {
  if (!car) return null;

  const { make, model, year, transmission, combined_mpg, location } = car;

  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 bg-gray-800 text-white px-4 py-2 rounded">Volver</button>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">{make} {model}</h2>
        <p><strong>Año:</strong> {year}</p>
        <p><strong>Transmisión:</strong> {transmission}</p>
        <p><strong>Consumo combinado (MPG):</strong> {combined_mpg}</p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Ubicación del vehículo:</h3>
          <p><strong>Latitud:</strong> {location.lat}</p>
          <p><strong>Longitud:</strong> {location.lon}</p>
          {/* Aquí es donde se integraría un mapa */}
          <div id="map" style={{ height: '300px', width: '100%' }}>
            {/* Integración con un mapa, como Google Maps o Leaflet */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
