import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZmFudGFzdGljMSIsImEiOiJjamVnYmdob3YxcWVkMndvMjQ0Z3FjN2V6In0.D-BiTLPXPYK1q6jNb6e-Sw";

import styles from "../styles/map.module.css";

const Map = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-84.49);
  const [lat, setLat] = useState(39.1031);
  // const [zoom, setZoom] = useState(12);
  const [zoom, setZoom] = useState(11);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.on("load", () => {
      map.current.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (err, img) => {
          if (err) throw err;
          map.current.addImage("custom-marker", img);
          map.current.addSource("points", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: markers,
            },
          });
        }
      );
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    console.log("UE THROWN");
    Object.entries(props.points).forEach((point) => {
      console.log(point[1]);
      const GeoJSONForPoint = {
        type: "Feature",
        properties: {
          title: point[0],
        },
        geometry: {
          type: "Point",
          coordinates: point[1],
        },
      };
      setMarkers((markers) => [...markers, GeoJSONForPoint]);
    });
  }, [props.points]);

  return (
    <div>
      <div ref={mapContainer} className={styles.mapContainer} />
      {JSON.stringify(markers)}
    </div>
  );
};

export default Map;
