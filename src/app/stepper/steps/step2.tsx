import { QuantityProvider, useQuantities } from "@/components/Quantity/Context";
import QuantityForm from "@/components/Quantity/QuantityForm";
import QuantityList from "@/components/Quantity/QuantityList";

import React, { useState } from "react";

type Quantity = {
  id?: number;
  prQuantity?: number;
  bbQuantity?: number;
  petsQuantity?: number;
};

export default function Step2() {
  const { quantities, setQuantities } = useQuantities();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Select the first quantity or create a default empty quantity object
  const quantity =
    selectedIndex !== null
      ? quantities[selectedIndex] // editar um existente
      : { prQuantity: 0, bbQuantity: 0, petsQuantity: 0 }; // criar novo

  const deleteQuantities = (quantityId: number | undefined) => {
    setQuantities((prevQuantities) =>
      prevQuantities.filter((quantity) => quantity.id !== quantityId)
    );
  };

  const addQuantities = (quantity: Omit<Quantity, "id">) => {
    const newQuantity = { ...quantity, id: Math.random() };
    console.log(newQuantity);
    setQuantities((prevQuantities) => [...prevQuantities, newQuantity]);
    setSelectedIndex(null);
  };

  return (
    <>
      <QuantityForm
        quantity={quantity}
        onAdd={addQuantities}
        onSubmit={() => {}}
      />
      <QuantityList quantities={quantities} onRemove={deleteQuantities} />
    </>
  );
}
