import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import Loader from "../Loader/Loader";

export default function RecipeDetail() {
  const { id } = useParams();
  let { userTokenAccess } = useContext(userContext);
  const [recipe, setRecipe] = useState(null);

  async function getRecipe() {
    let { data } = await api.get(`/community/recipes/${id}/`, {
      headers: {
        Authorization: `Bearer ${userTokenAccess}`,
      },
    });
    setRecipe(data);
  }

  useEffect(() => {
    getRecipe();
  }, [id]);

  if (!recipe) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-3xl mx-auto px-4 bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold text-green-900 mb-4">
          {recipe.title}
        </h1>
        <p className="text-gray-700 mb-6">{recipe.description}</p>

        <div className="mb-4">
          <p className="font-semibold text-gray-800">🧾 Ingredients:</p>
          <pre className="bg-gray-100 rounded-lg p-2 text-sm whitespace-pre-wrap">
            {recipe.ingredients}
          </pre>
        </div>

        <div>
          <p className="font-semibold text-gray-800">👨‍🍳 Instructions:</p>
          <p className="bg-gray-100 rounded-lg p-2 text-sm">
            {recipe.instructions}
          </p>
        </div>

        <Link
          to="/community"
          className="inline-block mt-6 text-emerald-700 hover:underline"
        >
          ← رجوع للقائمة
        </Link>
      </div>
    </div>
  );
}
