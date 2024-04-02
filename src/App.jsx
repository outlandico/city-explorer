import React, { useState } from 'react';
import CityForm from './CityForm.jsx';
import './App.css'; // Import the CSS file

function App() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({});
  const [error, setError] = useState('');

  async function getLocation() {
    if (!city) {
      setError("Please enter a city!");
      setLocation({});
      return;
    }

    try {
      const response = await fetch(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${city}&format=json`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setLocation(jsonData);
      setError('');
    } catch (error) {
      console.error("Error getting location information", error);
      setError("Error getting location information");
    }
  }

  return (
    <div className="red-background"> {/* Apply the CSS class */}
      <CityForm 
        city={city} 
        setCity={setCity} 
        getLocation={getLocation} 
        error={error} 
      />
      {/* Display location information here */}
    </div>
  );
}

export default App;
