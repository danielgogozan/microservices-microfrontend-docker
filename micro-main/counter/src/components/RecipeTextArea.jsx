import React from "react";
import './list.css'

const RecipeTextArea = ({ recipeInfo, setText, placeholder }) => {
    return (
        <div className="input-wrapper">
            <textarea name="Text1"
                      cols="40"
                      rows="5"
                      value={recipeInfo}
                      placeholder={placeholder}
                      onChange={(e) => {
                setText(e.target.value);
            }}>
            </textarea>
        </div>
    );
};

export default RecipeTextArea;
