import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PropertyDetail from './components/PropertyDetail';
import ContactForm from './components/ContactForm';
import Logo from './components/Logo';
import Select from './components/Select';
import SelectTri from './components/SelectTri';
import Modal from 'react-modal';
import { moroccanCities } from './data/moroccanCities';
import { properties } from './data/properties';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import './styles/App.css';

Modal.setAppElement('#root');

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCardClick = () => {
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
          <div className="feature location">
            <FaMapMarkerAlt />
            <span>{property.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedSort, setSelectedSort] = useState('price-asc');
  const dropdownRef = useRef(null);

  // Options pour les villes
  const cityOptions = moroccanCities.map(city => ({
    value: city,
    label: city
  }));

  // Options de tri
  const sortOptions = [
    { value: 'price-asc', label: 'Prix : du moins cher au plus cher' },
    { value: 'price-desc', label: 'Prix : du plus cher au moins cher' },
    { value: 'date-asc', label: 'Date : du plus ancien au plus récent' },
    { value: 'date-desc', label: 'Date : du plus récent au plus ancien' },
  ];

  // Filtrer les propriétés
  const displayedProperties = properties
    .filter(property => {
      // Si aucune ville n'est sélectionnée, afficher toutes les propriétés
      if (!selectedCities || selectedCities.length === 0) return true;
      
      // Vérifier si la propriété est dans l'une des villes sélectionnées
      return selectedCities.some(city => 
        property.location.toLowerCase().includes(city.toLowerCase())
      );
    })
    .sort((a, b) => {
      // Trier les propriétés
      switch (selectedSort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        default:
          return 0;
      }
    });

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown) {
      dropdown.addEventListener('wheel', (event) => {
        event.stopPropagation();
        if (dropdown.scrollHeight > dropdown.clientHeight) {
          event.preventDefault();
          dropdown.scrollTop += event.deltaY;
        }
      });
    }

    return () => {
      if (dropdown) {
        dropdown.removeEventListener('wheel', (event) => {
          event.stopPropagation();
          if (dropdown.scrollHeight > dropdown.clientHeight) {
            event.preventDefault();
            dropdown.scrollTop += event.deltaY;
          }
        });
      }
    };
  }, []);

  return (
    <Router basename="/real-estate-agency">
      <div className="App" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <nav className="nav-container">
          <div className="nav-content">
            <Logo />
            <div className="search-container">
              <Select
                options={cityOptions}
                value={selectedCities}
                onChange={(value) => {
                  setSelectedCities(Array.isArray(value) ? value : [value]);
                  console.log('Villes sélectionnées:', value);
                }}
                placeholder="Choisir des villes"
                isCitySelect={true}
              />
              <SelectTri 
                options={sortOptions} 
                value={selectedSort} 
                onChange={setSelectedSort} 
              />
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="properties-grid">
              {displayedProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          } />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
