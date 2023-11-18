import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";
import AddRecipe from "./AddRecipe";
import IngredientSection from "./IngredientSection";
import RecipeDisplay from "./RecipeDisplay";

function App() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [userIngredients, setUserIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  // Setting for recipes
  const [recipe, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [url, setUrl] = useState("");
  const [picUrl, setPicUrl] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getIngredients();
  }, []);

  async function getIngredients() {
    try {
      const { data, error } = await supabase
        .from("Ingredients")
        .select("*");
      if (error) throw error;
      if (data != null) {
        setIngredients(data);
      }
    } catch (error) {
      alert(error);
    }
  }

  async function showRecipes(e) {
    var options = document.querySelectorAll('input[type=checkbox]:checked');
    var values = Array.from(options).map(({ value }) => value.toString());
    try {
      const { data, error } = await supabase
        .from("Recipes")
        .select('*')
        .containedBy('ingredients', values);
      console.log("options recipes", options);
      console.log("values recipes", values);
      console.log("recipes", data);
      if (error) throw error;
      if (data != null) {
        setRecipes(data);
      }
    } catch (error) {
      alert(error);
    }
  }

  async function addIngredient(name) {
    try {
      const { data, error } = await supabase
        .from("Ingredients")
        .insert({ name: name })
        .single();
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }

  async function showUserIngredients(e) {
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    var values = Array.from(checkboxes).map(({ value }) => value);
    setUserIngredients(values);
    console.log("values", values);
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

  return (
    <div>
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
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <IngredientSection
                ingredients = {ingredients}
                showUserIngredients = {showUserIngredients}
                category = 'pantry'
                showRecipes = {showRecipes}
                >

                </IngredientSection>
              <IngredientSection
                ingredients = {ingredients}
                showUserIngredients = {showUserIngredients}
                category = 'dairy'
                showRecipes = {showRecipes}
                >

                </IngredientSection>  
                <IngredientSection
                ingredients = {ingredients}
                showUserIngredients = {showUserIngredients}
                category = 'spice'
                showRecipes = {showRecipes}
                >

                </IngredientSection>  
                <IngredientSection
                ingredients = {ingredients}
                showUserIngredients = {showUserIngredients}
                category = 'fruit'
                showRecipes = {showRecipes}
                >

                </IngredientSection>  
            </div>
          </div>
        </div>
          <RecipeDisplay
          recipes = {recipes}
          showRecipes = {showRecipes}>
        
          </RecipeDisplay>
        </div>  
  );
}

export default App;