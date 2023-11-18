import React from "react";

export default function RecipeDisplay({ recipes, showRecipes }) {
    return (
    <div>
          <p>Showing {recipes.length} recipes you can make!</p>
          <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
            {recipes &&
              recipes.map((recipe) => {
                console.log(recipe.id, recipe.recipe_name, recipe.image_url);
                return (
                  <li key={recipe.id} style={{ margin: '0 10px', flexBasis: '25%' }}>
                    {recipe.recipe_name}
                    {
                      <a href={recipe.recipe_url}>
                        {' '}
                        <img
                          src={recipe.image_url}
                          alt="cannot display"
                          style={{ width: '400px', height: '400px' }}
                        />
                      </a>
                    }
                    <p></p>
                  </li>
                );
              })}
          </ul>
        </div> )
}