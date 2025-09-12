import TripForm from "@/components/Trip/TripForm";
import TripList from "@/components/Trip/TripList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TripsProvider, useTrips } from "@/components/Trip/Context";

type Trip = {
  id: number;
  destination: string;
  description: string;
  date: string;
};

export default function Step1() {
  // const [trips, setTrips] = useState<Trip[]>([]);
  const { trips, setTrips } = useTrips();
  const deleteTrip = (tripId: number) => {
    // usar o state de trips (setTrips) e fazendo um filtro para excluir o tripId
    setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
  };

  const addTrip = (trip: Omit<Trip, "id">) => {
    const newTrip = { ...trip, id: Date.now() };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };
  // const fetchTrip = () => {
  //   axios
  //     .get<Trip[]>("http://localhost:8080/trips")
  //     .then((response) => setTrips(response.data));
  // };

  return (
    <>
      <TripForm onAdd={addTrip} onSubmit={() => {}} />
      <TripList trips={trips} onRemove={deleteTrip} />
    </>
  );
}
