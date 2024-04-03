
import { Card } from 'react-bootstrap'; // Import Bootstrap Card component
import PropTypes from 'prop-types'; // Import PropTypes

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
          <Card.Text>
            <strong>Temperature:</strong> {forecast.temperature}°C
          </Card.Text>
          {/* You can add more weather details here */}
        </Card.Body>
      </Card>
    </div>
  );
}

// Add prop type validation
Weather.propTypes = {
  forecast: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    // Add more PropTypes for other properties if needed
  }).isRequired,
};

export default Weather;
