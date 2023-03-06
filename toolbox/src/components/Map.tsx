import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiYW5uZW9sZCIsImEiOiJjbGV3bnNrMHIwZWw5M3pxdzJwNHM3dDdiIn0.R8xh7lwFlJu0-2hK76_qqg'
});

// interface GeocodeData {
//   center: [number, number];
// }

// const Map: React.FC = () => {
//   const [coordinates, setCoordinates] = useState<[number, number] | undefined>(undefined);
//   const location = 'New York, NY'; // Replace with the location you want to show

//   useEffect(() => {
//     const geocode = async () => {
//       const response = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//           location
//         )}.json?access_token="pk.eyJ1IjoiYW5uZW9sZCIsImEiOiJjbGV3bnNrMHIwZWw5M3pxdzJwNHM3dDdiIn0.R8xh7lwFlJu0-2hK76_qqg"`
//       );
//       const data: GeocodeData = await response.json();
//       if (data && data.center) {
//         setCoordinates(data.center);
//       }
//     };
//     geocode();
//   }, [location]);

//   return (
//     <div className="h-screen">
//       {coordinates && (
//         <Mapbox
//           style="mapbox://styles/mapbox/streets-v11"
//           center={coordinates}
//           zoom={[15]}
//           containerStyle={{ height: '100vh', width: '100vw' }}
//         >
//           <Marker coordinates={coordinates}>
//             <div className="bg-red-500 rounded-full w-6 h-6" />
//           </Marker>
//         </Mapbox>
//       )}
//     </div>
//   );
// };

// export default Map;


//versjon 2
// const Map: React.FC = () => {
//   return (
//     <div className="h-screen">
//     <Mapbox
//       style="mapbox://styles/mapbox/streets-v11"
//       center={[10.40620, 63.41660]}
//       zoom={[15]}
//       containerStyle={{ height: '100%', width: '100%' }}
//    />
     
   
//   </div>
//   );
// };

// export default Map;


interface Props {
  address: string;
}

const MapComponent: React.FC<Props> = ({ address }) => {
  const [coordinates, setCoordinates] = useState<[number, number]>([10.40620, 63.41660]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=pk.eyJ1IjoiYW5uZW9sZCIsImEiOiJjbGV3bnNrMHIwZWw5M3pxdzJwNHM3dDdiIn0.R8xh7lwFlJu0-2hK76_qqg`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        setCoordinates([longitude, latitude]);
      }
    };

    fetchCoordinates();
  }, [address]);

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v11"
      center={coordinates}
      zoom={[12]}
      containerStyle={{ height: '100vh', width: '100%' }}
    />
  );
};

export default MapComponent;
