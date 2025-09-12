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
};

const TripsContext = createContext<{
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
}>({
  trips: [],
  setTrips: () => {},
});

export const TripsProvider = ({ children }: { children: ReactNode }) => {
  // Load trips from localStorage or start with empty array
  const savedTrips =
    typeof window !== "undefined" ? localStorage.getItem("trips") : null;
  // first checks if the app is running in a browser (typeof window !== "undefined")

  const initialTrips = savedTrips ? (JSON.parse(savedTrips) as Trip[]) : [];

  const [trips, setTrips] = useState<Trip[]>(initialTrips);

  // Save trips to localStorage whenever trips state changes
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  return (
    <TripsContext.Provider value={{ trips, setTrips }}>
      {children}
    </TripsContext.Provider>
  );
};

export const useTrips = () => useContext(TripsContext);
