export default function ButtonMaps({latitude, longitude}){
  
  const googleMapsURL = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <div className="mt-[10px]">
      <a className="p-[10px]  bg-[#318CE7] rounded-3xl text-white" href={googleMapsURL} target="_blank" rel="noopener noreferrer">
        <button>Ir a Google Maps</button>
      </a>
    </div>
  );

}