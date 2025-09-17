export type TripData = {
  id?: number;
  destination: string;
  date: string;
  filteredSuggestions: { id: number; destination: string; price: number }[];
  price: number;
};

export type TripFormProps = {
  trip?: Trip; // Trip a editar (opcional)
  onAdd?: (trip: Omit<TripData, "id">) => void; // usada ao criar nova
  onSubmit?: (trip: Omit<TripData, "id"> & { id: number }) => void; // usada ao editar existente
};

export type Trip = {
  id: number;
  destination: string;
  
  date: string;
  price: number;
};



export type TripListProps = {
  trips: Trip[];

  onRemove?: (tripId: number) => void;
};
