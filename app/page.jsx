'use client'
import React, { useState, useEffect } from 'react';
import Filter from './components/filter/Filter';
import ButtonMaps from './components/maps/ButtonMaps';

export default function Bencina() {
  const [data, setData] = useState([]);
  const [selectedComuna, setSelectedComuna] = useState('');
  const [selectedGasolina, setSelectedGasolina] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.bencinaenlinea.cl/api/busqueda_estacion_filtro`, { cache: 'no-store' });
        const jsonData = await res.json();
        setData(jsonData.data);
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (!selectedComuna || !selectedGasolina) {
        setFilteredData([]);
        return;
      }
  
      const filtered = data
        .filter(estacion => estacion.comuna === selectedComuna)
        .map(estacion => {
          const filteredCombustibles = estacion.combustibles
            .filter(combustible => [1, 7, 2].includes(combustible.id) && combustible.id === parseInt(selectedGasolina));
          
          if (filteredCombustibles.length > 0) {
            return { ...estacion, combustibles: filteredCombustibles };
          }
          
          return null;
        }).filter(Boolean); // Remove stations with no matching gasoline
  
      // Sort the data by price from lowest to highest
      filtered.forEach(estacion => {
        estacion.combustibles.sort((a, b) => (a.precio || 0) - (b.precio || 0));
      });
  
      // Sort the stations themselves by the price of the first combustible (if available)
      filtered.sort((a, b) => {
        const precioA = a.combustibles[0] ? a.combustibles[0].precio || 0 : 0;
        const precioB = b.combustibles[0] ? b.combustibles[0].precio || 0 : 0;
        return precioA - precioB;
      });
  
      setFilteredData(filtered);
    };
  
    filterData();
  }, [selectedComuna, selectedGasolina, data]);
  
  
  

  return (
    <div>
      <Filter
        data={data}
        onFilterChange={(comuna, gasolina) => {
          setSelectedComuna(comuna);
          setSelectedGasolina(gasolina);
        }}
      />
      {selectedComuna && selectedGasolina && (
        <ul className="w-100 bg-white grid gap-4 grid-cols-1">
          {filteredData.map(estacion => (
            <li
              className="bg-card-color flex flex-col justify-center items-left rounded-lg p-[20px]"
              key={estacion.id}
            >
              {estacion.combustibles.map(combustible => (
                <img key={combustible.id}
                className="w-[100px] p-[10px]"
                src={estacion.logo}
                alt=""
              />
              ))}

              <div className="w-100 pl-[10px]">
                <h3 className="card-data">Dirección: {estacion.direccion}</h3>
                <h4 className="card-data">Región: {estacion.region}</h4>
                <h4 className="card-data">Comuna: {estacion.comuna}</h4>
              </div>
              {estacion.combustibles.map(combustible => (
                <div className="grid grid-cols-3 p-[10px]" key={combustible.id}>
                  <h1 className="card-data">{combustible.nombre_largo}</h1>
                  <h2 className="card-data">
                    Precio: ${Math.floor(combustible.precio).toLocaleString()}
                  </h2>
                  <h3 className="card-data">Actualización: {combustible.actualizado}</h3>
                </div>
              ))}
              <ButtonMaps latitude={estacion.latitud} longitude={estacion.longitud} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
