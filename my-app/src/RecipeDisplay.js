import React from "react";
import "./RecipeDisplay.css";

export default function RecipeDisplay({ recipes, showRecipes }) {
  return (
    <div>
      <p>Showing {recipes.length} recipes you can make!</p>
      <ul className="recipe-list">
        {recipes &&
          recipes.map((recipe) => {
            console.log(recipe.id, recipe.recipe_name, recipe.image_url);
            return (
              <li key={recipe.id} className="recipe-item">
                <div className="card" style={{ width: "400px", height: "400px" }}>
                <img
                    className="card-image"
                    src={recipe.image_url}
                    style={{height : '400px', width : '400px'}}
                    alt="Image can't load"
                    onError={(e) => {
                      console.error(e);
                    }}
                  />
                  <div className="card-category">{recipe.recipe_name}</div>
                  <div className="card-description">
                    <p>{recipe.dessert_category}</p>
                  </div>
                  <a className="card-link" href={recipe.recipe_url}></a>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}