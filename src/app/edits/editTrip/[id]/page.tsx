"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TripForm from "@/components/Trip/TripForm";

import { useRouter } from "next/navigation";
import { Trip } from "@/types/trips";
import { AllProvider, useAll } from "@/components/Trip/AllContext";

export default function EditTripPage() {
  return (
    <AllProvider>
      <EditTrips />
    </AllProvider>
  );
}

function EditTrips() {
  const { id } = useParams(); // dynamic id from route

  const { trips, setTrips } = useAll();
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
