import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import { Quantity } from "@/types/quantity";
import { QuantityFormProps } from "@/types/quantity";
import { useTranslation } from "react-i18next";

const QuantityForm = ({ quantity, onAdd, onSubmit }: QuantityFormProps) => {
  const [quantities, setQuantities] = React.useState<Quantity>({
    prQuantity: "",
    bbQuantity: "",
    petsQuantity: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (quantity) {
      const { prQuantity, bbQuantity, petsQuantity } = quantity;
      setQuantities({ ...quantity });
    }
  }, [quantity]);

  const handleQuantity = async () => {
    if (quantity?.id && onSubmit) {
      // if there is quantity .id, it means we are editing
      onSubmit({ ...quantities, id: quantity.id });
    } else if (onAdd) {
      onAdd(quantities);
    }
  };

  const home = () => {
    router?.push(`/`);
  };
  const { t, i18n } = useTranslation();

  return (
    <>
      <div>
        <h2>{t("Quantities")}</h2>
        <p>
          <input
            type="number"
            placeholder="Number of people"
            value={quantities.prQuantity}
            required
            onChange={(e) => {
              setQuantities({
                ...quantities,
                prQuantity: e.target.value === "" ? "" : Number(e.target.value),
              });
            }}
          />
        </p>

        <p>
          <input
            type="number"
            placeholder="Number of babies"
            value={quantities.bbQuantity}
            required
            onChange={(e) => {
              setQuantities({
                ...quantities,
                bbQuantity: e.target.value === "" ? "" : Number(e.target.value),
              });
            }}
          />
        </p>
        <p>
          <input
            type="number"
            placeholder="Number of pets"
            value={quantities.petsQuantity}
            required
            onChange={(e) => {
              setQuantities({
                ...quantities,
                petsQuantity:
                  e.target.value === "" ? "" : Number(e.target.value),
              });
              //
            }}
          />
        </p>
      </div>

      <button onClick={home}>Homepage</button>
      <button onClick={handleQuantity}>Save</button>
    </>
  );
};

export default QuantityForm;
