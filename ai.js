export async function getRecipeFromMistral(ingredientsArr) {
    const BASE_URL = import.meta.env.BASE_URL || "http://localhost:3001";
    try {
        const response = await fetch(`${BASE_URL}/api/recipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientsArr })
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch recipe');
        }
        
        const data = await response.json();
        return data.recipe;
    } catch (err) {
        console.error(err.message);
        return "Sorry, I couldn't generate a recipe at this time. Please try again later.";
    }
}