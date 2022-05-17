import React from "react";
import { Map, Marker } from "pigeon-maps";

export function MyMap(points) {
  const mapboxProvider = (x, y, z, dpr) => {
    return `https://api.mapbox.com/v4/mapbox.satellite/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png?access_token=pk.eyJ1IjoiZmFudGFzdGljMSIsImEiOiJjamVnYmdob3YxcWVkMndvMjQ0Z3FjN2V6In0.D-BiTLPXPYK1q6jNb6e-Sw`;
  };
  return (
    <>
      {JSON.stringify(points)}
      <Map
        height={600}
        defaultCenter={[39.1031, -84.51]}
        defaultZoom={13}
        provider={mapboxProvider}
      >
        {Object.entries(points.points).map((point, i) => (
          // <p>{JSON.stringify(point)}</p>
          <Marker key={i} width={30} anchor={point[1]} />
        ))}
      </Map>
    </>
  );
}

export default MyMap;
