import React from "react";

export default function IngredientSection({
    ingredients,
    showUserIngredients,
    category,
    showRecipes
}) {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    return (<div className="column" style={{ flex: '1' }}>
    <h1>{formattedCategory}</h1>
    {ingredients &&
      ingredients.map((ingredient) => (
        <div key={ingredient.id}>
          {ingredient.ingredientType === category && (
            <>
              <input
                type="checkbox"
                id={ingredient.id}
                name={ingredient.name}
                value={ingredient.name}
                onChange={(e) => (showUserIngredients(e) && showRecipes(e))}
              />
              <label htmlFor={ingredient.id}>{ingredient.name}</label>
            </>
          )}
        </div>
      ))}
  </div>);

}