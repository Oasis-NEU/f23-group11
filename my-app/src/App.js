import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css"

function App() {
  const [name, setName] = useState(""); // Initialized as an empty string.
  const [ingredients, setIngredients] = useState([]); // Initialized as an empty array.
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    getIngredients();
  }, []); // "[]" signifies that this hook will only be run on the first page load

  async function getIngredients() {
    try {
      const { data, error } = await supabase // Destructure the Supabase call
        .from("Ingredients") // From the "Groceries" table
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

  async function deleteIngredient(id) {
    try {
      const { data, error } = await supabase // Destructure the Supabase call
        .from("Ingredients") // From our "Groceries" table
        .delete() // Delete
        .match({ id: id }); // The item that has the same id as the inputted id
      if (error) throw error; // If there's an error, throw it
      window.location.reload(); // Reload the window when finished
    } catch (error) {
      alert(error); // If there is an error, alert it on the window.
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
      <select multiple id="select-ingredient" onChange={(e) => (showUserIngredients(e))}>
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
    </>
  );
}

export default App;