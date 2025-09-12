"use client";

import React from "react";

import LanguageIcon from "@mui/icons-material/Language";

import { useRouter } from "next/navigation";

const Language = () => {
  const router = useRouter();

  const language = () => {
    router.push("/sidebar/language/languagemanager");
  };
  return (
    <div className="currency">
      <button onClick={language}>
        <span>
          <LanguageIcon />
        </span>
      </button>
      <span>Language</span>
    </div>
  );
};

export default Language;
