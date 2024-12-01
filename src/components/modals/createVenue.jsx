import React, { useState } from 'react';
import { Modal, Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import { useCreateVenue } from '../../hooks/useFetchVenues';
import Message from '../../components/message/message';  

const CreateVenueModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    mediaUrl: '',
    price: '',
    maxGuests: '',
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
    address: '',
    city: '',
    zip: '',
    country: '',
    continent: '',
  });

  const { mutateAsync: createVenue, isLoading, error } = useCreateVenue();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newVenue = {
        name: formData.name,
        description: formData.description,
        media: [{ url: formData.mediaUrl }],
        price: parseFloat(formData.price),
        maxGuests: parseInt(formData.maxGuests),
        meta: {
          wifi: formData.wifi,
          parking: formData.parking,
          breakfast: formData.breakfast,
          pets: formData.pets,
        },
        location: {
          address: formData.address || null,
          city: formData.city || null,
          zip: formData.zip || null,
          country: formData.country || null,
          continent: formData.continent || null,
        },
      };
      await createVenue(newVenue);
      onHide();
    } catch (error) {
      console.error('Error creating venue:', error);
      alert('Failed to create venue.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Create Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Venue Name */}
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Venue Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Media URL */}
          <Form.Group controlId="mediaUrl" className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              name="mediaUrl"
              required
              value={formData.mediaUrl}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Price and Max Guests */}
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="price">
                <Form.Label>Price per Night</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  required
                  min="0"
                  max="10000"  
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="maxGuests">
                <Form.Label>Max Guests</Form.Label>
                <Form.Control
                  type="number"
                  name="maxGuests"
                  required
                  min="1"
                  max="100" 
                  value={formData.maxGuests}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Facilities */}
          <Form.Group controlId="facilities" className="mb-3">
            <Form.Label>Facilities</Form.Label>
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Wi-Fi"
                  name="wifi"
                  checked={formData.wifi}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Parking"
                  name="parking"
                  checked={formData.parking}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Breakfast"
                  name="breakfast"
                  checked={formData.breakfast}
                  onChange={handleChange}
                />
                <Form.Check
                  type="checkbox"
                  label="Pets Allowed"
                  name="pets"
                  checked={formData.pets}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form.Group>

          {/* Location */}
          <Form.Group controlId="location" className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mb-2"
            />
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="ZIP Code"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="mb-2"
                />
              </Col>
            </Row>
            <Form.Control
              type="text"
              placeholder="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mb-2"
            />
            <Form.Control
              type="text"
              placeholder="Continent"
              name="continent"
              value={formData.continent}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        {/* Message Component for errors or success */}
        {error && <Message variant="danger">{error.message}</Message>}

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="success" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Create Venue'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateVenueModal;
