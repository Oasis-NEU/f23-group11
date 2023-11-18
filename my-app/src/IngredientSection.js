import React from "react";

export default function IngredientSection({
    ingredients,
    showUserIngredients,
    category,
    showRecipes
}) {
    async function selectAllIngredients() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          const ingredientType = checkbox.getAttribute('data-cat');
          console.log("TYPE", checkbox.cat);
          if (ingredientType === category) {
            checkbox.checked = true;
          }
        });
        showUserIngredients();
        showRecipes();
      }
      
      async function deselectAllIngredients() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          const ingredientType = checkbox.getAttribute('data-cat');
          if (ingredientType === category) {
            checkbox.checked = false;
          }
        });
        showUserIngredients();
        showRecipes();
      }

    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    return (<div className="column" style={{ flex: '1' }}>
    <div>
        <button onClick={() => selectAllIngredients()}>Select All {formattedCategory}</button>
        <button onClick={() => deselectAllIngredients()}>Deselect All {formattedCategory}</button>
    </div>
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
                data-cat={ingredient.ingredientType}
                onChange={(e) => (showUserIngredients(e) && showRecipes(e))}
              />
              <label htmlFor={ingredient.id}>{ingredient.name}</label>
            </>
          )}
        </div>
      ))}
  </div>);

}