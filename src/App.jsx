import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import Filters from './components/Filters';

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

  const fetchCars = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      // Construir la consulta basada en los filtros
      let queryString = Object.keys(filters)
        .filter(key => filters[key] && filters[key] !== '' && key !== 'combinedConsumptionMin' && key !== 'combinedConsumptionMax')
        .map(key => `${key}=${encodeURIComponent(filters[key])}`)
        .join('&');
      
      // Manejar el rango de consumo combinado
      if (filters.combinedConsumptionMin || filters.combinedConsumptionMax) {
        const consumptionQuery = [
          filters.combinedConsumptionMin && `min_comb_mpg=${filters.combinedConsumptionMin}`,
          filters.combinedConsumptionMax && `max_comb_mpg=${filters.combinedConsumptionMax}`
        ].filter(Boolean).join('&');
        
        queryString += (queryString ? '&' : '') + consumptionQuery;
      }
      
      // Si no hay filtros activos, agregar `model=all`
      if (!queryString) {
        queryString = 'model=all';
      }
  
      // Agregar `limit=200` al final
      const url = `https://api.api-ninjas.com/v1/cars?${queryString}&limit=200`;
      
      // Solicitar datos de la API
      const response = await fetch(url, {
        headers: { 'X-Api-Key': process.env.REACT_APP_API_KEY },
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
    // Calcular los coches que se deben mostrar en la página actual
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    setDisplayCars(allCars.slice(indexOfFirstCar, indexOfLastCar));
  }, [allCars, currentPage]);

  const totalPages = Math.ceil(allCars.length / carsPerPage);

  return (
<div className="flex flex-col lg:flex-row">
  <aside className="w-full lg:w-1/4 p-4">
    <Filters filters={filters} setFilters={setFilters} applyFilters={fetchCars} />
  </aside>
  <main className="flex-grow">
    <header className="bg-gray-800 text-white py-4 px-6">
      <h1 className="text-2xl font-bold">Información de Autos</h1>
    </header>
    <div className="p-4 border-1 border-gray-100 shadow-md">
      <Table
        className="table-auto"
        cars={displayCars}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  </main>
</div>

  );
}

export default App;
