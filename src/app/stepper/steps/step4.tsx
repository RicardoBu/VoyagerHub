import { useQuantities } from "@/components/Quantity/Context";
import QuantityList from "@/components/Quantity/QuantityList";
import { useTransportation } from "@/components/Transportation/Context";
import TransportationList from "@/components/Transportation/TransportationList";
import { useTrips } from "@/components/Trip/Context";
import TripList from "@/components/Trip/TripList";
import React, { useState } from "react";
import axios from "axios";
import { useCurrency } from "@/components/Currency/Context";
import { useAll } from "@/components/Trip/AllContext";

type Trip = {
  id: number;
  destination: string;
  description: string;
  date: string;
  prQuantity: number;
  bbQuantity: number;
  petsQuantity: number;
  flight: string;
  bus: string;
  train: string;
  price?: number;
};

export default function Step4() {
  // const { quantities, setQuantities } = useQuantities();
  // const { transportation, setTransportation } = useTransportation();
  // const { trips, setTrips } = useTrips();
  const {
    trips,
    setTrips,
    transportation,
    setTransportation,
    quantities,
    setQuantities,
  } = useAll();
  const [saveTrip, setSaveTrip] = useState<any[]>([]);

  const currency = useCurrency();

  const handleClick = async () => {
    const tripsWithAllData: Trip[] = (trips as Trip[]).map((t, i) => ({
      id: t.id,
      destination: t.destination, // I didn't understand quite well
      description: t.description,
      date: t.date,
      prQuantity: quantities[i]?.prQuantity ?? 0,
      bbQuantity: quantities[i]?.bbQuantity ?? 0,
      petsQuantity: quantities[i]?.petsQuantity ?? 0,
      flight: transportation[i]?.flight ?? "",
      bus: transportation[i]?.bus ?? "",
      train: transportation[i]?.train ?? "",
    }));

    const saveTrip = { trips: tripsWithAllData };

    const post = await axios.post("http://localhost:8080/trips", saveTrip, {
      headers: { "Content-Type": "application/json" },
    });

    const response = await axios.get("http://localhost:8080/trips");
    setSaveTrip(response.data as any);
    setTrips([]); // Clear trips after saving
    setQuantities([]); // Clear quantities after saving
    setTransportation([]); // Clear transportation after saving
  };

  const handleDelete = async (tripId: number) => {
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
  };

  const deleteQuantities = (quantityId: number | undefined) => {
    setQuantities((prevQuantities) =>
      prevQuantities.filter((quantity) => quantity.id !== quantityId)
    );
  };

  const deleteTransportation = (transportationId: number) => {
    setTransportation((prevTransportation) =>
      prevTransportation.filter(
        (transportation) => transportation.id !== transportationId
      )
    );
  };

  console.log(trips);
  console.log(quantities);
  console.log(transportation);

  return (
    <>
      <div>
        <h2>Review Your Selections</h2>

        <TripList trips={trips} onRemove={handleDelete} />

        <QuantityList quantities={quantities} onRemove={deleteQuantities} />
        <TransportationList
          transportation={transportation}
          // currency={currency}
          onRemove={deleteTransportation}
        />
        <button onClick={handleClick}>Save</button>
      </div>
      <div>
        <h3>Your saved trip</h3>
        <ul>
          {saveTrip.map((trip) => (
            <li key={trip.id}>
              <strong>{trip.destination}</strong> — {trip.date}(
              {trip.prQuantity} persons, {trip.bbQuantity} babies,{" "}
              {trip.petsQuantity} pets) | Transport: Flight:{trip.flight} Bus:
              {trip.bus} Train:{trip.train}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
