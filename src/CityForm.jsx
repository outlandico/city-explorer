import React, { useState } from 'react';

function CityForm() {
  const [city, setCity] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform further actions with the city name, such as fetching data from an API
    console.log('City submitted:', city); 
    // fetch location from the locationiq API
    // put location into the app state
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a city name:
          <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Enter city name"
          />
        </label>
        <button type="submit">Explore!</button>
      </form>
      {mapLoaded && (
        <div style={{ width: '100%', height: '400px' }}>
          {/* Your map component goes here */}
          <iframe
            title="City Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://maps.google.com/maps?q=${city}&output=embed`}
            onLoad={handleMapLoad}
          />
        </div>
      )}
    </div>
  );
}

export default CityForm;
