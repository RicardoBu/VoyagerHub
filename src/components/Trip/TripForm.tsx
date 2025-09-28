import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { TripData } from "@/types/trips";

import { TripFormProps } from "@/types/trips";

export default function TripForm({ trip, onAdd, onSubmit }: TripFormProps) {
  const [tripData, setTripData] = useState<TripData>({
    destination: "",
    date: "",
    filteredSuggestions: [],
    price: 0,
  });

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const [showList, setShowList] = useState(false);
  // const [isActive, setIsActive] = useState(false);

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
    setShowList(true);
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
    setShowList(false);
  };

  // The useEffect here is used for existing trips

  useEffect(() => {
    if (trip) {
      const { destination, date, price } = trip;
      setTripData({ ...trip, filteredSuggestions: [] });
    }
  }, []);

  useEffect(() => {
    const pageClickEvent = (e: any) => {
      if (inputRef.current !== null && !inputRef.current.contains(e.target)) {
        setShowList(false);
      }
    };
    if (showList) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [showList]);

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

        <div
          style={{ marginBottom: "1rem" }}
          className="destination-autocomplete"
        >
          <input
            value={tripData.destination}
            onChange={handleDestinationChange} // handleDestinationChange has the purpose of filtering results comparing the userinput wuth suggestedDestinations
            placeholder={t("Destination")}
            required
            ref={inputRef}
          />
          {showList && tripData.filteredSuggestions.length > 0 && (
            <ul
              style={{
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
        </div>

        <div style={{ marginBottom: "1rem" }} className="date-input">
          <input
            type="date"
            value={tripData.date}
            onChange={(e) => setTripData({ ...tripData, date: e.target.value })}
            required
          />
        </div>
      </div>

      <button onClick={home}>{t("Homepage")}</button>
      <button onClick={handleClick}>{trip ? t("Update") : t("Save")}</button>
    </>
  );
}
