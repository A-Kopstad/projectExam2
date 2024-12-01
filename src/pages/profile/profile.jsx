import React, { useState, useEffect } from 'react';
import { useFetchProfileByName } from '../../hooks/useFetchProfiles';
import { useFetchBookingsByProfile } from '../../hooks/useFetchProfiles';
import { useFetchVenuesByProfile } from '../../hooks/useFetchProfiles'; 
import { Button, Image } from 'react-bootstrap';
import EditProfileModal from '../../components/modals/editProfile';
import EditVenueModal from '../../components/modals/editVenue';  
import BookingList from './utiles/bookingList';
import VenueList from './utiles/venueList';
import CreateVenueModal from '../../components/modals/createVenue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/message/message';
import SpinnLoader from '../../components/spinnloader/spinnLoader';
import "./profile.scss";

const Profile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateVenueModal, setShowCreateVenueModal] = useState(false);
  const [showEditVenueModal, setShowEditVenueModal] = useState(false); 
  const [selectedVenue, setSelectedVenue] = useState(null); 
  const navigate = useNavigate();

  // Get username and accessToken from localStorage
  const username = localStorage.getItem('username');
  const accessToken = localStorage.getItem('accessToken');

  // Redirect to login if not logged in
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  // Fetch profile data
  const { data: profileData, error: profileError, isLoading: profileLoading } = useFetchProfileByName(username);

  // Fetch bookings data
  const { data: bookingsData, error: bookingsError, isLoading: bookingsLoading } = useFetchBookingsByProfile(username, { _venue: true });

  // Fetch venues data
  const { data: venuesData, error: venuesError, isLoading: venuesLoading } = useFetchVenuesByProfile(username);

  // Loader while fetching data
  if (profileLoading || bookingsLoading || venuesLoading) {
    return <SpinnLoader message="Loading your profile, bookings, and venues..." />;
  }

  // Error handling for profile, bookings or venues fetch
  if (profileError || bookingsError || venuesError) {
    const errorMessage = profileError?.message || bookingsError?.message || venuesError?.message || 'An unexpected error occurred.';
    return <Message variant="danger" onClose={() => {}}> {errorMessage} </Message>;
  }

  const { banner, avatar, email, bio } = profileData.data;

  // Handle opening Edit Venue Modal
  const handleEditVenue = (venue) => {
    setSelectedVenue(venue);
    setShowEditVenueModal(true);
  };

  return (
    <div className="container d-flex justify-content-center flex-column">
      {/* Banner */}
      {banner?.url && (
        <Image
          src={banner.url}
          alt={banner.alt || 'Banner'}
          fluid
          className="mb-4 profile-banner"
        />
      )}

      {/* Profile Section - Centered Content */}
      <div className="d-flex flex-column align-items-center mb-5 border-bottom pb-5">
        {/* Avatar */}
        <div className="mb-3">
          {avatar?.url && (
            <Image
              src={avatar.url}
              alt={avatar.alt || 'Avatar'}
              roundedCircle
              width="150"
              height="150"
            />
          )}
        </div>

        {/* Username */}
        <div className="text-center mb-2">
          <h1>{username}</h1>
        </div>

        {/* Email */}
        <div className="text-center mb-3">
          <p>{email}</p>
        </div>

        {/* Bio */}
        <p className="fw-bold mb-2">Bio:</p>
        {bio && <p className="text-center mb-3">{bio}</p>}

        {/* Edit Profile and Create Venue Buttons */}
        <div className="d-flex justify-content-center">
          <Button variant="primary" onClick={() => setShowEditModal(true)} className="mx-2">
            Edit Profile
          </Button>
          <Button variant="success" className="mx-2" onClick={() => setShowCreateVenueModal(true)}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Create Venue
          </Button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        profileData={profileData.data}
      />

      {/* Create Venue Modal */}
      <CreateVenueModal
        show={showCreateVenueModal}
        onHide={() => setShowCreateVenueModal(false)}
      />

      {/* Venues List */}
      <VenueList venues={venuesData?.data} onEditVenue={handleEditVenue} />
      
      {/* Bookings List */}
      <BookingList bookings={bookingsData.data} />

      {/* Edit Venue Modal */}
      {selectedVenue && (
        <EditVenueModal
          show={showEditVenueModal}
          onHide={() => setShowEditVenueModal(false)}
          venueData={selectedVenue}
        />
      )}
    </div>
  );
};

export default Profile;
