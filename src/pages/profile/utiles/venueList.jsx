import React, { useState } from 'react';
import { Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { useFetchVenueById } from '../../../hooks/useFetchVenues';
import "./venueList.scss";

const VenueList = ({ venues, onEditVenue }) => {
  const [showModal, setShowModal] = useState(false); 
  const [selectedVenue, setSelectedVenue] = useState(null); 

  // Open the modal and set the selected venue
  const handleSeeBookings = (venue) => {
    setSelectedVenue(venue);
    setShowModal(true);
  };

  // Close the modal and reset the selected venue
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVenue(null);
  };

  // Fetch venue details including bookings when a venue is selected
  const { data: venueWithBookings, error, isLoading } = useFetchVenueById(
    selectedVenue?.id,
    { _bookings: true } 
  );

  return (
    <div>
      <p className="fs-4 text-center">Your Venues</p>
      <Row>
        {venues?.length > 0 ? (
          venues.map((venue) => (
            <Col key={venue.id} xs={12} sm={6} md={4} className="mb-3">
              <Card>
                <Card.Img
                  className='venueListImage'
                  variant="top"
                  src={venue.media[0]?.url}
                  alt={venue.media[0]?.alt || venue.name}
                />
                <Card.Body>
                  <Card.Title className="fs-5 text-truncate">{venue.name}</Card.Title>
                  <p>{venue.description}</p>
                  <p><span className="fw-bold">Price:</span> ${venue.price}/ night</p>
                  <p><span className="fw-bold">Location:</span> {venue.location.address}, {venue.location.city}</p>
                  <Button variant="success" onClick={() => onEditVenue(venue)}>
                    Edit Venue
                  </Button>{' '}
                  <Button variant="primary" onClick={() => handleSeeBookings(venue)}>
                    See Bookings
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No venues found for this profile.</p>
        )}
      </Row>

      {/* Modal to display bookings */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bookings for {selectedVenue?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <p>Loading bookings...</p>
          ) : error ? (
            <p>Error loading bookings: {error.message}</p>
          ) : venueWithBookings?.data?.bookings?.length > 0 ? (
            <div>
              {venueWithBookings.data.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="pb-3 mb-3"
                  style={{ borderBottom: '1px solid #dee2e6' }} 
                >
                  <p><span className="fw-bold">Customer:</span> {booking.customer?.name}</p>
                  <p><span className="fw-bold">From:</span> {new Date(booking.dateFrom).toLocaleDateString()}</p>
                  <p><span className="fw-bold">To:</span> {new Date(booking.dateTo).toLocaleDateString()}</p>
                  <p><span className="fw-bold">Guests:</span> {booking.guests}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No bookings for this venue.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VenueList;
