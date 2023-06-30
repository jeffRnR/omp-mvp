import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

type MapProps = {
  businesses: Business[];
};

type Business = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

const Map: React.FC<MapProps> = ({ businesses }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the map container

  useEffect(() => {
    // Load the Google Maps API script dynamically
    const loadGoogleMapsScript = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyBihvdCndhU4MgiqRZeD39hq3b0pVYv5A4',
        version: 'weekly',
      });

      await loader.load();

      getCurrentPosition();
    };

    // Get the user's current position
    const getCurrentPosition = () => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          initMap(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current position:', error.message);
        }
      );
    };

    // Initialize the map and markers
    const initMap = (lat: number, lng: number) => {
      if (!mapContainerRef.current) return; // Null check for map container ref

      const mapOptions = {
        center: { lat, lng }, // Use the user's current position as the initial center coordinates
        zoom: 14, // Set the initial zoom level
      };

      const map = new google.maps.Map(mapContainerRef.current, mapOptions); // Use the ref value

      // Create a marker for the user's location
      const userMarker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Your Location',
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new google.maps.Size(40, 40),
        },
      });

      // Create markers for each business if the array is defined and not empty
      if (businesses && businesses.length > 0) {
        businesses.forEach((business) => {
          const marker = new google.maps.Marker({
            position: { lat: business.latitude, lng: business.longitude },
            map,
            title: business.name,
            icon: {
              url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
              scaledSize: new google.maps.Size(40, 40),
            },
          });
        });
      }
    };

    loadGoogleMapsScript();
  }, [businesses]);

  return (
    <div id="map" style={{ width: '100%', height: '600px' }} ref={mapContainerRef}></div>
  );
};

export default Map;
