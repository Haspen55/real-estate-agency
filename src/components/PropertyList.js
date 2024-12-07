import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { properties } from '../data/properties';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import Map from './Map';
import './PropertyList.css';

const PropertyCard = ({ property, onLocationClick }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCardClick = (e) => {
    // Ne pas naviguer si on clique sur le bouton de carte
    if (e.target.closest('.location-button')) {
      return;
    }
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="property-card" onClick={handleCardClick}>
      <div className="property-image">
        <img src={property.image} alt={property.title} loading="lazy" />
      </div>
      <div className="property-details">
        <div className="property-header">
          <h3>{property.title}</h3>
          <p className="property-price">{formatPrice(property.price)}</p>
        </div>
        
        <p className="property-description">{property.description}</p>
        
        <div className="property-features">
          <div className="feature">
            <FaBed />
            <span>{property.bedrooms} chambres</span>
          </div>
          <div className="feature">
            <FaBath />
            <span>{property.bathrooms} SDB</span>
          </div>
          <div className="feature">
            <FaRulerCombined />
            <span>{property.surface} m²</span>
          </div>
        </div>

        <div className="property-tags">
          {property.features.map((feature, index) => (
            <span key={index} className="tag">{feature}</span>
          ))}
        </div>

        <div className="property-footer">
          <span className="property-location">
            <FaMapMarkerAlt /> {property.location}
          </span>
          <button
            className="location-button"
            onClick={(e) => {
              e.stopPropagation();
              onLocationClick(property);
            }}
          >
            Voir sur la carte
          </button>
        </div>
      </div>
    </div>
  );
};

const PropertyList = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleCloseMap = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="property-container">
      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onLocationClick={setSelectedProperty}
          />
        ))}
      </div>

      {selectedProperty && (
        <>
          <div className="map-overlay" onClick={handleCloseMap} />
          <div className="map-wrapper">
            <Map property={selectedProperty} onClose={handleCloseMap} />
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyList;
