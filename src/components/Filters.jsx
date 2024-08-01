import React from 'react';

const Filters = ({ filters, setFilters, applyFilters }) => {
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name === 'make' || name === 'model') {
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: checked ? value : ''
      }));
    }
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      make: '',
      model: '',
      year: '',
      transmission: '',
      combinedConsumptionMin: '',
      combinedConsumptionMax: ''
    });
    applyFilters({
      make: '',
      model: '',
      year: '',
      transmission: '',
      combinedConsumptionMin: '',
      combinedConsumptionMax: ''
    });
  };

  return (
    <div className="flex flex-col p-4 bg-gray-100 rounded-lg border-2 border-gray-300 shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4">
        <div className='flex flex-col lg:flex-row gap-2'>
          <div className="text-start">
            <label className='font-bold text-xl'>Marca</label>
            <ul className='flex flex-col text-sm'>
              {['GMC', 'Toyota', 'Panther', 'Audi', 'Renault', 'Ferrari', 'Lamborghini'].map(make => (
                <li className='flex gap-2' key={make}>
                  <input
                    type="checkbox"
                    name="make"
                    value={make.toLowerCase()}
                    checked={filters.make === make.toLowerCase()}
                    onChange={handleCheckboxChange}
                  />
                  <label>{make}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col text-start">
            <label className='font-bold text-xl'>Modelo</label>
            <ul className='flex flex-col text-sm'>
              {['Gallardo', 'Modena', 'Allroad Quattro', 'Convertible', 'Allroad', 'Kallista', 'Rally G35', 'Caballero', 'Previa', 'Rally G15', 'Supra'].map(model => (
                <li className='flex gap-2' key={model}>
                  <input
                    type="checkbox"
                    name="model"
                    value={model.toLowerCase()}
                    checked={filters.model === model.toLowerCase()}
                    onChange={handleCheckboxChange}
                  />
                  <label>{model}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col text-start">
          <label className='font-bold text-xl pb-2'>Año</label>
          <input 
            type="text"
            name="year"
            value={filters.year || ''}
            onChange={(e) => setFilters(prevFilters => ({
              ...prevFilters,
              year: e.target.value
            }))}
            placeholder="Año desde 1985-2024"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex flex-col text-start">
          <label className='font-bold text-xl'>Transmisión</label>
          <div className='flex flex-col gap-1 mt-2'>
            <label className='flex items-center gap-1 text-sm'>
              <input
                type="radio"
                name="transmission"
                value="a"
                checked={filters.transmission === 'a'}
                onChange={handleRadioChange}
              />
              Automática
            </label>
            <label className='flex items-center gap-1 text-sm'>
              <input
                type="radio"
                name="transmission"
                value=""
                checked={filters.transmission === ''}
                onChange={handleRadioChange}
              />
              Ninguna
            </label>
            <label className='flex items-center gap-1 text-sm'>
              <input
                type="radio"
                name="transmission"
                value="m"
                checked={filters.transmission === 'm'}
                onChange={handleRadioChange}
              />
              Manual
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <label className='font-bold text-xl text-start'>Consumo</label>
          <div className='flex gap-4'>
            <input
              className='w-24 border border-gray-300 rounded'
              type="number"
              placeholder='Min'
              name="combinedConsumptionMin"
              value={filters.combinedConsumptionMin}
              onChange={e => setFilters(prevFilters => ({ ...prevFilters, combinedConsumptionMin: e.target.value }))}
            />
            <input
              className='w-24 border border-gray-300 rounded'
              type="number"
              placeholder='Max'
              name="combinedConsumptionMax"
              value={filters.combinedConsumptionMax}
              onChange={e => setFilters(prevFilters => ({ ...prevFilters, combinedConsumptionMax: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-2 bg-gray-500 hover:bg-gray-500/80 text-white rounded px-4 py-2"
          >
            Limpiar Filtros
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
