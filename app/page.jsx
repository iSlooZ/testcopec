'use client'
import React, { useState, useEffect } from 'react';
import Filter from '@/components/filter/Filter';
import Image from 'next/image';

export default function Bencina() {
  const [data, setData] = useState([]);
  const [selectedComuna, setSelectedComuna] = useState('');

  useEffect(() => {
    // Realiza la solicitud a la API y establece los datos en el estado
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.bencinaenlinea.cl/api/busqueda_estacion_filtro`, { cache: 'no-store' });
        const jsonData = await res.json();
        setData(jsonData.data);
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    fetchData(); // Llama a la función para obtener datos cuando el componente se monta
  }, []);

  return (
    <div>
      <Filter data={data} onFilterChange={comuna => setSelectedComuna(comuna)} />
      {selectedComuna && (
        <ul className="w-100 bg-white grid gap-4 grid-cols-1 ">
          {data
            .filter(estacion => estacion.comuna === selectedComuna)
            .map(estacion => (
              <li className="bg-card-color flex flex-col justify-center items-left  rounded-lg p-[20px]" key={estacion.id}>
                <img className="w-[100px] p-[10px]" src="http://api.bencinaenlinea.cl/storage/logo/1697478048_logo5.jpg" alt="" />
                <div className="w-100 pl-[10px]">
                  <h3 className="card-data">Dirección: {estacion.direccion}</h3>
                  <h4 className="card-data">Región: {estacion.region}</h4>
                  <h4 className="card-data">Comuna: {estacion.comuna}</h4>
                </div>
                {estacion.combustibles
                  .filter(combustible => [1, 7, 2].includes(combustible.id))
                  .sort((a, b) => {
                    const order = [1, 7, 2];
                    return order.indexOf(a.id) - order.indexOf(b.id);
                  })
                  .map(combustible => (
                    <div className="grid grid-cols-3 p-[10px]" key={combustible.id}>
                      <h1 className="card-data">{combustible.nombre_largo}</h1>
                      <h2 className="card-data">Precio: ${Math.floor(combustible.precio).toLocaleString()}</h2>
                      <h3 className="card-data">Actualización: {combustible.actualizado}</h3>
                    </div>
                  ))}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
