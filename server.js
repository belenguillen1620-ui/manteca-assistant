import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DOCS = `Pegá acá tu manteca_docs.txt`;

app.post("/chat", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `Sos un asistente experto en Manteca API. ${DOCS}`
        },
        {
          role: "user",
          content: req.body.message
        }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error servidor" });
  }
});

app.listen(3000, () => console.log("Server running"));
