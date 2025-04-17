import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  FaDumbbell, 
  FaSwimmer, 
  FaFilm, 
  FaTheaterMasks, 
  FaMusic, 
  FaUtensils,
  FaGraduationCap,
  FaCar,
  FaPlane,
  FaArrowRight
} from 'react-icons/fa';
import './AirbnbStyleMap.scss';

// Fix for Leaflet default icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Componente per centrare la mappa su un determinato marker
function SetViewOnSelect({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (coords) {
      map.setView(coords, 15, {
        animate: true,
        duration: 0.5
      });
    }
  }, [coords, map]);
  
  return null;
}

// Definizione dei tipi
interface Service {
  id: string;
  name: string;
  type: string; // 'gym', 'pool', 'theater', 'museum', 'concert', 'restaurant', 'course', 'car', 'travel'
  position: [number, number]; // Latitudine, Longitudine
  price: string;
  rating: number;
  distance?: string; // Proprietà opzionale
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  active: boolean;
}

interface AirbnbStyleMapProps {
  services: Service[];
  userPosition: [number, number];
}

const AirbnbStyleMap: React.FC<AirbnbStyleMapProps> = ({ services, userPosition }) => {
  // Definizione delle categorie di servizi
  const [categories, setCategories] = useState<ServiceCategory[]>([
    { id: 'gym', name: 'Palestre', icon: <FaDumbbell />, active: false },
    { id: 'pool', name: 'Piscine', icon: <FaSwimmer />, active: false },
    { id: 'theater', name: 'Teatri', icon: <FaTheaterMasks />, active: false },
    { id: 'cinema', name: 'Cinema', icon: <FaFilm />, active: false },
    { id: 'concert', name: 'Concerti', icon: <FaMusic />, active: false },
    { id: 'restaurant', name: 'Ristoranti', icon: <FaUtensils />, active: false },
    { id: 'course', name: 'Corsi', icon: <FaGraduationCap />, active: false },
    { id: 'car', name: 'Auto', icon: <FaCar />, active: false },
    { id: 'travel', name: 'Viaggi', icon: <FaPlane />, active: false },
  ]);

  // Selected service state
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(null);
  const [detailPopup, setDetailPopup] = useState<Service | null>(null);

  // Gestione del filtro per categoria
  const handleCategoryClick = (categoryId: string) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, active: !cat.active };
      }
      return cat;
    });
    
    setCategories(updatedCategories);
    
    const activeCategories = updatedCategories.filter(cat => cat.active).map(cat => cat.id);
    
    if (activeCategories.length === 0) {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => activeCategories.includes(service.type)));
    }
  };

  // Gestione del click sul marker
  const handleMarkerClick = (serviceId: string) => {
    setSelectedService(serviceId);
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setSelectedCoords(service.position);
    }
  };

  // Gestione dettagli servizio
  const handleViewDetails = (service: Service) => {
    setDetailPopup(service);
  };

  // Chiudi modale dettagli
  const closeDetailPopup = () => {
    setDetailPopup(null);
  };

  // Fix per le icone di Leaflet
  const markerIcon = new L.Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="airbnb-map-container">
      {/* Categorie di servizi */}
      <div className="service-categories">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className={`category-item ${category.active ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="category-icon">{category.icon}</div>
            <span className="category-name">{category.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Mappa */}
      <div className="map-wrapper">
        <MapContainer
          center={userPosition}
          zoom={13}
          style={{ height: '100%', width: '100%', borderRadius: '16px' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <SetViewOnSelect coords={selectedCoords} />
          
          {/* Marker posizione utente */}
          <Marker 
            position={userPosition} 
            icon={new L.DivIcon({
              className: 'user-location-marker',
              html: '<div class="pulse"></div>',
              iconSize: [20, 20],
            })}
          >
            <Popup>La tua posizione</Popup>
          </Marker>
          
          {/* Marker servizi */}
          {filteredServices.map((service) => (
            <Marker
              key={service.id}
              position={service.position}
              icon={new L.DivIcon({
                className: `service-marker service-marker--${service.type} ${selectedService === service.id ? 'active' : ''}`,
                html: `<div class="marker-content">${service.price}</div>`,
                iconSize: [60, 30],
              })}
              eventHandlers={{
                click: () => handleMarkerClick(service.id),
              }}
            >
              <Popup className="service-popup">
                <div className="service-popup-content">
                  <h3>{service.name}</h3>
                  <div className="service-rating">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className={i < service.rating ? 'star-filled' : 'star-empty'}>★</span>
                    ))}
                    <span className="rating-value">{service.rating}</span>
                  </div>
                  <div className="service-price">{service.price}</div>
                  <button 
                    className="view-details-btn"
                    onClick={() => handleViewDetails(service)}
                  >
                    Vedi dettagli
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Indicatore risultati */}
      <div className="results-indicator">
        Mostra {filteredServices.length} servizi in abbonamento disponibili
      </div>

      {/* Popup dettagli servizio */}
      <AnimatePresence>
        {detailPopup && (
          <motion.div 
            className="service-detail-modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="modal-content">
              <button className="modal-close" onClick={closeDetailPopup}>×</button>
              <div className="service-detail-header">
                <h2>{detailPopup.name}</h2>
                <div className="service-type">
                  {detailPopup.type === 'gym' && <FaDumbbell />}
                  {detailPopup.type === 'pool' && <FaSwimmer />}
                  {detailPopup.type === 'theater' && <FaTheaterMasks />}
                  {detailPopup.type === 'cinema' && <FaFilm />}
                  {detailPopup.type === 'concert' && <FaMusic />}
                  {detailPopup.type === 'restaurant' && <FaUtensils />}
                  {detailPopup.type === 'course' && <FaGraduationCap />}
                  {detailPopup.type === 'car' && <FaCar />}
                  {detailPopup.type === 'travel' && <FaPlane />}
                  <span>{categories.find(c => c.id === detailPopup.type)?.name || detailPopup.type}</span>
                </div>
              </div>
              
              <div className="service-detail-info">
                <div className="info-row">
                  <span className="info-label">Prezzo:</span>
                  <span className="info-value price">{detailPopup.price}</span>
                </div>
                {detailPopup.distance && (
                  <div className="info-row">
                    <span className="info-label">Distanza:</span>
                    <span className="info-value">{detailPopup.distance}</span>
                  </div>
                )}
                <div className="info-row">
                  <span className="info-label">Valutazione:</span>
                  <span className="info-value">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className={i < detailPopup.rating ? 'star-filled' : 'star-empty'}>★</span>
                    ))}
                    <span className="rating-number">{detailPopup.rating}</span>
                  </span>
                </div>
              </div>
              
              <div className="service-detail-description">
                <h3>Descrizione</h3>
                <p>
                  {detailPopup.type === 'gym' && 'Abbonamento mensile completo con accesso a tutte le attrezzature e corsi fitness disponibili. Include spogliatoi, docce e supporto di trainer professionisti.'}
                  {detailPopup.type === 'pool' && 'Abbonamento per accesso alla piscina con corsie e area relax. Include lezioni di nuoto di gruppo e accesso alle saune.'}
                  {detailPopup.type === 'theater' && 'Abbonamento stagionale teatro con accesso a tutti gli spettacoli della stagione. Include posto riservato e accesso prioritario.'}
                  {detailPopup.type === 'cinema' && 'Abbonamento mensile cinema con accesso illimitato a tutte le proiezioni. Include sconto su snack e bevande.'}
                  {detailPopup.type === 'concert' && 'Abbonamento stagionale per concerti ed eventi musicali. Include accesso prioritario e area riservata.'}
                  {detailPopup.type === 'restaurant' && 'Abbonamento mensile ristorante con menù fisso giornaliero e sconto su piatti extra.'}
                  {detailPopup.type === 'course' && 'Abbonamento per corsi di formazione con accesso a materiale didattico e certificato finale.'}
                  {detailPopup.type === 'car' && 'Abbonamento car sharing con minuti inclusi e km illimitati. Include assicurazione e parcheggi riservati.'}
                  {detailPopup.type === 'travel' && 'Abbonamento viaggi con sconti su hotel, voli e pacchetti vacanza.'}
                </p>
              </div>
              
              <button className="subscribe-button">
                <span>Abbonati ora</span>
                <FaArrowRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay per popup */}
      <AnimatePresence>
        {detailPopup && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDetailPopup}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AirbnbStyleMap; 