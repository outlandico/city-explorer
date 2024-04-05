import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle, CardText, Container, Row, Col } from 'reactstrap'; // Import Bootstrap components

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []); // Fetch movies on component mount

  const fetchMovies = async () => {
    try {
      const response = await axios.get('/movies'); // Send GET request to /movies endpoint
      if (response.status === 200) {
        setMovies(response.data); // Set movies state with fetched data
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <Container>
      <Row>
        {movies.map((movie, index) => (
          <Col key={index} sm="6" md="4" lg="3">
            <Card className="mb-4">
              <CardImg top width="100%" src={movie.imageUrl} alt={movie.title} />
              <CardBody>
                <CardTitle tag="h5">{movie.title}</CardTitle>
                <CardText>{movie.overview}</CardText>
                <CardText>Average Votes: {movie.averageVotes}</CardText>
                <CardText>Total Votes: {movie.totalVotes}</CardText>
                <CardText>Popularity: {movie.popularity}</CardText>
                <CardText>Released On: {movie.releasedOn}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Movies;
