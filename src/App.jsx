import  { useState } from 'react';
import CityForm from './CityForm.jsx';
import './App.css'; // Import the CSS file

function App() {
  const [city, setCity] = useState('');
  const [error, setError] = useState(0);

  async function getLocation() {
    if (!city) {
      setError("Please enter a city!");
      return;
    }

    try {
      const response = await fetch(`https://us1.locationiq.com/v1/search?key=${import.meta.env.REACT_APP_LOCATION_API_KEY}&q=${city}&format=json`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setCity(jsonData)
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
