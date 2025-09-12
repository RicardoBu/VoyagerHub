import { createContext, useContext } from "react";

export const CurrencyContext = createContext<string>("USD");

export const useCurrency = () => useContext(CurrencyContext);
