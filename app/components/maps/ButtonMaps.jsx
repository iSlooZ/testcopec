export default function ButtonMaps({ latitude, longitude }) {
  // URL de Google Maps con origen y destino especificados.
  const googleMapsURL = `https://www.google.com/maps/dir/?api=1&origin=Mi+Ubicacion&destination=${latitude},${longitude}`;

  const isAndroid = /Android/i.test(navigator.userAgent);
  const isWindows = /Windows/i.test(navigator.userAgent);

  const openGoogleMaps = () => {
    if (isAndroid) {
      // En dispositivos Android, utiliza el esquema "geo:" para abrir la aplicación de mapas.
      window.open(`geo:${latitude},${longitude}?q=${latitude},${longitude}`, '_blank');
    } else if (isWindows) {
      // En sistemas Windows, abre la URL de Google Maps con origen y destino especificados.
      window.open(googleMapsURL, '_blank');
    }
  };

  return (
    <div className="mt-[10px]">
      <button onClick={openGoogleMaps} className="p-[10px]  bg-[#318CE7] rounded-3xl text-white">
        Ir a Google Maps
      </button>
    </div>
  );
}
