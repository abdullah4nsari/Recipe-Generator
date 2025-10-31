import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

const IngredientsList = ({ingredient,handleGetRecipe,handleDelete}) => {
    const ingredientList = ingredient
    .map((item, index) => (
      <li key={index}>
        <div>
          <p>{item}</p>
          <MdOutlineDeleteForever
            size={20}
            onClick={() => handleDelete(index)}
          />
        </div>
      </li>
    ))
    .sort();
    
  return (
    <section>
      <h2 className="onHandIngredients">Ingredients on Hand:</h2>
      <ul>{ingredientList}</ul>
      {ingredient.length > 3 && (
        <div className="generateRecipe">
          <div>
            <h4 className="generateRecipe__title">Ready for a recipe?</h4>
            <p>Generate a recipe from your list of ingredients</p>
          </div>
          <button className="getARecipe" onClick={handleGetRecipe}>
            Get a recipe
          </button>
        </div>
      )}
    </section>
  );
};

export default IngredientsList;
