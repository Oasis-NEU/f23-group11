import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css"
import AddRecipe from "./AddRecipe";

function App() {
  const [name, setName] = useState(""); // Initialized as an empty string.
  const [ingredients, setIngredients] = useState([]); // Initialized as an empty array.
  const [userIngredients, setUserIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  //setting for recipes
  const [recipe, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [url, setUrl] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [category, setCategory] = useState("");


  useEffect(() => {
    getIngredients();
  }, []); // "[]" signifies that this hook will only be run on the first page load

  async function getIngredients() {
    try {
      const { data, error } = await supabase // Destructure the Supabase call
        .from("Ingredients") // From the "Ingredeints" table
        .select("*"); // Select (fetch) everything
      if (error) throw error; // If there is an error, throw it
      if (data != null) {
        // If there is data fetched
        setIngredients(data); // Set our groceries state variable to the data
      }
    } catch (error) {
      alert(error); // If an error is caught, alert it on the client
    }
  }

  async function showRecipes(e) {
    var options = document.querySelectorAll('input[type=checkbox]:checked');
    var values = Array.from(options).map(({ value }) => value.toString());
    try {
      const {data, error} = await supabase
      .from("Recipes")
      .select('*')
      .containedBy('ingredients', values);
      console.log("options recipes",options);
      console.log("values recipes",values);
      console.log("recipes", data);
      if (error) throw error;
      if (data != null) {
        setRecipes(data);
      }
     }
     catch (error) {
      alert(error);
     }
  }

  async function addIngredient(name) {
    try {
      const { data, error } = await supabase // Destructuring our Supabase call
        .from("Ingredients") // Get our "Groceries" table
        .insert({ name: name }) // Insert passed in name and price as a row
        .single(); // Only insert it once
      if (error) throw error; // If there is an error, throw it
      window.location.reload(); // Load the window once complete
    } catch (error) {
      alert(error); // If an error is caught, alert it on screen
    }
  }



  async function showUserIngredients(e) {
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    var values = Array.from(checkboxes).map(({ value }) => value);
    setUserIngredients(values);
    console.log("values",values);
  }

  async function selectAllIngredients() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = true));
    showUserIngredients();
    showRecipes();
  }

  async function deselectAllIngredients() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
    showUserIngredients();
    showRecipes();
  }

  return ( <div className="App">  
    <AddRecipe 
      recipeName = {recipe}
      setRecipeName = {setRecipeName}
      recipeIngredients = {recipeIngredients}
      setRecipeIngredients = {setRecipeIngredients}
      url = {url}
      setUrl = {setUrl}
      picUrl = {picUrl}
      setPicUrl = {setPicUrl}
      category = {category}
      setCategory = {setCategory}
      />
  
      <h1>Ingredients List</h1>
      <div>
       <button onClick={() => selectAllIngredients()}>Select All</button>
       <button onClick={() => deselectAllIngredients()}>Deselect All</button>
      </div>
      <div>
      <div>
  {/* Nesting the map within a <div> so our data is in the form of a group of checkboxes */}
  {ingredients &&
    ingredients.map((ingredient) => (
      <div key={ingredient.id}>
        <input
          type="checkbox"
          id={ingredient.id}
          name={ingredient.name}
          value={ingredient.name}
          onChange={(e) => (showUserIngredients(e) && showRecipes(e))}
        />
        <label htmlFor={ingredient.id}>{ingredient.name}</label>
      </div>
    ))}
    </div>
    </div> 
      <div>
        <p>Showing {recipes.length} recipes you can make!</p>
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
  {/* Nesting the map within a <ul> so our data is in the form of a list */}
  {recipes &&
    recipes.map((recipe) => {
      console.log(recipe.id, recipe.recipe_name, recipe.image_url);
      return (
        <li key={recipe.id} style={{ margin: '0 10px', flexBasis: '25%' }}>
          {recipe.recipe_name}
          {<a href={recipe.recipe_url}> <img src={recipe.image_url} alt="cannot display" 
          style={{ width: '400px', height: '400px' }} /></a>}
          <p></p>
        </li>
      )
    })}
</ul>
      </div>
  </div> );
}

export default App;