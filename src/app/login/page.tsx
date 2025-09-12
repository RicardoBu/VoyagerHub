"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    const response = await axios.post("http://localhost:8080/auth/login", {
      username,
      password,
    });
    if (response.status === 200) {
      router.push("/admin"); // ✅ redireciona para /admin
    } else {
      alert("Credenciais erradas!");
    }
    alert(response.data);
  }

  async function handleLogout() {
    try {
      const response = await axios.post("http://localhost:8080/auth/logout");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const home = () => {
    router?.push(`/`);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name=""
        id=""
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={home}>Home</button>
    </div>
  );
};

export default Login;
