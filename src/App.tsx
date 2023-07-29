import React, { useState, useEffect, ChangeEvent } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import JobCountries from './Components/JobCountries/JobCountries';
import { CountriesProvider } from './ShareDataCtx/AppCtx';

const southAfricaMarkers: [number, number][] = [
    [-30.5595, 22.9375], // Cape Town
    [-26.2041, 28.0473], // Johannesburg
    [-29.8587, 31.0218], // Durban
    [-33.9249, 18.4241], // Pretoria
    [-33.9258, 18.4232], // Bloemfontein
    [-33.9673, 25.6003], // Port Elizabeth
];

const southAfricaCities: string[] = [
    'Cape Town',
    'Johannesburg',
    'Durban',
    'Pretoria',
    'Bloemfontein',
    'Port Elizabeth',
];

const americanMarkers: [number, number][] = [
    [40.7128, -74.0060], // New York
    [34.0522, -118.2437], // Los Angeles
    [41.8781, -87.6298], // Chicago
    [29.7604, -95.3698], // Houston
    [39.9526, -75.1652], // Philadelphia
    [33.4484, -112.0740], // Phoenix
];

const americanCities: string[] = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Philadelphia',
    'Phoenix',
];

interface location {
    position: [number, number]
}
const LocationMarker: React.FC<location> = (props: location) => {
    const { position } = props;
    const map = useMap();

    const handleMapClick = () => {
        map.flyTo(position, map.getZoom());
    };

    useEffect(() => {
        console.table(position)
        handleMapClick()
    }, [map, position]);

    return <Marker position={position}>
        <Popup>You are here</Popup>
    </Marker>

};

function App() {
    const initialPosition: [number, number] = [51.505, -0.09];
    const [position, setPosition] = useState<[number, number]>(initialPosition);
    const [group, setGroup] = useState<'southAfrica' | 'america'>('southAfrica');
    // Function to handle latitude and longitude changes
    const handleCoordinatesChange = (latitude: number, longitude: number) => {
        setPosition([latitude, longitude]);
    };

    // Function to handle city selection from dropdown
    const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCityIndex = parseInt(event.target.value);
        if (group === 'southAfrica') {
            const [latitude, longitude] = southAfricaMarkers[selectedCityIndex];
            setPosition([latitude, longitude]);
        } else {
            const [latitude, longitude] = americanMarkers[selectedCityIndex];
            setPosition([latitude, longitude]);
        }
    };

    // Function to handle group selection from dropdown
    const handleGroupChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedGroup = event.target.value as 'southAfrica' | 'america';
        setGroup(selectedGroup);
    };

    // Fly to the first city in the selected group on component mount or group change
    useEffect(() => {
        if (group === 'southAfrica') {
            const [latitude, longitude] = southAfricaMarkers[0];
            setPosition([latitude, longitude]);

        } else {
            const [latitude, longitude] = americanMarkers[0];
            setPosition([latitude, longitude]);
        }
    }, [group]);

    return (
        <CountriesProvider>
        <div className="App">

            <div className="flex">
                <JobCountries />
                <MapContainer center={position} zoom={5} scrollWheelZoom={false} zoomControl={true} className="h-96">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Render South Africa markers */}
                    {group === 'southAfrica'
                        ? southAfricaMarkers.map((markerPosition, index) => (
                            <Marker key={index} position={markerPosition}>
                                <Popup>
                                    {southAfricaCities[index]}: <br />
                                    Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}
                                </Popup>
                            </Marker>
                        ))
                        : null}

                    {/* Render American markers */}
                    {group === 'america'
                        ? americanMarkers.map((markerPosition, index) => (
                            <Marker key={index + southAfricaMarkers.length} position={markerPosition}>
                                <Popup>
                                    {americanCities[index]}: <br />
                                    Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}
                                </Popup>
                            </Marker>
                        ))
                        : null}

                    {/* LocationMarker to handle user's location */}
                    <LocationMarker position={position} />
                </MapContainer>
            </div>

            {/* Dropdown to select a group */}
            {/* <div>
        <label>Select a group:</label>
        <select onChange={handleGroupChange} value={group}>
          <option value="southAfrica">South Africa</option>
          <option value="america">America</option>
        </select>
      </div> */}

            {/* Dropdown to select a city */}
            {/* <div>
        <label>Select a city:</label>
        <select onChange={handleCityChange}>
          {group === 'southAfrica'
            ? southAfricaCities.map((city, index) => (
                <option key={index} value={index}>
                  {city}
                </option>
              ))
            : americanCities.map((city, index) => (
                <option key={index} value={index}>
                  {city}
                </option>
              ))}
        </select>
      </div> */}

            {/* Input fields for latitude and longitude */}
            {/* <div>
        <label>Latitude:</label>
        <input
          type="number"
          value={position[0]} // Latitude value from the state
          onChange={(e) => handleCoordinatesChange(parseFloat(e.target.value), position[1])}
        />
        <br />
        <label>Longitude:</label>
        <input
          type="number"
          value={position[1]} // Longitude value from the state
          onChange={(e) => handleCoordinatesChange(position[0], parseFloat(e.target.value))}
        />
      </div> */}

            {/* MapContainer with dynamic position and zoom controls */}

        </div>
        </CountriesProvider>

    );
}

export default App;
