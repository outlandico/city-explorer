import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Weather({ forecast }) {
  return (
    <div className="weather-container">
      <h2 className="mb-4">Weather Forecast</h2>
      <Card>
        <Card.Body>
          <Card.Title>Date: {forecast.date}</Card.Title>
          <Card.Text>
            <strong>Description:</strong> {forecast.description}
          </Card.Text>
          {forecast.temperature && (
            <Card.Text>
              <strong>Temperature:</strong> {forecast.temperature}°C
            </Card.Text>
          )}
          {forecast.humidity && (
            <Card.Text>
              <strong>Humidity:</strong> {forecast.humidity}%
            </Card.Text>
          )}
          {forecast.windSpeed && (
            <Card.Text>
              <strong>Wind Speed:</strong> {forecast.windSpeed} km/h
            </Card.Text>
          )}
          {/* Add more weather details here */}
        </Card.Body>
      </Card>
    </div>
  );
}

Weather.propTypes = {
  forecast: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    temperature: PropTypes.number,
    humidity: PropTypes.number,
    windSpeed: PropTypes.number,
    // Add PropTypes for other properties if needed
  }).isRequired,
};

export default Weather;
