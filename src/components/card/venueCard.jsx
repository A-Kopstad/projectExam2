import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./venueCard.scss"

const VenueCard = ({ id, name, price, media, maxGuests }) => {
  return (
    <Card className="mb-4">
      {media && media.length > 0 && (
        <Card.Img className='venueCardImage' variant="top" src={media[0]?.url} alt={media[0]?.alt || name} />
      )}
      <Card.Body>
        <Card.Title className='mb-4 text-truncate'>{name}</Card.Title>
        <Card.Text>
          <span className="fw-bold">Price:</span> ${price} / night
        </Card.Text>
        <Card.Text>
          <span className="fw-bold">Max Guests:</span> {maxGuests}
        </Card.Text>
        <Button as={Link} to={`/venueInfo/${id}`} variant="primary">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default VenueCard;
