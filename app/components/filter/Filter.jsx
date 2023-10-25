import React, { useState } from 'react';

export default function Filter({ data, onFilterChange }) {
  const comunas = [...new Set(data.map(estacion => estacion.comuna))];


  // Ordena las comunas alfabéticamente por la primera letra
  comunas.sort((a, b) => a.localeCompare(b));

  const [selectedComuna, setSelectedComuna] = useState('');
  const [selectedGasolina, setSelectedGasolina] = useState(''); // Estado para el tipo de gasolina seleccionado

  const handleComunaChange = (e) => {
    const comuna = e.target.value;
    setSelectedComuna(comuna);
    onFilterChange(comuna, selectedGasolina); // Llama a la función onFilterChange con comuna y tipo de gasolina
  };

  const handleGasolinaChange = (e) => {
    const gasolina = e.target.value;
    setSelectedGasolina(gasolina);
    onFilterChange(selectedComuna, gasolina); // Llama a la función onFilterChange con comuna y tipo de gasolina
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Filtrar por Comuna:</label>
      <select
        value={selectedComuna}
        onChange={handleComunaChange}
        className="mt-1 p-2 rounded border border-gray-300 w-full"
      >
        <option value="">Selecciona tu comuna</option>
        {comunas.map((comuna, index) => (
          <option key={index} value={comuna}>
            {comuna}
          </option>
        ))}
      </select>

      <label className="block text-sm font-medium text-gray-700 mt-4">Filtrar por Tipo de Gasolina:</label>
      <select
        value={selectedGasolina}
        onChange={handleGasolinaChange}
        className="mt-1 p-2 rounded border border-gray-300 w-full"
      >
        <option value="">Selecciona el tipo de gasolina</option>
        <option value="1">Gasolina 93</option>
        <option value="7">Gasolina 95</option>
        <option value="2">Gasolina 97</option>
      </select>
    </div>
  );
}
