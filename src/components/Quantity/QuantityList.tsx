import { useRouter } from "next/navigation";
import React from "react";

type Quantity = {
  id?: number;
  prQuantity?: number;
  bbQuantity?: number;
  petsQuantity?: number;
};

type QuantityListProps = {
  quantities: Quantity[];
  onRemove?: (quantityId: number | undefined) => void;
};

const QuantityList = ({ quantities, onRemove }: QuantityListProps) => {
  const router = useRouter();

  const handleEdit = (quantityId: number | undefined) => {
    router?.push(`/edits/editQuantity/${quantityId}`);
  };

  const handleDelete = (quantityId: number | undefined) => {
    // axios.delete(`http://localhost:8080/trips/${quantityId}`);
    onRemove?.(quantityId);
  };
  return (
    <div>
      <h2>Quantities</h2>
      <ul>
        {quantities.map((quantity) => (
          <li key={quantity.id}>
            {quantity.prQuantity} Person(s) - {quantity.bbQuantity} Babies -{" "}
            {quantity.petsQuantity} Pets
            <button onClick={() => handleEdit(quantity.id)}>
              ✏️ Edit Quantity
            </button>
            <button onClick={() => handleDelete(quantity.id)}>
              X Delete Quantity
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuantityList;
