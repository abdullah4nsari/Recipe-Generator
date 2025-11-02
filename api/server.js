import { InferenceClient } from "@huggingface/inference";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.post("/api/recipe", async (req, res) => {
  const client = new InferenceClient(process.env.ACCESS_TOKEN);

  const ingredients = req.body.ingredients;
  // ...

const prompt = `
ROLE: You are a recipe assistant. Suggest a recipe using the following ingredients. You may add up to 2 common extra ingredients.

AVAILABLE INGREDIENTS: ${ingredients.join(", ")}.

OUTPUT FORMAT INSTRUCTIONS:
STRICTLY follow this format and only use Markdown.
DO NOT include any introductory or concluding text, or any explanation.

The output MUST contain only these four elements, in this order:
1. **Title, which MUST use a Level 1 Heading (#) AND be bolded (**Title**).** Example: **# **My Great Recipe****
2. Ingredients list (using a bulleted list with quantities)
3. Step-by-step instructions (using a numbered list)
4. A short note or tip at the end (using a separator and text).

BEGIN RECIPE OUTPUT.
`;

// ...
  try {
    const chatCompletion = await client.chatCompletion({
      provider: "featherless-ai",
      model: "HuggingFaceH4/zephyr-7b-beta",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1024,
    });
    function cleanModelOutput(chatCompletion) {
  return chatCompletion
    .replace(/\[INST\]/g, "")
    .replace(/\[\/INST\]/g, "")
    .replace(/\[ASS\]/g, "")
    .replace(/\[\/ASS\]/g, "")
    .replace(/<s>/g, "")
    .replace(/<\/s>/g, "")
    .trim();
}

// Example usage:
const cleanText = cleanModelOutput(chatCompletion.choices[0].message.content);

    res.json({ recipe: cleanText });
  } catch (error) {
    res.err(error);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// console.log(chatCompletion.choices[0].message);
