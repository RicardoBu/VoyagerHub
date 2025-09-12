import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

const Settings = () => {
  const [dark, setDark] = useState(false);
  const [visible, setVisible] = useState(false); // controla se o menu de settings está aberto

  function toggleDarkMode() {
    setDark(!dark);
    document.body.classList.toggle("dark");
  }

  return (
    <div>
      {/* Ícone de settings */}
      <button onClick={() => setVisible(!visible)}>
        <SettingsIcon />
      </button>
      <span>Settings</span>

      {visible && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={toggleDarkMode}>
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
