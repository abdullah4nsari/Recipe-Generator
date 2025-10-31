import React from "react";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import { getRecipeFromMistral } from "../../ai";
const Form = () => {
  const [ingredient, setIngredients] = React.useState([]);
  const [recipe,setRecipe]=React.useState("");
  const [loading,setLoading]=React.useState(false);
 
  function handleSubmit(formData) {
    const newIngredient = formData.get("ingredient").trim();
    if (!newIngredient) {
      return;
    }
    setIngredients((prevItems) => [...prevItems, newIngredient]);
  }
  async function handleGetRecipe() {
    setRecipe("");
    setLoading(true);
    const recipeMarkdown = await getRecipeFromMistral(ingredient);
    setRecipe(recipeMarkdown);
    console.log(recipe);
    setLoading(false);
  }
   function handleDelete(key) {
    setIngredients((previtem) =>
      previtem.filter((prev, index) => index !== key)
    );
  }
  return (
    <main id="main-container">
      <div>
        <form action={handleSubmit}>
          <input
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingredients"
            name="ingredient"
          />
          <button id="addIng">Add ingredient</button>
        </form>
      </div>
      
      {ingredient.length > 0 && <IngredientsList ingredient={ingredient} handleGetRecipe={handleGetRecipe} handleDelete={handleDelete}/>}
      {loading && <p className="loading">Getting recipe...</p>}
      <Recipe recipe={recipe}/>
      
    </main>
  );
};

export default Form;
