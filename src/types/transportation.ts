export type Transportation = {
  id?: number;
  flight: string;
  bus: string;
  train: string;
  activeField: string | null;
  filteredSuggestions: string[];
  price: number;
  prices: {
    flight?: number;
    bus?: number;
    train?: number;
  }; // this type was added so I could use prev.prices inside of setTransportations
};

export type TransportationFormProps = {
  transportation?: Transportation;
  onAdd?: (transportation: Omit<Transportation, "id">) => void;
  onSubmit?: (
    transportation: Omit<Transportation, "id"> & { id: number }
  ) => void;
};

export type TransportationListProps = {
  transportation: Transportation[];
  // currency: string;
  onRemove?: (transportationId: number) => void;
};