"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TripForm from "@/components/Trip/TripForm";
import { TripsProvider, useTrips } from "@/components/Trip/Context";
import { useRouter } from "next/navigation";

type Trip = {
  id: number;
  destination: string;
  description: string;
  date: string;
};

export default function EditTripPage() {
  return (
    <TripsProvider>
      <EditTrips />
    </TripsProvider>
  );
}

function EditTrips() {
  const { id } = useParams(); // dynamic id from route
  const { trips, setTrips } = useTrips();
  const router = useRouter();

  // Find the trip to edit by id (id from params is string, convert to number)
  const tripToEdit = trips.find((trip) => trip.id === Number(id));

  // Handler to update the trip in context state
  const handleUpdate = (updatedTrip: Trip) => {
    setTrips(
      (prevTrips) =>
        prevTrips.map((trip) =>
          trip.id === updatedTrip.id ? updatedTrip : trip
        )
      // map  returns a copy. If the id matches updatedTrip, return the updated trip, otherwise return the original trip
    );
  };

  // Handler to add a new trip if needed
  const addTrip = (trip: Omit<Trip, "id">) => {
    const newTrip = { ...trip, id: Date.now() };
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  const stepper = () => {
    router?.push(`/stepper`);
  };

  if (!tripToEdit) {
    return <div>Trip not found or loading...</div>;
  }

  return (
    <>
      <TripForm trip={tripToEdit} onSubmit={handleUpdate} onAdd={addTrip} />
      <button onClick={stepper}>Stepper</button>
    </>
  );
}
