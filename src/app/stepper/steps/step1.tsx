import TripForm from "@/components/Trip/TripForm";
import TripList from "@/components/Trip/TripList";
import React, { useEffect, useState } from "react";

import { useAll } from "@/components/Trip/AllContext";
import { TripData } from "@/types/trips";

export default function Step1() {
  const { trips, setTrips } = useAll();
  console.log(trips);

  const deleteTrip = (tripId: number) => {
    // usar o state de trips (setTrips) e fazendo um filtro para excluir o tripId
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
  };

  const addTrip = (trip: Omit<TripData, "id">) => {
    const newTrip = { ...trip, id: Date.now() };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  return (
    <>
      <TripForm onAdd={addTrip} onSubmit={() => {}} />
      <TripList trips={trips} onRemove={deleteTrip} />
    </>
  );
}
