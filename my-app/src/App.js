import logo from './logo.svg';
import './App.css';
import { supabase } from "./supabase";
import { useState, useEffect } from "react";

function App() {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    async function eftGroceries() {
      //asterik means get the whole table
      const { data, error } = await supabase.from("Groceries").select("*");
      if (data) {
        setGroceries(data);
      }
      else {
        console.log(groceries);
      }
    }
  }, [])

  return <div> 
    <h1> Grocery List</h1>
    <ul>
      {grocieries ? (groceries.map((grocery) => {
        return <li key={grocery.id}>{grocery.name}</li>;
      }) 
      ) : (
      <p> Loading... </p>
      )}
    </ul>
  </div>
}

export default App;
