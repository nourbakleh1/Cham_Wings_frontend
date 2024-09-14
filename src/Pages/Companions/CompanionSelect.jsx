import React, { useEffect, useState } from "react";
import { privateRequest } from "../../lib/privateRequest.js";

const CompanionSelect = ({ onChange, value, selectedCompanions }) => {
  const [passenger, setPassenger] = useState(null);
  const [companions, setCompanions] = useState([]);
  const [selectedCompanion, setSelectedCompanion] = useState(value || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanions = async () => {
      try {
        const response = await privateRequest.get(
          "/api/passenger_companions_details"
        );

        if (response.data.success) {
          setPassenger(response.data.data.passenger);
          setCompanions(response.data.data.companions || []);
        } else {
          setError("Failed to load companions");
        }
      } catch (error) {
        setError(
          `An error occurred while fetching companions: ${error.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanions();
  }, []);

  const handleSelectChange = (e) => {
    const selectedId = parseInt(e.target.value); // Ensure the value is an integer
    const selected =
      companions.find((c) => c.companion_id === selectedId) || passenger;
    setSelectedCompanion(selected);
    onChange(selected); // Pass selected companion data to parent
  };

  if (loading) return <div className="text-center">Loading companions...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  const hasData = passenger || companions.length > 0;

  // Filter companions to remove already selected ones
  const filteredCompanions = companions.filter(
    (companion) =>
      !selectedCompanions.includes(companion.companion_id) ||
      companion.companion_id === selectedCompanion?.companion_id
  );

  return (
    <div className="w-full mx-auto sm:my-2 md:my-6 p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <label
        htmlFor="companion-select"
        className="block text-lg font-semibold text-gray-700 mb-3"
      >
        Select Companion
      </label>
      <select
        id="companion-select"
        value={selectedCompanion?.companion_id || ""}
        onChange={handleSelectChange}
        className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
      >
        <option value="" disabled>Select a companion</option>

        {filteredCompanions.map((companion) => (
          <option
            key={`companion-${companion?.companion_id}`}
            value={companion.companion_id}
          >
            {companion.travel_requirement.first_name}{" "}
            {companion.travel_requirement.last_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompanionSelect;
