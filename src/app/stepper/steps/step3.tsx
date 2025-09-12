import {
  TransportationProvider,
  useTransportation,
} from "@/components/Transportation/Context";
import TransportationForm from "@/components/Transportation/TransportationForm";
import TransportationList from "@/components/Transportation/TransportationList";

import React, { useState } from "react";

type Transportation = {
  id?: number;
  flight: string;
  bus: string;
  train: string;
};

export default function Step3() {
  const { transportation, setTransportation } = useTransportation();
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
