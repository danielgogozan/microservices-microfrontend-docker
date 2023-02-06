import React, {useEffect, useState} from "react";
import RecipeInput from "./RecipeInput";
import List from "./List";
import apiClient from "../core";
import RecipeTextArea from "./RecipeTextArea";

class Recipe {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description
    }
}

export const RecipeList = (props) => {
    const [recipeList, setRecipeList] = useState([]);
    const [trendingRecipes, setTrendingRecipes] = useState([]);
    const [recipe, setRecipe] = useState(new Recipe("", "", ""));
    const [token, setToken] = useState(props.value);

    useEffect(() => {
        const dataFetch = async () => {
            await getAllRecipes()
        };
        const trendingFetch = async () => {
            await getTrending()
        };

        dataFetch();
        trendingFetch()
    }, []);

    // API CALLS
    const getAllRecipes = async () => {
        const response = await apiClient(token).get("");
        console.log(`RECIPES:`)
        console.log(response.data)
        const allRecipes = [];
        response.data.forEach((data) => {
            const recipe = new Recipe(data.id, data.name, data.description)
            allRecipes.push(recipe)
        });
        setRecipeList(allRecipes)
    };

    const getTrending = async () => {
        const response = await apiClient(token).get("/trending");
        const allTrending = [];
        response.data.forEach((data) => {
            const recipe = new Recipe(data.id, data.name, data.description)
            allTrending.push(recipe)
        });
        setTrendingRecipes(allTrending)
    };

    const addRecipe = async () => {
        if (recipe === null || recipe.name === "" || recipe.description === "") {
            return
        }

        const recipeToSave = { name: recipe.name, description: recipe.description }
        const response = await apiClient(token).post("/save", recipeToSave);

        console.log(response.data)

        setRecipeList([...recipeList, response.data]);
        setRecipe(new Recipe("", "", ""))
    };

    const deleteRecipe = async (recipeToDelete) => {

        const response = await apiClient(token).delete(`/delete/${recipeToDelete.id}`);
        console.log(response)

        const newRecipeList = recipeList.filter((recipe) => {
            return recipe.id !== recipeToDelete.id;
        });
        setRecipeList(newRecipeList);
    };

    // SET NAME & DESCRIPTION
    const setName = (name) => {
        const newRecipe = new Recipe();
        newRecipe.name = name
        if (recipe === null) {
            newRecipe.description = ""
        } else {
            newRecipe.description = recipe.description
        }
        setRecipe(newRecipe)
    }

    const setDescription = (description) => {
        const newRecipe = new Recipe();
        newRecipe.description = description
        if (recipe === null) {
            newRecipe.name = ""
        } else {
            newRecipe.name = recipe.name
        }
        setRecipe(newRecipe)
    }

    return (
        <div>
            <label className={"page-subtitle"}>📝 new recipe</label>
            <div className={"recipe-add"}>
                <div id="outer-div">
                <RecipeInput id={"inner-div"}
                             recipeInfo={recipe.name}
                             setText={setName}
                             placeholder={"name"}/>

                <RecipeTextArea id={"inner-div"}
                                recipeInfo={recipe.description}
                                setText={setDescription}
                                placeholder={"description"}/>

                    <button className="add-button" id={"inner-div"} onClick={addRecipe}>
                        ADD RECIPE
                    </button>
                </div>
            </div>

            <label className={"page-subtitle"}>👩‍🍳 all recipes</label>
            <List list={recipeList} remove={deleteRecipe} canRemove={true}/>

            <div className={"trending"}>
                <label className={"page-subtitle"}>🔥 trending</label>
                <List list={trendingRecipes} remove="" canRemove={false}/>
            </div>
        </div>
    );
}
