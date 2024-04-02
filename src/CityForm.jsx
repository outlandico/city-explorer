// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

function CityForm() {
  const [city, setCity] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('City submitted:', city); 
    setMapLoaded(true); // Set mapLoaded to true when the form is submitted
  };

  const handleChange = (event) => {
    setCity(event.target.value);
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
          <iframe
            title="City Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={`https://maps.google.com/maps?q=${city}&output=embed`}
          />
        </div>
      )}
    </div>
  );
}

export default CityForm;
