import React, { useState, useEffect, useRef } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from "mapbox-gl";

  

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiYW5uZW9sZCIsImEiOiJjbGV3bnNrMHIwZWw5M3pxdzJwNHM3dDdiIn0.R8xh7lwFlJu0-2hK76_qqg'
});



interface Props {
  address: string;
 
}

const MapComponent: React.FC<Props> = ({ address }) => {
  const [coordinates, setCoordinates] = useState<[number, number]>([10.40620, 63.41660]);
  const marker = new mapboxgl.Marker({
    color: "#ff1500",
    draggable: false,
  }).setLngLat(coordinates);
  

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
      containerStyle={{ height: '50vh', width: '100%'}}
    
  />     

  );
};

export default MapComponent;
