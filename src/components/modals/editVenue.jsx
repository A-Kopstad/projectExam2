import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import { useUpdateVenue, useDeleteVenue } from '../../hooks/useFetchVenues';
import Message from '../../components/message/message'; 

const EditVenueModal = ({ show, onHide, venueData }) => {
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

  const { mutate: updateVenue, isLoading, error } = useUpdateVenue();
  const { mutate: deleteVenue, isLoading: isDeleting, error: deleteError } = useDeleteVenue();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (venueData) {
      setFormData({
        name: venueData.name || '',
        description: venueData.description || '',
        mediaUrl: venueData.media[0]?.url || '',
        price: venueData.price || '',
        maxGuests: venueData.maxGuests || '',
        wifi: venueData.meta?.wifi || false,
        parking: venueData.meta?.parking || false,
        breakfast: venueData.meta?.breakfast || false,
        pets: venueData.meta?.pets || false,
        address: venueData.location?.address || '',
        city: venueData.location?.city || '',
        zip: venueData.location?.zip || '',
        country: venueData.location?.country || '',
        continent: venueData.location?.continent || '',
      });
    }
  }, [venueData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedVenue = {
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
      await updateVenue({ id: venueData.id, updatedVenue });
      setMessage('Venue updated successfully!');
      onHide();
    } catch (error) {
      console.error('Error updating venue:', error);
      setMessage('Failed to update venue. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVenue(venueData.id);
      onHide();
    } catch (error) {
      console.error('Error deleting venue:', error);
      setMessage('Failed to delete venue. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Form onSubmit={handleSave}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Venue</Modal.Title>
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

          {/* Message (Error or Success) */}
          {message && <Message variant={error || deleteError ? 'danger' : 'success'}>{message}</Message>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? <Spinner animation="border" size="sm" /> : 'Delete Venue'}
          </Button>
          <Button variant="secondary" onClick={onHide} disabled={isLoading || isDeleting}>
            Cancel
          </Button>
          <Button variant="success" type="submit" disabled={isLoading || isDeleting}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditVenueModal;
