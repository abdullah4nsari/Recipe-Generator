import express from 'express';
import cors from 'cors';
import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT||3001;

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include few additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page,
only give recipe name and ingredients and instructions not any kind of supporting paragraph before or after these 3 things
`;

const hf = new HfInference(process.env.ACCESS_TOKEN);

app.post('/api/recipe', async (req, res) => {
    const { ingredients } = req.body;
    const ingredientsString = ingredients.join(", ");
    
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}.Give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        });
        res.json({ recipe: response.choices[0].message.content });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to generate recipe" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});