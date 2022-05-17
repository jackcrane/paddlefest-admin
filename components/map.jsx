import React from "react";
import { Map } from "../pigeon-maps";
import { Marker } from "../pigeon-maps/src/overlays/Marker.tsx";

export function MyMap({ points }) {
  const mapboxProvider = (x, y, z, dpr) => {
    return `https://api.mapbox.com/v4/mapbox.satellite/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png?access_token=pk.eyJ1IjoiZmFudGFzdGljMSIsImEiOiJjamVnYmdob3YxcWVkMndvMjQ0Z3FjN2V6In0.D-BiTLPXPYK1q6jNb6e-Sw`;
  };

  const requestNotification = async (entry) => {
    if (
      confirm(
        "You are about to send a notification to a user. Do you want to continue"
      )
    ) {
      let f = await fetch(
        "http://localhost:3001/send-notification/individual",
        {
          method: "POST",
          body: {
            to: entry.expo,
            title: prompt("What should the notification title be?"),
            body: prompt("What should the body of the notification be?"),
          },
        }
      );
      console.log(f);
    }
  };

  return (
    <>
      <Map
        height={600}
        defaultCenter={[39.1031, -84.51]}
        defaultZoom={13}
        provider={mapboxProvider}
      >
        {points.length > 0 &&
          points.map((point, i) => (
            <Marker
              key={i}
              width={10}
              onClick={() => requestNotification(point)}
              anchor={[point.location.latitude, point.location.longitude]}
            />
          ))}
      </Map>
    </>
  );
}

export default MyMap;
