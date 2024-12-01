import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useFetchVenues } from '../../hooks/useFetchVenues'; 
import VenueCard from '../../components/card/venueCard'; 
import SpinnLoader from '../../components/spinnloader/spinnLoader';
import Message from '../../components/message/message';

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, isLoading } = useFetchVenues();

  // Filter venues based on the search query
  const filteredVenues = data?.data?.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className='mt-4'>
      <h1>Discover Venues</h1>

      {/* Search Bar */}
      <Form className="mb-4 mt-5">
        <Row className="align-items-center">
          <Col>
            <Form.Control
              type="text"
              placeholder="Search venues by name or description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Col>
        </Row>
      </Form>

      {/* Loading Spinner */}
      {isLoading && <SpinnLoader message="Fetching venues..." />}

      {/* Error Message */}
      {error && (
        <Message variant="danger" onClose={() => {}}>
          Failed to load venues. Please try again later.
        </Message>
      )}

      {/* Venues List */}
      {!isLoading && !error && (
        <Row>
          {filteredVenues?.length > 0 ? (
            filteredVenues.map((venue) => (
              <Col key={venue.id} sm={12} md={6} xl={4} xxl={3}>
                <VenueCard
                  id={venue.id}
                  name={venue.name}
                  description={venue.description}
                  price={venue.price}
                  media={venue.media}
                  maxGuests={venue.maxGuests}
                  rating={venue.rating}
                />
              </Col>
            ))
          ) : (
            <Message variant="info" className="mt-4">
              No venues match your search criteria.
            </Message>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Discover;
