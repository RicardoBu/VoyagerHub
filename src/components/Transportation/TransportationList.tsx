import { useRouter } from "next/navigation";
import React from "react";
import { useCurrency } from "../Currency/Context";

import { Transportation } from "../../types/transportation";

import { TransportationListProps } from "../../types/transportation";
import { useTranslation } from "react-i18next";

export default function TransportationList({
  transportation,
  onRemove,
}: TransportationListProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const currency = useCurrency();

  const handleEdit = (transportationId: number) => {
    router?.push(`/edits/editTransportation/${transportationId}`);
  };

  const handleDelete = async (transportationId: number) => {
    // await axios.delete(`http://localhost:8080/trips/${tripId}`);
    onRemove?.(transportationId);

    //
  };

  return (
    <div>
      <h2>{t("My Transportation")}</h2>
      <ul>
        {transportation.map((transportation) => (
          <li key={transportation.id}>
            {t("Flight")}:{transportation.flight} - Bus:{transportation.bus} -{" "}
            {t("Train")}:{transportation.train}
            {t("Price")}: {transportation.price} {currency}
            <button onClick={() => handleEdit(transportation.id!)}>
              {" "}
              ✏️ {t("Edit Transportation")}
            </button>
            <button onClick={() => handleDelete(transportation.id!)}>
              X {t("Delete Transportation")}
            </button>
          </li>
        ))}{" "}
      </ul>
    </div>
  );
}
