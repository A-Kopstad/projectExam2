import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Welcome to Holidaze</h1>
          <p className="fs-4">
            Discover incredible venues and make your bookings hassle-free.
          </p>
          <div className="mt-4">
            <Link to="/discover" className="btn btn-light btn-lg me-2">
              Explore Venues
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg">
              Join Us Today
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features py-5">
        <div className="container">
          <p className="fs-2 fw-bold text-center mb-4">Why Choose Holidaze?</p>
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div className="feature-icon bg-light text-primary rounded-circle mx-auto mb-3">
                <i className="bi bi-search display-5"></i>
              </div>
              <p className="fs-4 fw-bold">Discover Venues</p>
              <p>
                Browse from a wide selection of unique venues tailored to your
                preferences.
              </p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="feature-icon bg-light text-primary rounded-circle mx-auto mb-3">
                <i className="bi bi-calendar-check display-5"></i>
              </div>
              <p className="fs-4 fw-bold">Book Seamlessly</p>
              <p>
                Secure your bookings effortlessly with our user-friendly
                platform.
              </p>
            </div>
            <div className="col-md-4 text-center mb-4">
              <div className="feature-icon bg-light text-primary rounded-circle mx-auto mb-3">
                <i className="bi bi-shield-check display-5"></i>
              </div>
              <p className="fs-4 fw-bold">Trusted Service</p>
              <p>
                Enjoy a safe and reliable booking experience with verified
                venues and reviews.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials bg-light py-5">
        <div className="container">
          <p className="fs-2 fw-bold text-center mb-4">What Our Users Say</p>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">
                    “Holidaze made my trip planning so much easier! I found
                    beautiful venues and booked instantly.”
                  </p>
                  <p className="fs-6 fw-bold text-primary">- Sarah J.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">
                    “The platform is so intuitive and the venue options are
                    amazing. Highly recommended!”
                  </p>
                  <p className="fs-6 fw-bold text-primary">- David M.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <p className="card-text">
                    “I love how easy it was to find a pet-friendly venue for my
                    family trip. Thank you, Holidaze!”
                  </p>
                  <p className="fs-6 fw-bold text-primary">- Emma W.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <footer className="cta bg-primary text-white text-center py-5">
        <div className="container">
          <p className="fs-2 fw-bold mb-4">Ready to Book Your Next Getaway?</p>
          <Link to="/discover" className="btn btn-light btn-lg me-2">
            Discover Now
          </Link>
          <Link to="/login" className="btn btn-outline-light btn-lg">
            Login
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
