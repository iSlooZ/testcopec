import React, { useState } from 'react';

export default function Filter({ data, onFilterChange }) {
  const comunas = [...new Set(data.map(estacion => estacion.comuna))];

  // Ordena las comunas alfabéticamente por la primera letra
  comunas.sort((a, b) => a.localeCompare(b));

  const [selectedComuna, setSelectedComuna] = useState('');

  const handleComunaChange = (e) => {
    const comuna = e.target.value;
    setSelectedComuna(comuna);
    onFilterChange(comuna);
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
    </div>
  );
}