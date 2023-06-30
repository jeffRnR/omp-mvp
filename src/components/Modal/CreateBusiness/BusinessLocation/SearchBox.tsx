import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";

const libraries: Libraries = ["places"];

interface SearchBoxProps {
  onSelectAddress: (address: string, latitude: number, longitude: number) => void;
  defaultValue: string;
}

export default function SearchBox({ onSelectAddress, defaultValue }: SearchBoxProps) {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: "AIzaSyBihvdCndhU4MgiqRZeD39hq3b0pVYv5A4", 
    libraries,
  });
  const [searchValue, setSearchValue] = useState("");

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300, defaultValue });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSearchValue(e.target.value);
  };

  const handleSelect = async (address: string) => {
    setValue(address);
    setSearchValue(address);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      onSelectAddress(address, lat, lng);
    } catch (error) {
      console.log("Error geocoding", error);
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setSearchValue("Fetching current location...");

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBihvdCndhU4MgiqRZeD39hq3b0pVYv5A4`
            ); 
            const data = await response.json();
            const address = data.results[0].formatted_address;
            setSearchValue(address);
            onSelectAddress(address, latitude, longitude);
          } catch (error) {
            console.log("Error retrieving current location", error);
            setSearchValue("");
          }
        },
        (error) => {
          console.log("Error retrieving current location", error);
          setSearchValue("");
        }
      );
    }
  };

  const handlePlaceSelect = (description: string) => {
    setValue(description);
    setSearchValue(description);
    clearSuggestions();
  };

  const handleInputBlur = () => {
    if (!value) {
      setSearchValue("");
    }
  };

  return (
    <Flex>
      <Input
        value={searchValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        disabled={!ready}
        placeholder="Search your location"
        className="w-full p-2"
      />
      <Button onClick={handleCurrentLocation} disabled={!ready} fontSize={15} variant='outline' ml={2}>
        <Text fontSize='8pt' p={2} m={2} color='gray.500'>Use Current Location</Text>
        
      </Button>
      {status === "OK" && (
        <ul>
          {data.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handlePlaceSelect(suggestion.description)}
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </Flex>
  );
}
