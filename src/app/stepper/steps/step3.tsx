import {
  TransportationProvider,
  useTransportation,
} from "@/components/Transportation/Context";
import TransportationForm from "@/components/Transportation/TransportationForm";
import TransportationList from "@/components/Transportation/TransportationList";
import { useAll } from "@/components/Trip/AllContext";

import React, { useState } from "react";

import { Transportation } from "@/types/transportation";

export default function Step3() {
  const { transportation, setTransportation } = useAll();

  const deleteTransportation = (transportationId: number) => {
    setTransportation((prevTransportation) =>
      prevTransportation.filter(
        (transportation) => transportation.id !== transportationId
      )
    );
  };

  const addTransportation = (transportation: Omit<Transportation, "id">) => {
    const newTransportation = { ...transportation, id: Date.now() };
    setTransportation((prevTransportation) => [
      ...prevTransportation,
      newTransportation,
    ]);
  };

  return (
    <>
      <TransportationForm onAdd={addTransportation} onSubmit={() => {}} />
      <TransportationList
        transportation={transportation}
        onRemove={deleteTransportation}
      />
    </>
  );
}
