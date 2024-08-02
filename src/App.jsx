import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import Filters from './components/Filters';
import CarDetails from './components/CarDetails';


const getRandomCoordinates = () => {
  const latitude = (Math.random() * 180 - 90).toFixed(6); // Latitud entre -90 y 90
  const longitude = (Math.random() * 360 - 180).toFixed(6); // Longitud entre -180 y 180
  return { lat: parseFloat(latitude), lon: parseFloat(longitude) };
};
const App = () => {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    year: '',
    transmissionType: '',
    combinedConsumptionMin: '',
    combinedConsumptionMax: ''
  });

  const [allCars, setCars] = useState([]);
  const [displayCars, setDisplayCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(20);
  const [selectedCar, setSelectedCar] = useState(null);
  const [currentView, setCurrentView] = useState('table'); // 'table' or 'details'

  const fetchCars = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      let queryString = Object.keys(filters)
        .filter(key => filters[key] && filters[key] !== '' && key !== 'combinedConsumptionMin' && key !== 'combinedConsumptionMax')
        .map(key => `${key}=${encodeURIComponent(filters[key])}`)
        .join('&');

      if (filters.combinedConsumptionMin || filters.combinedConsumptionMax) {
        const consumptionQuery = [
          filters.combinedConsumptionMin && `min_comb_mpg=${filters.combinedConsumptionMin}`,
          filters.combinedConsumptionMax && `max_comb_mpg=${filters.combinedConsumptionMax}`
        ].filter(Boolean).join('&');
        
        queryString += (queryString ? '&' : '') + consumptionQuery;
      }
      
      if (!queryString) {
        queryString = 'model=all';
      }
  
      const url = `https://api.api-ninjas.com/v1/cars?${queryString}&limit=200`;
      const response = await fetch(url, {
        headers: { 'X-Api-Key': '0lyH8RlORS9lOZmumIF3Wg==8rkTtPC2E6lsnH5i' },
      });
      
      if (!response.ok) {
        throw new Error('No hay respuesta del servidor');
      }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(filters);
  }, [filters]);

  useEffect(() => {
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    setDisplayCars(allCars.slice(indexOfFirstCar, indexOfLastCar));
  }, [allCars, currentPage]);

  const totalPages = Math.ceil(allCars.length / carsPerPage);

  const handleSelectCar = (car) => {
    // Usar la función para obtener coordenadas aleatorias en todo el mundo
    const coordinates = getRandomCoordinates();
    setSelectedCar({ ...car, location: coordinates });
    setCurrentView('details');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-roboto">
      {currentView === 'table' ? (
        <>
          <aside className="w-full lg:w-1/4 p-4">
            <Filters filters={filters} setFilters={setFilters} applyFilters={fetchCars} />
          </aside>
          <main className="flex-grow">
            <header className="bg-gray-800 text-white py-4 px-6">
              <h1 className="text-2xl font-bold">Información de Autos</h1>
            </header>
            <div className="p-4 border-1 border-gray-100 shadow-md">
              <Table
                cars={displayCars}
                loading={loading}
                error={error}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                onSelectCar={handleSelectCar}
              />
            </div>
          </main>
        </>
      ) : (
        <main className="flex-grow">
          <CarDetails car={selectedCar} onBack={() => setCurrentView('table')} />
        </main>
      )}
    </div>
  );
}

export default App;
