import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

type Trip = {
  id: number;
  destination: string;
  description: string;
  date: string;
  price?: number;
};

type Transportation = {
  id?: number;
  flight: string;
  bus: string;
  train: string;
};

type Quantity = {
  id?: number;
  prQuantity?: number;
  bbQuantity?: number;
  petsQuantity?: number;
};

type AllContextType = {
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
  transportation: Transportation[];
  setTransportation: React.Dispatch<React.SetStateAction<Transportation[]>>;
  quantities: Quantity[];
  setQuantities: React.Dispatch<React.SetStateAction<Quantity[]>>;
};

const AllContext = createContext<AllContextType>({
  trips: [],
  setTrips: () => {},
  transportation: [],
  setTransportation: () => {},
  quantities: [],
  setQuantities: () => {},
});

export const AllProvider = ({ children }: { children: ReactNode }) => {
  // trips state with localStorage persistence
  const savedTrips =
    typeof window !== "undefined" ? localStorage.getItem("trips") : null;
  const [trips, setTrips] = useState<Trip[]>(
    savedTrips ? JSON.parse(savedTrips) : []
  );

  // transportation state with localStorage persistence

  const savedTransportation =
    typeof window !== "undefined"
      ? localStorage.getItem("transportation")
      : null;
  const [transportation, setTransportation] = useState<Transportation[]>(
    savedTransportation ? JSON.parse(savedTransportation) : []
  );

  // quantities state with localStorage persistence
  const savedQuantities =
    typeof window !== "undefined" ? localStorage.getItem("quantities") : null;
  const [quantities, setQuantities] = useState<Quantity[]>(
    savedQuantities ? JSON.parse(savedQuantities) : []
  );

  // currency
  const [currency, setCurrency] = useState("USD");

  // salvar em localStorage
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem("transportation", JSON.stringify(transportation));
  }, [transportation]);

  useEffect(() => {
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  return (
    <AllContext.Provider
      value={{
        trips,
        setTrips,
        transportation,
        setTransportation,
        quantities,
        setQuantities,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
export const useAll = () => useContext(AllContext);
