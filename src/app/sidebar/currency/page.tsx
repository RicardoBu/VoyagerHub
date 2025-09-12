"use client";

import React from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

import { useRouter } from "next/navigation";

const Currency = () => {
  const router = useRouter();

  const currency = () => {
    router.push("/sidebar/currency/currencymanager");
  };
  return (
    <div className="currency">
      <button onClick={currency}>
        <span>
          <CurrencyExchangeIcon />
        </span>
      </button>
      <span>Currency</span>
    </div>
  );
};

export default Currency;
