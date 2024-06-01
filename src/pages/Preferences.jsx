import React, { useState, useEffect } from "react";
import apiFetch from "../api/fetch";

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    likedCreators: false,
    cuisinePreferences: [],
    timeCommitment: [],
    mealTime: [],
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await apiFetch("/users/preferences");
        console.log("Fetched preferences:", response.preferences);
        setPreferences(response.preferences);
      } catch (error) {
        console.error("Failed to fetch preferences:", error);
      }
    };
    fetchPreferences();
  }, []);

  const handleSingleCheckboxChange = (category) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [category]: !prevPreferences[category],
    }));
  };

  const handleMultiCheckboxChange = (category, value) => {
    setPreferences((prevPreferences) => {
      const updatedCategory = prevPreferences[category].includes(value)
        ? prevPreferences[category].filter((item) => item !== value)
        : [...prevPreferences[category], value];
      return {
        ...prevPreferences,
        [category]: updatedCategory,
      };
    });
  };

  const savePreferences = async () => {
    try {
      console.log("Saving preferences:", preferences);
      await apiFetch("/users/preferences", {
        method: "PUT",
        body: JSON.stringify(preferences),
      });
      alert("Preferences saved successfully");
    } catch (error) {
      console.error("Failed to save preferences:", error);
      alert("Failed to save preferences");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Preferences</h1>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Get more recipes from liked creators?
        </label>
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={preferences.likedCreators}
              onChange={() => handleSingleCheckboxChange("likedCreators")}
            />
            <span className="ml-2">Yes</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Cuisine Preferences
        </label>
        <div className="flex flex-col space-y-2">
          {["Chinese", "Italian", "American", "Indian"].map((cuisine) => (
            <label key={cuisine} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={preferences.cuisinePreferences.includes(cuisine)}
                onChange={() =>
                  handleMultiCheckboxChange("cuisinePreferences", cuisine)
                }
              />
              <span className="ml-2">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">
          Time Commitment
        </label>
        <div className="flex flex-col space-y-2">
          {[
            "Quick Snack <15 mins.",
            "Small Meal 15 - 60 mins.",
            "Feast 60 - 120 mins.",
            "Long Haul 120+ mins.",
          ].map((time) => (
            <label key={time} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={preferences.timeCommitment.includes(time)}
                onChange={() =>
                  handleMultiCheckboxChange("timeCommitment", time)
                }
              />
              <span className="ml-2">{time}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Meal Time</label>
        <div className="flex flex-col space-y-2">
          {["Breakfast", "Lunch", "Dinner", "Dessert"].map((meal) => (
            <label key={meal} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={preferences.mealTime.includes(meal)}
                onChange={() => handleMultiCheckboxChange("mealTime", meal)}
              />
              <span className="ml-2">{meal}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={savePreferences}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default Preferences;
