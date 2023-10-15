import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

import { supabase } from './supabase';

function App() {

  const [ingredients, setIngredients] = useState([]);

  useEffect (() => {
    getIngredients();
  }, [])

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

  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          App
        </p>
        
      </header>

      <div>
      <h1>Ingredient List</h1>
      <ul>
        {ingredients ? (
          ingredients.map((ingredients) => {
          return <li key={ingredients.id}>{ingredients.name}</li>
        })
      ) : (
        <p>Loading...</p>
      )}
      </ul>
    </div>
    </div>
  );
}

export default App;
