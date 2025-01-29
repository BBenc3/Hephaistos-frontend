import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";

const DeactivateProfile = () => {
  //Az adatbázisban történik meg a deaktiválás automatikusan az accasstoken alapján beazonosított felhasználó esetében. Jelen esetben szükségtelen több statet hozzáadni az erroron kívül
  //Ezen kívül ez a sor nincsen használva a kód többi részében sehol. 
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [error, setError] = useState(null);

  const handleDeactivate = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Nincs bejelentkezve a felhasználó.");
      }

      const response = await fetch("http://localhost:5001/api/users/me", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      const responseText = await response.text(); 

      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = { error: responseText };
      }

      if (!response.ok) {
        throw new Error(data.error || "Hiba történt a profil inaktiválása során.");
      }

      setIsDeactivated(true);
    } catch (err) {
      console.error("Hiba:", err.message);
      setError(err.message);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: "20px auto", padding: "16px" }}>
      <CardContent style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Profil Inaktiválása</h2>
        {isDeactivated ? (
          <Alert severity="success">A profilod sikeresen inaktiválva lett.</Alert>
        ) : (
          <>
            <p style={{ marginBottom: "16px" }}>Biztosan inaktiválni szeretnéd a profilod?</p>
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleDeactivate}
            >
              Profil Inaktiválása
            </Button>
          </>
        )}
        {error && (
          <Alert severity="error" style={{ marginTop: "16px" }}>
            {error}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default DeactivateProfile;
