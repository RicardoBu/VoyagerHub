"use client";

import { useTranslation } from "react-i18next";
import "./styles.css"; // importa para todas as páginas
import "@/i18n";
import { useState } from "react";
import React from "react";
import { CurrencyContext } from "@/components/Currency/Context";

type LayoutProps = {
  children: React.ReactElement<{ currency: string }>;
};

export default function RootLayout({ children }: LayoutProps) {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
  ];

  const currencies = [
    { code: "USD", label: "US Dollar" },
    { code: "EUR", label: "Euro" },
    { code: "GBP", label: "British Pound" },
  ];

  const [currency, setCurrency] = useState("USD");

  const changeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
  };
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
  };

  return (
    <html lang={i18n.language}>
      <header style={{ padding: "10px" }}>
        <select onChange={changeLanguage}>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>
        <select onChange={changeCurrency} value={currency}>
          {currencies.map((c: any) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
      </header>

      <body>
        {/* {" "}
        {React.cloneElement(children, { currency })} */}
        <CurrencyContext.Provider value={currency}>
          {children}
        </CurrencyContext.Provider>
      </body>
    </html>
  );
}
