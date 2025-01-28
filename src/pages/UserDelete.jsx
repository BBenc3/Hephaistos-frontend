import React, { useState } from "react";

function FelhasznaloTorles() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/felhasznalo/torles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Felhasználó (${userId}) sikeresen törölve.`);
        setUserId("");
      } else {
        setMessage(`Hiba történt: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Hálózati hiba: ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">Felhasználó törlése</h1>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label htmlFor="userId" className="block font-medium text-gray-700">
            Felhasználó ID:
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Törlés
        </button>
      </form>
      {message && (
        <div className="mt-4 p-2 bg-gray-100 rounded-md text-gray-700">
          {message}
        </div>
      )}
    </div>
  );
}

export default FelhasznaloTorles;