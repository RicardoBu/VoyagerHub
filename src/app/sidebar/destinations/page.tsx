import React from "react";
import LuggageIcon from "@mui/icons-material/Luggage";
import { useRouter } from "next/navigation";

const PopularDestinations = () => {
  const router = useRouter();

  const destination = () => {
    router.push("/sidebar/destinations/manager");
  };
  return (
    <div>
      <button onClick={destination}>
        <span>
          <LuggageIcon />
        </span>
      </button>

      <span>PopularDestinations</span>
    </div>
  );
};

export default PopularDestinations;
