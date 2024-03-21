export type TSelectedAddress = Partial<{
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}>;
