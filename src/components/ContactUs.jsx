import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactUs.css";

const ContactUs = ({ darkMode = false }) => {
  const formRef = useRef();
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // ✅ USE ENVIRONMENT VARIABLES - NOT HARDCODED
  const API_URL = `${process.env.REACT_APP_API_URL?.replace(/\/$/, '')}/api/contact/send-mail`;

  // ✅ USE ENVIRONMENT VARIABLE
  const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || "918279922559";
  
  // ✅ USE ENVIRONMENT VARIABLE
  const EMAIL_USER = process.env.REACT_APP_EMAIL_USER || "tarun.panwar182@gmail.com";

  // Get user's live location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Location error:", error);
          setLocationError("Location access denied");
        }
      );
    }
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Updated handleSubmit with toast notifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          location: userLocation || null
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success toast - auto closes in 3 seconds
        toast.success("✅ Message sent successfully! I'll get back to you soon.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: darkMode ? "dark" : "light",
        });
        
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("API Error:", error);
      // Error toast - auto closes in 3 seconds
      toast.error("❌ Failed to send message. Please try again or contact me directly via WhatsApp.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: darkMode ? "dark" : "light",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open WhatsApp with pre-filled message
  const openWhatsApp = (message = "") => {
    const text = message || "Hi Tarun! I visited your portfolio and would like to connect.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Open Google Maps with directions
  const openDirections = () => {
    // ✅ FIXED: Use separate variables instead of object shorthand
    const lat = parseFloat(process.env.REACT_APP_LOCATION_LAT) || 28.4595;
    const lng = parseFloat(process.env.REACT_APP_LOCATION_LNG) || 77.0266;
    const address = process.env.REACT_APP_LOCATION_ADDRESS || "Gurgaon, Haryana, India";
    
    const YOUR_LOCATION = { lat, lng, address };
    const url = `https://www.google.com/maps/dir/?api=1&destination=${YOUR_LOCATION.lat},${YOUR_LOCATION.lng}`;
    window.open(url, "_blank");
  };

  // Calculate distance between two points (km)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  };

  return (
    <section 
      ref={sectionRef}
      className={`contact-section ${darkMode ? "dark" : "light"} ${isVisible ? "in-view" : ""}`} 
      id="contact"
    >
      {/* Toast Container - place it here */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
      
      <div className="contact-container">
        {/* Animated Background Elements */}
        <div className="bg-blob blob-1"></div>
        <div className="bg-blob blob-2"></div>
        <div className="bg-blob blob-3"></div>

        {/* Header */}
        <div className={`contact-header ${isVisible ? "animate-in" : ""}`}>
          <h2 className="contact-title">
            <span className="title-line">Let's Work</span>
            <span className="title-line highlight">Together</span>
          </h2>
          <p className="contact-subtitle">
            Have a Project in mind? Send me a message and let's create something amazing!
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className={`quick-actions ${isVisible ? "animate-in" : ""}`}>
          <button onClick={() => openWhatsApp()} className="quick-action-btn whatsapp">
            <span className="action-icon">💬</span>
            <div className="action-text">
              <strong>Chat on WhatsApp</strong>
              <small>Usually responds in 10 min</small>
            </div>
          </button>
          
          <button onClick={openDirections} className="quick-action-btn location">
            <span className="action-icon">📍</span>
            <div className="action-text">
              <strong>Get Directions</strong>
              {/* ✅ USE ENVIRONMENT VARIABLE */}
              <small>{process.env.REACT_APP_LOCATION_ADDRESS || "Gurgaon, Haryana, India"}</small>
            </div>
          </button>
        </div>

        {/* Distance Indicator */}
        {userLocation && (
          <div className={`distance-badge ${isVisible ? "animate-in" : ""}`}>
            <span className="pulse-dot"></span>
            <p>
              You're approximately {calculateDistance(userLocation.lat, userLocation.lng, parseFloat(process.env.REACT_APP_LOCATION_LAT || 28.4595), parseFloat(process.env.REACT_APP_LOCATION_LNG || 77.0266))} km away
            </p>
          </div>
        )}

        {/* Contact Content */}
        <div className="contact-content">
          {/* Contact Info Cards */}
          <div className="contact-info">
            {[
              { 
                icon: "💬", 
                title: "WhatsApp", 
                value: `+${process.env.REACT_APP_WHATSAPP_NUMBER || "91 8279922559"}`, 
                action: () => openWhatsApp(),
                actionText: "Message Now →",
                highlight: true
              },
              { 
                icon: "📧", 
                title: "Email", 
                value: process.env.REACT_APP_EMAIL_USER || "tarun.panwar182@gmail.com", 
                link: `mailto:${process.env.REACT_APP_EMAIL_USER || "tarun.panwar182@gmail.com"}`, 
                linkText: "Send Email →" 
              },
              { 
                icon: "📱", 
                title: "Phone", 
                value: `+${process.env.REACT_APP_WHATSAPP_NUMBER || "91 8279922559"}`, 
                link: `tel:+${process.env.REACT_APP_WHATSAPP_NUMBER || "918279922559"}`, 
                linkText: "Call Now →" 
              },
              { 
                icon: "📍", 
                title: "Location", 
                value: process.env.REACT_APP_LOCATION_ADDRESS || "Gurgaon, India", 
                action: openDirections,
                actionText: "Get Directions →",
                subtext: userLocation ? `${calculateDistance(userLocation.lat, userLocation.lng, parseFloat(process.env.REACT_APP_LOCATION_LAT || 28.4595), parseFloat(process.env.REACT_APP_LOCATION_LNG || 77.0266))} km away` : "Available Worldwide"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`info-card ${item.highlight ? 'highlight' : ''} ${isVisible ? "animate-in" : ""}`} 
                style={{ "--delay": `${index * 0.1}s` }}
              >
                <div className="info-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.value}</p>
                {item.subtext && <small className="subtext">{item.subtext}</small>}
                {item.action ? (
                  <button onClick={item.action} className="action-link">
                    {item.actionText}
                  </button>
                ) : (
                  <a href={item.link}>{item.linkText}</a>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className={`contact-form ${isVisible ? "animate-in" : ""}`}
            style={{ "--delay": "0.3s" }}
          >
            <div className="form-header">
              <h3>Send Message</h3>
              <p>Fill out the form below and I'll respond within 24 hours.</p>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label>Your Name</label>
                <span className="input-focus"></span>
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label>Your Email</label>
                <span className="input-focus"></span>
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder=" "
                />
                <label>Subject</label>
                <span className="input-focus"></span>
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper textarea-wrapper">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder=" "
                />
                <label>Your Message</label>
                <span className="input-focus"></span>
              </div>
            </div>

            {/* WhatsApp Quick Send */}
            <div className="whatsapp-quick-send">
              <p>Or send directly:</p>
              <button 
                type="button" 
                onClick={() => openWhatsApp(`Hi Tarun! I'm ${formData.name || 'interested in your work'}. ${formData.message || 'Would love to connect!'}`)}
                className="whatsapp-btn"
              >
                <span>📱</span> Send via WhatsApp
              </button>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'sending' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Map Preview */}
        <div className={`map-preview ${isVisible ? "animate-in" : ""}`}>
          <iframe
            title="Location Map"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448181.16374293776!2d76.81306771991275!3d28.647279935262464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1709900000000!5m2!1sen!2sin`}
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: "20px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <button onClick={openDirections} className="Map-overlay-btn">
            <span>🚀</span> Get Directions to Meet Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;