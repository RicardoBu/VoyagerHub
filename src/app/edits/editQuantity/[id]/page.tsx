"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import TripForm from "@/components/Trip/TripForm";
import { TripsProvider, useTrips } from "@/components/Trip/Context";
import QuantityForm from "@/components/Quantity/QuantityForm";
import { QuantityProvider, useQuantities } from "@/components/Quantity/Context";

type Quantity = {
  id?: number;
  prQuantity?: number;
  bbQuantity?: number;
  petsQuantity?: number;
};

export default function EditQuantityPage() {
  return (
    <QuantityProvider>
      <EditQuantities />
    </QuantityProvider>
  );
}

function EditQuantities() {
  const { id } = useParams(); // dynamic id from route
  const { quantities, setQuantities } = useQuantities();
  const router = useRouter();

  // Find the quantity to edit by id (id from params is string, convert to number)
  const quantityToEdit = quantities.find(
    (quantity) => quantity.id === Number(id)
  );
  console.log(id);
  console.log(quantities);
  console.log(quantityToEdit);

  // Handler to update the trip in context state
  const handleUpdate = (updatedQuantity: Quantity) => {
    setQuantities(
      (prevQuantities) =>
        prevQuantities.map((quantity) =>
          quantity.id === updatedQuantity.id ? updatedQuantity : quantity
        )
      // map  returns a copy. If the id matches updatedTrip, return the updated trip, otherwise return the original trip
    );
  };

  // Handler to add a new trip if needed
  const addQuantity = (trip: Omit<Quantity, "id">) => {
    const newQuantity = { ...trip, id: Date.now() };
    setQuantities((prevTrips) => [...prevTrips, newQuantity]);
  };

  if (!quantityToEdit) {
    return <div>Trip not found or loading...</div>;
  }

  const stepper = () => {
    router?.push(`/stepper`);
  };

  return (
    <>
      <QuantityForm
        quantity={quantityToEdit}
        onSubmit={handleUpdate}
        onAdd={addQuantity}
      />
      <button onClick={stepper}>Stepper</button>
    </>
  );
}
