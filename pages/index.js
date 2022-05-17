import { useEffect, useState } from "react";
import Map from "../components/map";

const Home = () => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [locations, setLocations] = useState([]);

  // useEffect(() => {
  //   const ws = new WebSocket(
  //     // "wss://paddlefestbackend.jackcrane.rocks/dash/watch"
  //     "ws://localhost:3001/dash/watch"
  //     // "wss://otten-sheep-brake-74-215-156-75.loca.lt/dash/watch"
  //   );
  //   ws.onerror = function (error) {
  //     console.log("WebSocket Error ", error);
  //   };
  //   ws.onopen = () => {};
  //   ws.onmessage = (event) => {
  //     const e = JSON.parse(event.data);
  //     console.log(e);
  //     if (e.fullDocument) {
  //       const _locations = {
  //         ...locations,
  //         [e.fullDocument.deviceId]: [
  //           e.fullDocument.location.latitude,
  //           e.fullDocument.location.longitude,
  //         ],
  //       };
  //       console.log(_locations);
  //       console.log({
  //         [e.fullDocument.deviceId]: [
  //           e.fullDocument.location.latitude,
  //           e.fullDocument.location.longitude,
  //         ],
  //       });
  //       setLocations(_locations);
  //       console.log(e.fullDocument.deviceId);
  //     }
  //     if (e.type === "init") {
  //       const _locations = {
  //         ...locations,
  //         [e.points[0].deviceId]: [
  //           e.points[0].location.latitude,
  //           e.points[0].location.longitude,
  //         ],
  //       };
  //       setLocations(_locations);
  //       console.log(e.points[0].deviceId);
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   setLocations({
  //     "ac1110a8-0435-41a1-83a2-1385b222f7cd": [
  //       39.08281445046797, -84.39922598933582,
  //     ],
  //   });
  //   console.log("RESET");
  // }, []);

  useEffect(() => {
    setInterval(async () => {
      let f = await fetch("http://localhost:3001/all-points");
      if (f.status === 200) {
        setLocations(await f.json());
      }
    }, 500);
  }, []);

  return (
    <div>
      <Map points={locations} />
    </div>
  );
};

export default Home;
