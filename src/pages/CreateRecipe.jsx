import React, { useState } from "react";
import apiFetch from "../api/fetch";

const CreateRecipe = () => {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [timeToMake, setTimeToMake] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("cuisine", cuisine);
    formData.append("ingredients", ingredients);
    formData.append("description", description);
    formData.append("timeToMake", timeToMake);
    if (image) {
      formData.append("image", image);
    }

    try {
      await apiFetch("/recipes/create", {
        method: "POST",
        body: formData,
      });
      setMessage("Recipe created successfully!");
      setName("");
      setCuisine("");
      setIngredients("");
      setDescription("");
      setTimeToMake("");
      setImage(null);
    } catch (error) {
      setMessage("Error creating recipe: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Create Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="input-field">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="w-full p-2 border rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-yellow-500"
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="Cuisine"
            required
            className="w-full p-2 border rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-yellow-500"
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients (comma-separated)"
            required
            className="w-full p-2 border rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-yellow-500"
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="w-full p-2 border rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-yellow-500"
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            value={timeToMake}
            onChange={(e) => setTimeToMake(e.target.value)}
            placeholder="Time to Make"
            required
            className="w-full p-2 border rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-yellow-500"
          />
        </div>
        <div className="input-field">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-yellow-500"
          />
        </div>
        <button
          type="submit"
          className="btn w-full py-2 rounded bg-yellow-500 text-gray-900 hover:bg-yellow-400"
        >
          Create Recipe
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default CreateRecipe;
