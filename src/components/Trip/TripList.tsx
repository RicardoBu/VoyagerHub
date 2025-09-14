import { useRouter } from "next/navigation";
import { useCurrency } from "../Currency/Context";

import { Trip } from "@/types/trips";

import { TripListProps } from "@/types/trips";

export default function TripList({ trips, onRemove }: TripListProps) {
  const router = useRouter();
  const currency = useCurrency();

  const handleEdit = (tripId: number) => {
    router?.push(`/edits/editTrip/${tripId}`);
  };

  const handleDelete = async (tripId: number) => {
    onRemove?.(tripId);
  };

  console.log(trips);

  return (
    <div>
      <h2>My Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            {trip.destination} - {trip.description} - {trip.date} - Price:
            {trip.price} {currency}
            <button onClick={() => handleEdit(trip.id)}>✏️ Edit Trip</button>
            <button onClick={() => handleDelete(trip.id)}>X Delete Trip</button>
          </li>
        ))}{" "}
      </ul>
    </div>
  );
}
