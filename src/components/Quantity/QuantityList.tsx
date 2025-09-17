import { useRouter } from "next/navigation";
import React from "react";
import { Quantity, QuantityListProps } from "@/types/quantity";
import { useTranslation } from "react-i18next";

const QuantityList = ({ quantities, onRemove }: QuantityListProps) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const handleEdit = (quantityId: number | undefined) => {
    router?.push(`/edits/editQuantity/${quantityId}`);
  };

  const handleDelete = (quantityId: number | undefined) => {
    // axios.delete(`http://localhost:8080/trips/${quantityId}`);
    onRemove?.(quantityId);
  };
  return (
    <div>
      <h2>{t("Quantities")}</h2>
      <ul>
        {quantities.map((quantity) => (
          <li key={quantity.id}>
            {quantity.prQuantity} {t("Person")} (s) - {quantity.bbQuantity}{" "}
            {t("Babies")} - {quantity.petsQuantity} {t("Pets")}
            <button onClick={() => handleEdit(quantity.id)}>
              ✏️ {t("Edit Quantity")}
            </button>
            <button onClick={() => handleDelete(quantity.id)}>
              X {t("Delete Quantity")}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuantityList;
