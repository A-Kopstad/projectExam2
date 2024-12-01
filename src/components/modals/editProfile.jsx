// EditProfileModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useUpdateProfile } from '../../hooks/useFetchProfiles';

const EditProfileModal = ({ show, onHide, profileData }) => {
  const { name, bio, avatar, banner, venueManager } = profileData;
  const [formData, setFormData] = useState({
    bio: bio || '',
    avatarUrl: avatar?.url || '',
    bannerUrl: banner?.url || '',
    venueManager: venueManager || false,
  });
  const { mutateAsync: updateProfile, isLoading } = useUpdateProfile();

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
      const updatedProfile = {
        bio: formData.bio,
        avatar: { url: formData.avatarUrl },
        banner: { url: formData.bannerUrl },
        venueManager: formData.venueManager,
      };
      await updateProfile({ name, updatedProfile });
      onHide();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Bio */}
          <Form.Group controlId="bio" className="mb-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Avatar URL */}
          <Form.Group controlId="avatarUrl" className="mb-3">
            <Form.Label>Avatar URL</Form.Label>
            <Form.Control
              type="url"
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Banner URL */}
          <Form.Group controlId="bannerUrl" className="mb-3">
            <Form.Label>Banner URL</Form.Label>
            <Form.Control
              type="url"
              name="bannerUrl"
              value={formData.bannerUrl}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Venue Manager Toggle */}
          <Form.Group controlId="venueManager" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Venue Manager"
              name="venueManager"
              checked={formData.venueManager}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="success" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditProfileModal;
