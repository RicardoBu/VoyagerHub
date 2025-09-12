import { useRouter } from "next/navigation";
import React from "react";
import { useCurrency } from "../Currency/Context";

type Transportation = {
  id?: number;
  flight: string;
  bus: string;
  train: string;
  price?: number;
};

type TransportationListProps = {
  transportation: Transportation[];
  // currency: string;
  onRemove?: (transportationId: number) => void;
};

export default function TransportationList({
  transportation,
  onRemove,
}: TransportationListProps) {
  const router = useRouter();

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
      <h2>My Transportation</h2>
      <ul>
        {transportation.map((transportation) => (
          <li key={transportation.id}>
            Flight:{transportation.flight} - Bus:{transportation.bus} - Train:
            {transportation.train}
            Price: {transportation.price} {currency}
            <button onClick={() => handleEdit(transportation.id!)}>
              {" "}
              ✏️ Edit Transportation
            </button>
            <button onClick={() => handleDelete(transportation.id!)}>
              X Delete Transportation
            </button>
          </li>
        ))}{" "}
      </ul>
    </div>
  );
}
