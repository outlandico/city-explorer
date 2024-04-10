import PropTypes from 'prop-types'; // Import PropTypes library
import WeatherDay from './WeatherDay';

function Weather({ forecastData }) {
  return (
    <div className="weather">
      <h2>Weather Forecast</h2>
      {forecastData.map((day, index) => (
        <WeatherDay key={index} date={day.date} description={day.description} />
      ))}
    </div>
  );
}

// Prop types validation
Weather.propTypes = {
  forecastData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Weather;
