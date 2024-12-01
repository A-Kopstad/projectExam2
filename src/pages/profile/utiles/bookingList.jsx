import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const BookingList = ({ bookings }) => {
  if (!bookings || bookings.length === 0) {
    return <p className='text-center'>No bookings found.</p>;
  }

  return (
    <div className="mt-5">
      <p className="fs-4 text-center">Your Bookings</p>
      <Row>
        {bookings.map((booking) => (
          <Col key={booking.id} xs={12} sm={6} md={4} className="mb-3">
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="fs-5">{booking.venue.name}</Card.Title>
                <div>
                  <p><span className="fw-bold">Date From:</span> {new Date(booking.dateFrom).toLocaleDateString()}</p>
                  <p><span className="fw-bold">Date To:</span> {new Date(booking.dateTo).toLocaleDateString()}</p>
                  <p><span className="fw-bold">Guests:</span> {booking.guests}</p>
                  <p><span className="fw-bold">Price:</span> ${booking.venue.price}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BookingList;
