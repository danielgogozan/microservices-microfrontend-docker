import React from "react";
import './list.css'
const RecipeInput = ({ recipeInfo, setText, placeholder }) => {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        name="todo"
        value={recipeInfo}
        placeholder={placeholder}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};

export default RecipeInput;
