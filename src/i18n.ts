import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    interpolation: { escapeValue: false },
      ns: ["translation"], // 👈 seu ficheiro chama translation.json
    defaultNS: "translation", // react já faz escape
    
  });

export default i18n;
