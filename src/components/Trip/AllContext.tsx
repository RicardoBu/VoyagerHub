import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import { Trip } from "@/types/trips";

import { Transportation } from "@/types/transportation";

import { Quantity } from "@/types/quantity";

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

  // salvar em localStorage
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, []);

  useEffect(() => {
    localStorage.setItem("transportation", JSON.stringify(transportation));
  }, []);

  useEffect(() => {
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, []);

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
