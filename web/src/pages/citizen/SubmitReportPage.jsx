import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { createIssue } from '../../api/issueApi';

// A helper component to handle map clicks and user's current location
function LocationMarker({ position, setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  // Attempt to get user's current location on initial load
  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map, setPosition]);

  return position === null ? null : <Marker position={position}></Marker>;
}


const SubmitReportPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Pothole');
  const [position, setPosition] = useState(null); // For map marker
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!position) {
      setError('Please select a location on the map.');
      return;
    }
    setError('');
    setLoading(true);

    const issueData = {
      title,
      description,
      category,
      location: {
        type: 'Point',
        coordinates: [position.lng, position.lat], // [longitude, latitude]
      },
    };

    try {
      await createIssue(issueData);
      // On success, navigate back to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Report a New Civic Issue</h2>
      <form onSubmit={handleSubmit}>
        {/* Title, Description, Category fields */}
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Pothole">Pothole</option>
            <option value="Streetlight">Streetlight</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Map Container */}
        <div style={{ marginTop: '20px', height: '400px', width: '100%' }}>
          <label>Select Location:</label>
          <MapContainer center={[23.6693, 86.1511]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ marginTop: '20px' }}>
          {loading ? 'Submitting...' : 'Submit Issue'}
        </button>
      </form>
    </div>
  );
};

export default SubmitReportPage;