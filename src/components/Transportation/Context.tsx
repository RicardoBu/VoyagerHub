import React, {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";

type Transportation = {
  id?: number;
  flight: string;
  bus: string;
  train: string;
};

const TransportationContext = createContext<{
  transportation: Transportation[];
  setTransportation: React.Dispatch<React.SetStateAction<Transportation[]>>;
}>({
  transportation: [],
  setTransportation: () => {},
});

export const TransportationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const savedTransportation =
    typeof window !== "undefined"
      ? localStorage.getItem("transportation")
      : null;

  const initialTransportation = savedTransportation
    ? JSON.parse(savedTransportation)
    : [];
  const [transportation, setTransportation] = useState<Transportation[]>(
    initialTransportation
  );

  useEffect(() => {
    localStorage.setItem("transportation", JSON.stringify(transportation));
  }, [transportation]);

  return (
    <TransportationContext.Provider
      value={{ transportation, setTransportation }}
    >
      {children}
    </TransportationContext.Provider>
  );
};

export const useTransportation = () => useContext(TransportationContext);
