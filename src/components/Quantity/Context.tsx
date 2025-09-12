import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Quantity = {
  id?: number;
  prQuantity?: number;
  bbQuantity?: number;
  petsQuantity?: number;
};

const QuantityContext = createContext<{
  quantities: Quantity[];
  setQuantities: React.Dispatch<React.SetStateAction<Quantity[]>>;
}>({
  quantities: [],
  setQuantities: () => {},
});

export const QuantityProvider = ({ children }: { children: ReactNode }) => {
  // Load quantities from localStorage or start with empty array
  const savedQuantities =
    typeof window !== "undefined" ? localStorage.getItem("quantities") : null;
  const initialQuantities = savedQuantities
    ? (JSON.parse(savedQuantities) as Quantity[])
    : [];

  const [quantities, setQuantities] = useState<Quantity[]>(initialQuantities);

  // Save quantities to localStorage whenever quantities state changes
  useEffect(() => {
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  return (
    <QuantityContext.Provider value={{ quantities, setQuantities }}>
      {children}
    </QuantityContext.Provider>
  );
};

export const useQuantities = () => useContext(QuantityContext);
