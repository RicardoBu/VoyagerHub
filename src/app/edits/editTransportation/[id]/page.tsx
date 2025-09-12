"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  TransportationProvider,
  useTransportation,
} from "@/components/Transportation/Context";
import TransportationForm from "@/components/Transportation/TransportationForm";

type Transportation = {
  id?: number;
  flight: string;
  bus: string;
  train: string;
};

export default function EditTransportationPage() {
  return (
    <TransportationProvider>
      <EditTransportation />
    </TransportationProvider>
  );
}

function EditTransportation() {
  const { id } = useParams(); // dynamic id from route
  const { transportation, setTransportation } = useTransportation();
  const router = useRouter();

  // Find the quantity to edit by id (id from params is string, convert to number)
  const transportationToEdit = transportation.find(
    (transportation) => transportation.id === Number(id)
  );
  console.log(id, "id");
  console.log(transportation, "transportation");
  console.log(transportationToEdit, "transportationToEdit");

  // Handler to update the trip in context state
  const handleUpdate = (updatedTransportation: Transportation) => {
    setTransportation(
      (prevTransportation) =>
        prevTransportation.map((transportation) =>
          transportation.id === updatedTransportation.id
            ? updatedTransportation
            : transportation
        )
      // map  returns a copy. If the id matches updatedTrip, return the updated trip, otherwise return the original trip
    );
  };

  // Handler to add a new trip if needed
  const addTransportation = (transportation: Omit<Transportation, "id">) => {
    const newTransportation = { ...transportation, id: Date.now() };
    setTransportation((prevTransportation) => [
      ...prevTransportation,
      newTransportation,
    ]);
  };

  if (!transportationToEdit) {
    return <div>Transportation not found or loading...</div>;
  }

  const stepper = () => {
    router?.push(`/stepper`);
  };

  return (
    <>
      <TransportationForm
        transportation={transportationToEdit}
        onSubmit={handleUpdate}
        onAdd={addTransportation}
      />
      <button onClick={stepper}>Stepper</button>
    </>
  );
}
