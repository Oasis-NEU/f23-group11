import React from "react";
import {supabase} from "./supabaseClient";

export default function AddRecipe({
  recipeName, 
  setRecipeName, 
  recipeIngredients,
  setRecipeIngredients,
  url,
  setUrl,
  picUrl,
  setPicUrl,
  category,
  setCategory
}) {
  return (
    <div className="input">
      <form
        onSubmit={(e) => {
          e.preventDefault(); // stop submit from reloading the page
        }}
      >
        <label htmlFor="recipe-name">
            Recipe Name:
        </label>
        <input
        id="recipe-name"
        type="text"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
        required
        />

        <label htmlFor="recipe-ingredients">
            Recipe Ingredients: 
        </label>
        <textarea
        id="recipe-ingredients"
        type="textarea"
        value={recipeIngredients.join("\n")}
        onChange={(e) => setRecipeIngredients(e.target.value.split("\n"))}
        required
        />
    
        <label htmlFor="recipe-photo">Photo URL: </label>
        <input
          id="recipe-photo"
          type="url"
          value={picUrl}
          required
          onChange={(e) => setPicUrl(e.target.value)}
        />

        <label htmlFor="recipe-link">URL to recipe: </label>
        <input
          id="recipe-link"
          type="url"
          value={url}
          required
          onChange={(e) => setUrl(e.target.value)}
        />

        <label htmlFor="recipe-category">
            Category:
        </label>
        <input
        id="recipe-category"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        />

      <button type="submit" onClick={() => {
          console.log("type: ", typeof recipeIngredients)
          console.log("here: ", recipeName, recipeIngredients, url, picUrl, category);
          addARecipe(recipeName, recipeIngredients, url, picUrl, category);
        }}>Add Recipe</button>  
      </form>
    </div>
  );
}

async function addARecipe(recipeName, recipeIngredients, url, picUrl, category) {
  try {
    const { data, error } = await supabase 
      .from("Recipes") 
      .insert({ 
        ingredients: recipeIngredients,
        recipe_name: recipeName,
        recipe_url: url,
        image_url: picUrl,
        dessert_category: category }) 
      .single();
    if (error) throw error; 
    window.location.reload(); 
  } catch (error) {
    console.log("Error: ", error);
     alert(error); 
  }
}