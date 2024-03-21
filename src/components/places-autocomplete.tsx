import { Select } from "antd";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { TSelectedAddress } from "../ts/common";
import { FC } from "react";

type Props = {
  setSelectedAddress: (value: TSelectedAddress) => void;
};

const PlacesAutocomplete: FC<Props> = ({ setSelectedAddress }) => {
  const {
    setValue,
    suggestions: { data, loading },
  } = usePlacesAutocomplete({ debounce: 300 });

  const places = data.map((item) => ({
    value: item.description,
  }));

  const handleSelect = async (address: string) => {
    const [geoCode] = await getGeocode({ address });

    setSelectedAddress({
      address,
      location: getLatLng(geoCode), // {lat, lng}
    });
  };

  return (
    <Select
      placeholder="Enter the address you want to search"
      showSearch
      allowClear
      onSearch={setValue}
      loading={loading}
      options={places}
      onSelect={handleSelect}
    />
  );
};

export default PlacesAutocomplete;
