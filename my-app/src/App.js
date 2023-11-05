import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css"

function App() {
  const [name, setName] = useState(""); // Initialized as an empty string.
  const [ingredients, setIngredients] = useState([]); // Initialized as an empty array.
  const [userIngredients, setUserIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

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
    var options = document.getElementById('select-ingredient').selectedOptions;
    var values = [];
    values = Array.from(options).map(({ value }) => value.toString());
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
    var options = document.getElementById('select-ingredient').selectedOptions;
    var values = Array.from(options).map(({ value }) => value);
    setUserIngredients(values);
    console.log("options",options);
    console.log("values",values);
  }

  return (
    <>
      <h1>Ingredients List</h1>
      {/* 
			Input field to enter the grocery name. On event change, we change the name state
			variable to what is typed into the text field using the setName() state function.
			*/}
      <label>Name</label>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      {/* 
			Input field to enter the grocery price. On event change, we change the price state
			variable to what is typed into the text field using the setPrice() state function.
			*//*
			Button, when clicked executes the postGrocery() function with the name and price
			state variables.
			*/}
      <button onClick={() => addIngredient(name)}>Add Grocery</button>
      <div>
      <select multiple id="select-ingredient" onChange={(e) => (showUserIngredients(e) && showRecipes(e))}>
        {/* Nesting the map within a <ul> so our data is in the form of a list */}
        {ingredients &&
          ingredients.map((ingredient) => (
            <option value={ingredient.name} key={ingredient.id} > {ingredient.name} </option>
          ))}
          
      </select>
      </div>
      <div>
        <ul>
          {userIngredients && userIngredients.map((ingredient) => 
          <li key={ingredient.id} > 
          {ingredient} </li> )}
        </ul>
      </div>
      <div>
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
  {/* Nesting the map within a <ul> so our data is in the form of a list */}
  {recipes &&
    recipes.map((recipe) => {
      console.log(recipe.id, recipe.recipe_name, recipe.image_url);
      return (
        <li key={recipe.id} style={{ margin: '0 10px', flexBasis: '25%' }}>
          {recipe.recipe_name}
          <p></p><img src={recipe.image_url} alt="cannot display" 
          style={{ width: '400px', height: '400px' }} />
        </li>
      )
    })}
</ul>
      </div>
    </>
  );
}

export default App;