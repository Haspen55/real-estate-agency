import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaParking, FaCalendarAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { properties } from '../data/properties';
import Map from './Map';
import './PropertyDetail.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(false);

  const property = properties.find(p => p.id === parseInt(id));

  if (!property) {
    return <div className="not-found">Propriété non trouvée</div>;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="property-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="property-detail-header">
        <div className="header-content">
          <h1>{property.title}</h1>
          <p className="property-price">{formatPrice(property.price)}</p>
        </div>
        <p className="property-location">{property.location}</p>
      </div>

      <div className="property-gallery">
        <div className="main-image">
          {property.images ?
            property.images.map((img, index) => (
              <img key={index} src={img} alt={`${property.title} - Image ${index + 1}`} />
            )) :
            <img src={property.image} alt={property.title} />}
        </div>
        <div className="thumbnail-list">
          {/* Remove the thumbnail gallery since we only have one image */}
        </div>
      </div>

      <div className="property-content">
        <div className="property-main">
          <section className="property-overview">
            <h2>Caractéristiques principales</h2>
            <div className="features-grid">
              <div className="feature">
                <FaBed />
                <span>{property.bedrooms} chambres</span>
              </div>
              <div className="feature">
                <FaBath />
                <span>{property.bathrooms} salles de bain</span>
              </div>
              <div className="feature">
                <FaRulerCombined />
                <span>{property.surface} m²</span>
              </div>
              <div className="feature">
                <FaParking />
                <span>{property.parking} places de parking</span>
              </div>
              <div className="feature">
                <FaCalendarAlt />
                <span>Construit en {property.yearBuilt}</span>
              </div>
            </div>
          </section>

          <section className="property-description">
            <h2>Description</h2>
            <p>{property.fullDescription}</p>
          </section>

          <section className="property-amenities">
            <h2>Équipements</h2>
            <div className="amenities-container">
              <div className="amenities-column">
                <h3>Intérieur</h3>
                <ul>
                  {property.amenities?.interior?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="amenities-column">
                <h3>Extérieur</h3>
                <ul>
                  {property.amenities?.exterior?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="property-location">
            <h2>Localisation</h2>
            <button className="map-button" onClick={() => setShowMap(true)}>
              Voir sur la carte
            </button>
          </section>
        </div>

        <aside className="property-sidebar">
          <div className="agent-card">
            <img src={property?.agent?.photo} alt={property?.agent?.name} className="agent-photo" />
            <h3>{property?.agent?.name}</h3>
            <div className="agent-contacts">
              <a href={`tel:${property?.agent?.phone}`} className="contact-button">
                <FaPhoneAlt /> Appeler
              </a>
              <a href={`mailto:${property?.agent?.email}`} className="contact-button">
                <FaEnvelope /> Email
              </a>
            </div>
          </div>
        </aside>
      </div>

      {showMap && (
        <>
          <div className="map-overlay" onClick={() => setShowMap(false)} />
          <div className="map-wrapper">
            <Map property={property} onClose={() => setShowMap(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyDetail;
