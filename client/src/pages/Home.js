import React, { useEffect, useRef, useState } from "react";
import { Button, Form, message, Input } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { GeolocateControl, Marker, NavigationControl } from "react-map-gl";

function Home() {
  const [user, setUser] = useState();
  const loggedInUser = localStorage.getItem("accessToken");
  const [authenticated, setauthenticated] = useState(loggedInUser);

  const [lng, setLng] = useState(122.064845);
  const [lat, setLat] = useState(6.919168);
  // 6.9192622241711526, 122.06487489487877;
  let nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("lName");
    localStorage.removeItem("fName");
    return nav("/");
  };

  // console.log(213, process.env.REACT_APP_MAPBOX_TOKEN);
  if (!authenticated) {
    return <Navigate replace to="/" />;
  } else {
    return (
      <div className="homeContainer">
        <div className="headerContainer">
          <div>Welcome user {user}</div>
          <Button type="primary" onClick={logout}>
            Logout
          </Button>
        </div>

        <div className="mapStyles">
          <Map
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            style={{
              width: "100vw",
              height: "100vh",
              borderRadius: "15px",
              border: "2px solid black",
            }}
            initialViewState={{
              longitude: lng,
              latitude: lat,
              zoom: 7,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Marker
              longitude={122.06487489487877}
              latitude={6.9192622241711526}
            />
            <NavigationControl />
            <GeolocateControl />
          </Map>
        </div>
      </div>
    );
  }
}

export default Home;
