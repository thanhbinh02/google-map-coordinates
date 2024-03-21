import {
  GoogleMap,
  InfoWindowF,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { FC, useState } from "react";
import { TSelectedAddress } from "../ts/common";
import PlacesAutocomplete from "./places-autocomplete";
import { getGeocode } from "use-places-autocomplete";
import { Button, Form, Space, message } from "antd";

type Props = {
  toggleOpenModal: () => void;
};

const PickAddress: FC<Props> = ({ toggleOpenModal }) => {
  const form = Form.useFormInstance();

  const [selectedAddress, setSelectedAddress] = useState<TSelectedAddress>();
  const [activeMarker, setActiveMarker] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  const handleDragEnd = async (e: google.maps.MapMouseEvent) => {
    const location = {
      lat: e.latLng!.lat(),
      lng: e.latLng!.lng(),
    };

    const results = await getGeocode({ location });

    setSelectedAddress({
      address: results[0].formatted_address,
      location,
    });
  };

  const handleUpdateLocation = () => {
    if (!selectedAddress) {
      void message.error("Please select a location");
      return;
    }

    const { address, location } = selectedAddress;
    const { lat, lng } = location!;

    form.setFieldsValue({
      address,
      coordinates: `${lat},${lng}`,
    });
    toggleOpenModal();
  };

  return (
    <div className="[&_.map-container]:h-[60vh] flex flex-col gap-2">
      <PlacesAutocomplete setSelectedAddress={setSelectedAddress} />

      <GoogleMap
        zoom={15}
        center={selectedAddress?.location || { lat: 43.45, lng: -80.49 }}
        mapContainerClassName="map-container"
      >
        {selectedAddress && (
          <Marker
            position={selectedAddress.location || { lat: 43.45, lng: -80.49 }}
            onClick={() => setActiveMarker(true)}
            draggable
            onDragEnd={handleDragEnd}
          >
            {activeMarker && (
              <InfoWindowF
                position={selectedAddress.location}
                onCloseClick={() => setActiveMarker(false)}
              >
                <>
                  <p>{selectedAddress.address}</p>
                  <p>
                    Coordinates: {selectedAddress.location?.lat},
                    {selectedAddress.location?.lng}
                  </p>
                </>
              </InfoWindowF>
            )}
          </Marker>
        )}
      </GoogleMap>
      <div className="flex justify-end">
        <Space>
          <Button onClick={toggleOpenModal}>Cancel</Button>
          <Button type="primary" onClick={handleUpdateLocation}>
            Update location
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default PickAddress;
