import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { TripData } from "@/types/trips";

import { TripFormProps } from "@/types/trips";

export default function TripForm({ trip, onAdd, onSubmit }: TripFormProps) {
  const [tripData, setTripData] = useState<TripData>({
    destination: "",
    description: "",
    date: "",
    filteredSuggestions: [],
    price: 0,
  });

  const router = useRouter();

  var tripsList = [
    { id: 1, destination: "Lisboa", price: 100 },
    { id: 2, destination: "Porto", price: 80 },
    { id: 3, destination: "Madrid", price: 120 },
    { id: 4, destination: "Barcelona", price: 130 },
    { id: 5, destination: "Paris", price: 200 },
    { id: 6, destination: "Londres", price: 250 },
    { id: 7, destination: "Nova Iorque", price: 300 },
    { id: 8, destination: "Tóquio", price: 400 },
  ];

  const handleDestinationChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userInput = e.target.value;

    const filtered = tripsList.filter(
      (city) =>
        city.destination.toLowerCase().startsWith(userInput.toLowerCase()) // filters/compares the parameter city with userInput
    );

    setTripData((prev) => ({
      ...prev,
      destination: userInput,
      filteredSuggestions: filtered,
    }));
  };

  const handleSuggestionClick = (suggestion: {
    id: number;
    destination: string;
    price: number;
  }) => {
    setTripData((prev) => ({
      ...prev,
      ...suggestion,
      filteredSuggestions: [],
    }));
  };

  // The useEffect here is used for existing trips

  useEffect(() => {
    if (trip) {
      const { destination, description, date, price } = trip;
      setTripData({ ...trip, filteredSuggestions: [] });
    }
  }, [trip]);

  const handleClick = async () => {
    if (trip && onSubmit) {
      onSubmit({ ...tripData, id: trip.id! });
    } else if (onAdd) {
      onAdd(tripData);
    }
  };

  const home = () => {
    router?.push(`/`);
  };

  const { t, i18n } = useTranslation();

  return (
    <>
      <div>
        <h2>{trip ? t("Edit your trip") : t("New trip")}</h2>

        <p style={{ position: "relative" }}>
          <input
            value={tripData.destination}
            onChange={handleDestinationChange} // handleDestinationChange has the purpose of filtering results comparing the userinput wuth suggestedDestinations
            placeholder={t("Destination")}
          />
          {tripData.filteredSuggestions.length > 0 && (
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
              {tripData.filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.destination}
                </li>
              ))}
            </ul>
          )}
        </p>
        <p>
          <input
            value={tripData.description}
            onChange={(e) =>
              setTripData({ ...tripData, description: e.target.value })
            }
            placeholder={t("Description")}
          />
        </p>
        <p>
          <input
            type="date"
            value={tripData.date}
            onChange={(e) => setTripData({ ...tripData, date: e.target.value })}
          />
        </p>
      </div>

      <button onClick={home}>{t("Homepage")}</button>
      <button onClick={handleClick}>{trip ? t("Update") : t("Save")}</button>
    </>
  );
}
