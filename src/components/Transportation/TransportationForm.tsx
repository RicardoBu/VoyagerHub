import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Transportation = {
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

type TransportationFormProps = {
  transportation?: Transportation;
  onAdd?: (transportation: Omit<Transportation, "id">) => void;
  onSubmit?: (
    transportation: Omit<Transportation, "id"> & { id: number }
  ) => void;
};

export default function TransportationForm({
  transportation,
  onAdd,
  onSubmit,
}: TransportationFormProps) {
  const [transportations, setTransportations] = useState<Transportation>({
    flight: "",
    bus: "",
    train: "",
    activeField: null,
    filteredSuggestions: [],
    price: 0,
    prices: { flight: 0, bus: 0, train: 0 }, // initialize prices as an empty object
  });
  const router = useRouter();

  const transportList = {
    flight: [
      { id: 1, company: "Ryanair", price: 50 },
      { id: 2, company: "EasyJet", price: 60 },
      { id: 3, company: "Transavia", price: 70 },
      { id: 4, company: "Air Europa", price: 90 },
      { id: 5, company: "Fly Emirates", price: 300 },
      { id: 6, company: "Qatar Airlines", price: 320 },
      { id: 7, company: "Air France", price: 150 },
      { id: 8, company: "Wizz Air", price: 55 },
      { id: 9, company: "None", price: 0 },
    ],
    bus: [
      { id: 1, company: "Flixbus", price: 20 },
      { id: 2, company: "Rede Expresso", price: 15 },
      { id: 3, company: "Stcp", price: 2 },
      { id: 4, company: "Carris", price: 2 },
      { id: 5, company: "None", price: 0 },
    ],
    train: [
      { id: 1, company: "CP", price: 25 },
      { id: 2, company: "Renfe", price: 30 },
      { id: 3, company: "TransSiberiano", price: 500 },
      { id: 4, company: "Alfa Pendular", price: 40 },
      { id: 5, company: "InterCidades", price: 35 },
      { id: 6, company: "None", price: 0 },
    ],
  };

  useEffect(() => {
    if (transportation) {
      const { flight, bus, train } = transportations;
      setTransportations({
        ...transportations,
        filteredSuggestions: [],
        activeField: null,
      });
    }
  }, [transportation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // i didn't understand well what this line does
    // name is the name of the input (flight, bus, train)
    // value is the value of the input (the text that the user types)
    const list = transportList[name as keyof typeof transportList];

    const filtered = list
      .filter((c) => c.company.toLowerCase().startsWith(value.toLowerCase()))
      .map((c) => c.company);

    setTransportations((prev) => ({
      ...prev,
      [name]: value,
      filteredSuggestions: filtered, // agora é string[]
      activeField: name,
    }));
  };

  const handleSuggestionClick = (
    suggestion: string,
    field: keyof typeof transportList // 'flight' | 'bus' | 'train'
  ) => {
    const list = transportList[field];
    const item = list.find((c) => c.company === suggestion); // compares suggestion with c.company

    setTransportations((prev) => {
      // cria um objeto com os preços de cada campo
      const newPrices = {
        ...prev.prices, // preços antigos
        [field]: item ? item.price : 0, // atualiza só o campo clicado
      };
      const totalPrice = Object.values(newPrices).reduce((a, b) => a + b, 0);

      return {
        ...prev,
        [field]: suggestion,
        activeField: null,
        filteredSuggestions: [],
        prices: newPrices, // atualiza o estado prices
        price: totalPrice,
      };
    });
  };

  const handleSubmit = () => {
    if (transportation && onSubmit)
      onSubmit({ ...transportations, id: transportation.id! });
    else if (onAdd) {
      onAdd(transportations);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <h2>Transportation</h2>
      {(["flight", "bus", "train"] as const).map((field) => (
        <div key={field} style={{ position: "relative", marginBottom: "16px" }}>
          <input
            name={field}
            type="text"
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={transportations?.[field]}
            onChange={handleChange}
          />
          {transportations?.activeField === field &&
            transportations.filteredSuggestions.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  border: "1px solid #ccc",
                  background: "white",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  maxHeight: "150px",
                  overflowY: "auto",
                  zIndex: 10,
                }}
              >
                {transportations.filteredSuggestions.map((s, i) => (
                  <li
                    key={i}
                    style={{ padding: "8px", cursor: "pointer" }}
                    onClick={() => handleSuggestionClick(s, field)}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
        </div>
      ))}

      <button onClick={() => router.push("/")}>Homepage</button>
      <button onClick={handleSubmit}>
        {transportation ? "Update" : "Save"}
      </button>
    </div>
  );
}
