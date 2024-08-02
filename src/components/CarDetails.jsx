import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const CarDetails = ({ car, onBack }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Ensure leaflet CSS is loaded
    if (mapRef.current) {
      mapRef.current.leafletElement.invalidateSize();
    }
  }, [car]);

  if (!car) {
    return null;
  }

  const { make, model, year, transmission, combination_mpg, location } = car;
  const coordinates = location || { lat: 0, lon: 0 }; 

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
  return (
    <div className=" flex flex-col items-center p-4 ">
      <button onClick={onBack} className="mb-4 bg-gray-500 hover:bg-gray-500/80 text-white px-4 py-2 rounded">
        Volver
      </button>
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow">
        <h2 className="text-center text-2xl font-bold mb-4 uppercase">{make} {model}</h2>
        {/* Información del vehículo */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <p className='text-lg'><strong>Año:</strong> {year}</p>
          <p className='text-lg'><strong>Transmisión:</strong> {convertTransmission(transmission)}</p>
          <p className='text-lg'><strong>Consumo combinado (MPG):</strong> {combination_mpg}</p>
          </div>
          <div className="flex-1">
            <h3 className=" text-lg font-bold">Ubicación del vehículo:</h3>
            <p className='text-lg'><strong>Latitud:</strong> {coordinates.lat}</p>
            <p className='text-lg'><strong>Longitud:</strong> {coordinates.lon}</p>
          </div>
        </div>

        {/* Mapa */}
        <div className="h-80">
          <MapContainer  className='rounded-md'
            center={[coordinates.lat, coordinates.lon]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              
            />
            <Marker position={[coordinates.lat, coordinates.lon]}>
              <Popup>
                {make} {model} <br /> {year}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
