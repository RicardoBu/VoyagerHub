import { useRouter } from "next/navigation";
import { useCurrency } from "../Currency/Context";

import { TripData } from "@/types/trips";

import { TripListProps } from "@/types/trips";
import { useTranslation } from "react-i18next";

export default function TripList({ trips, onRemove }: TripListProps) {
  const router = useRouter();
  const currency = useCurrency();
  const { t, i18n } = useTranslation();

  const handleEdit = (tripId: number) => {
    router?.push(`/edits/editTrip/${tripId}`);
  };

  const handleDelete = async (tripId: number) => {
    onRemove?.(tripId);
  };

  console.log(trips);

  return (
    <div>
      <h2>{t("My Trips")}</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            {trip.destination} - {trip.date} - {t("Price")}:{trip.price}{" "}
            {currency}
            <button onClick={() => handleEdit(trip.id)}>
              ✏️ {t("Edit Trip")}
            </button>
            <button onClick={() => handleDelete(trip.id)}>
              X {t("Delete Trip")}
            </button>
          </li>
        ))}{" "}
      </ul>
    </div>
  );
}
