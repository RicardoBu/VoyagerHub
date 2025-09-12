"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Admin = () => {
  const router = useRouter();

  const stepper = () => {
    router?.push(`/stepper`);
  };

  const home = () => {
    router?.push(`/`);
  };
  return (
    <div>
      <h1>Your Account</h1>
      <button onClick={stepper}>Book a trip</button>
      <button onClick={home}>Home</button>
      <button onClick={home}>Logout</button>
    </div>
  );
};

export default Admin;
