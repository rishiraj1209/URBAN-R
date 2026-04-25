import React, { useState } from "react";
import api from "../../../api/axios";

const RickshawForm = ({ onSuccess }) => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (!vehicleNumber.trim()) {
        setError("Please enter a vehicle number");
        return;
      }

      const res = await api.post("/api/rickshaw/create", {
        vehicleNumber,
      });
      onSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register vehicle");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-4">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded w-full flex gap-10">
        <input
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          className="outline-0 border w-full px-4 py-1 rounded"
          disabled={loading}
        />
        <button 
          className="bg-amber-500 text-white font-medium py-1 px-4 rounded active:scale-95 transition-all duration-300 disabled:opacity-50" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default RickshawForm;
