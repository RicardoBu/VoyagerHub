"use client";

import React, { useState } from "react";
import Currency from "@/app/sidebar/currency/page";

import PopularDestinations from "./destinations/page";
import Settings from "./settings/page";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import Language from "@/app/sidebar/language/page";

const SidebarPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  function toggle() {
    setIsVisible((prev) => !prev);
  }

  return (
    <>
      <button className="toggle-btn" onClick={toggle}>
        <DensityMediumIcon />
      </button>
      {isVisible && (
        <nav className="nav">
          <Currency />
          <Language />
          <PopularDestinations />
          <Settings />
        </nav>
      )}
    </>
  );
};

export default SidebarPage;
