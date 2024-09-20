import { useState } from "react";
import OpenAI from "openai";

const RecipeInfo = () => {
    
    const [searchValue, setSearchValue] = useState("");
    const [recipe, setRecipe] = useState({});
    
    const handleSearch = async () => {
        
        
        const openai = new OpenAI({
            apiKey: key, dangerouslyAllowBrowser: true
        });

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "system",
                    content: `You are an intelligent assistant that provides detailed information about food. When given the name of an food, you should return the following details in JSON: Name: name of the food, Ingredients: ingredients of the food with measurements, Image-URL: get image-url using https://images.pexels.com/photos/, Description: brief description of the food, Cooking-Time: time it will take to cook, Instructions: steps to cooking the food. Give me this information about ${searchValue}.`
                }],
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            const recipeData = JSON.parse(response.choices[0].message.content);
            setRecipe(recipeData);
            console.log(recipe);
        } catch (error) {
            console.log(error);
        }  
    }

    return (
        <div>
            <input type="text" placeholder="Search for a recipe" onChange={(e) => setSearchValue(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <h2>Recipe Information</h2>
            <p>{recipe.Name}</p>
            <p>{recipe.Ingredients}</p>
            <img src={recipe["Image-URL"]} alt={recipe.Name} />
            <p>{recipe.Description}</p>
            <p>{recipe["Cooking-Time"]}</p>
            <p>{recipe.Instructions}</p>
        </div>
    );
}

export default RecipeInfo;
