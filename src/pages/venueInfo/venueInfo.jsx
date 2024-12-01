import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchVenueById } from '../../hooks/useFetchVenues';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button, InputGroup, FormControl, Row, Col, Container, Card } from 'react-bootstrap';
import { useCreateBooking } from '../../hooks/useFetchBookings';
import { FaWifi, FaCar, FaCoffee, FaPaw } from 'react-icons/fa';
import Message from '../../components/message/message';
import SpinnLoader from '../../components/spinnloader/spinnLoader';
import "./venueInfo.scss";

const VenueInfo = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetchVenueById(id, { _bookings: true });
  const { mutate: createBooking } = useCreateBooking();

  const [selectedDates, setSelectedDates] = useState([]);
  const [guestCount, setGuestCount] = useState(1);
  const [bookingError, setBookingError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const bookedDates = data?.data?.bookings?.map((booking) => {
    const startDate = new Date(booking.dateFrom);
    const endDate = new Date(booking.dateTo);
    const dateList = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      dateList.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateList;
  }).flat() || [];

  const isDateBooked = (date) => bookedDates.some((bookedDate) => bookedDate.toDateString() === date.toDateString());
  const isDateInPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  const tileDisabled = ({ date }) => isDateBooked(date) || isDateInPast(date);

  const handleBooking = () => {
    setBookingError(null);
    setSuccessMessage(null);

    if (selectedDates.length === 0) {
      setBookingError("Please select at least one date.");
      return;
    }

    if (selectedDates.some(isDateBooked)) {
      setBookingError("One or more selected dates are already booked.");
      return;
    }

    const { maxGuests } = data.data;

    if (guestCount < 1 || guestCount > maxGuests) {
      setBookingError(`Please select a valid number of guests (between 1 and ${maxGuests}).`);
      return;
    }

    const dateFrom = selectedDates[0].toISOString();
    const dateTo = selectedDates[selectedDates.length - 1].toISOString();

    const newBooking = {
      dateFrom,
      dateTo,
      guests: guestCount,
      venueId: id,
    };

    createBooking(newBooking, {
      onSuccess: () => {
        setBookingError(null);
        setSuccessMessage('Booking successful!');
      },
      onError: (error) => {
        console.error("Error creating booking:", error.response?.data || error.message);
        setBookingError("Failed to create booking. Please try again.");
      },
    });
  };

  if (isLoading) {
    return <SpinnLoader message="Loading venue details..." />;
  }

  if (error) {
    return (
      <Message variant="danger" onClose={() => {}}>
        Error fetching venue or bookings details. Please try again later.
      </Message>
    );
  }

  if (!data) {
    return (
      <Message variant="warning" onClose={() => {}}>
        No venue data available.
      </Message>
    );
  }

  const { name, description, media, price, maxGuests, meta, location } = data.data;

  const calculateTotalNights = () => {
    if (selectedDates.length === 2) {
      const [start, end] = selectedDates;
      const diffInMs = new Date(end) - new Date(start);
      return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    }
    return 0;
  };
  const totalPrice = calculateTotalNights() * price;

  return (
    <Container className="venue-info my-4">
      <Row className="mb-4">
        <Col>
          <h1>{name}</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={6}>
          {media && media[0]?.url && (
            <Card>
              <Card.Img variant="top" src={media[0].url} alt={media[0].alt || name} className="venue-image" />
            </Card>
          )}
        </Col>
        <Col md={6}>
          <Card className="p-3 h-100">
            <Card.Body>
              <Card.Text><span className="fw-bold">Description:</span> {description}</Card.Text>
              <Card.Text><span className="fw-bold">Price:</span> ${price} / night</Card.Text>
              <Card.Text><span className="fw-bold">Max Guests:</span> {maxGuests}</Card.Text>
              <Card.Text className="fw-bold fs-5">Venue Facts:</Card.Text>
              <ul>
                <li><FaWifi className="me-2" />WiFi: {meta?.wifi ? "Yes" : "No"}</li>
                <li><FaCar className="me-2" />Parking: {meta?.parking ? "Yes" : "No"}</li>
                <li><FaCoffee className="me-2" />Breakfast: {meta?.breakfast ? "Yes" : "No"}</li>
                <li><FaPaw className="me-2" />Pets Allowed: {meta?.pets ? "Yes" : "No"}</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card className="p-3">
            <Card.Body>
              <Card.Title>Location</Card.Title>
              <Card.Text><span>Address:</span> {location?.address}</Card.Text>
              <Card.Text><span>City:</span> {location?.city}</Card.Text>
              <Card.Text><span>Zip:</span> {location?.zip}</Card.Text>
              <Card.Text><span>Country:</span> {location?.country}</Card.Text>
              <Card.Text><span>Continent:</span> {location?.continent}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <p className="fw-bold fs-5">Select Dates</p>
          <div className="w-100">
            <Calendar
              onChange={handleDateChange}
              value={selectedDates}
              selectRange={true}
              tileDisabled={tileDisabled}
              className="w-100"
            />
          </div>
        </Col>
        <Col md={6}>
          <p className="fw-bold fs-5">Guests</p>
          <InputGroup className="mb-3">
            <InputGroup.Text>Guests</InputGroup.Text>
            <FormControl
              as="select"
              value={guestCount}
              onChange={(e) => setGuestCount(Math.min(Math.max(parseInt(e.target.value, 10), 1), maxGuests))}
            >
              {[...Array(maxGuests)].map((_, idx) => (
                <option key={idx} value={idx + 1}>
                  {idx + 1} {idx + 1 === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </FormControl>
          </InputGroup>
          <p className="fw-bold">Total Price: ${totalPrice}</p>
          <Button className='mb-5' variant="success" onClick={handleBooking}>Confirm Booking</Button>
        </Col>
      </Row>
      {bookingError && (
        <Message variant="danger" onClose={() => setBookingError(null)}>{bookingError}</Message>
      )}
      {successMessage && (
        <Message variant="success" onClose={() => setSuccessMessage(null)}>{successMessage}</Message>
      )}
    </Container>
  );
};

export default VenueInfo;
