"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "@/i18n";

import SidebarPage from "@/app/sidebar/page";

export default function Home() {
  const router = useRouter();

  const stepper = () => {
    router?.push(`/stepper`);
  };

  const login = () => {
    router?.push(`/login`);
  };

  const { t, i18n } = useTranslation();

  return (
    <div className="layout">
      <nav className="sidebar">
        <SidebarPage />
      </nav>

      <main className="content">
        <div className="header">
          <h1>{t("VoyagerHub")}</h1>
          <button className="btn btn--ghost" onClick={login}>
            {t("Login")}
          </button>
        </div>

        <section className="hero">
          <button onClick={stepper}>{t("Book a trip")}</button>
        </section>
      </main>
    </div>
  );
}
