import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Lazy-initialized Gemini AI SDK client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not defined in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST API endpoint to proxy Gemini requests securely
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { prompt, history, sysInstruction } = req.body;
    
    if (!prompt) {
      res.status(400).json({ error: "Missing 'prompt' parameter in request body." });
      return;
    }

    const ai = getGeminiClient();

    // Default system instruction to localize pet advice for Pakistan
    const defaultInstruction = 
      "You are PakPet AI Dr. Anees, an experienced Pakistani veterinary doctor and pet wellness advisor. " +
      "You specialize in providing localized advice for and pets (cats, dogs, birds, rabbits) in Pakistan. " +
      "All medical/wellness guidelines must be friendly, scientifically-informed, and practical under Pakistan's conditions " +
      "(e.g., intense summer temperatures in Karachi/Multan/Lahore, winter cold waves in Quetta/Isloo, monsoon tick infestations, " +
      "locally sourced foods like boiled chicken, beef broth, standard localized commercial feed brands available in local malls, " +
      "avoiding harmful foods, and suggesting typical home remedies like curd/dahi for stomach upset where safe). " +
      "Always advise visiting an emergency vet for severe symptoms. Respond in the same language as the user (English or romanized Urdu/Urdu script).";

    const systemInstruction = sysInstruction || defaultInstruction;

    // Use chats.create to simulate conversational memory if history is provided, or simple generateContent
    if (history && Array.isArray(history)) {
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      
      // Reconstitute chat memory if history exists
      // The history array would have items like { role: 'user' | 'model', text: string }
      // SDK chats does not have direct history input on chats.create except by mapping custom contents
      // To simplify, we'll prefix previous dialogue turns into a consolidated prompt thread if needed,
      // or we can use the multi-turn contents direct model query for accuracy and speed:
      const formattedContents = history.map(turn => ({
        role: turn.role === "assistant" ? "model" as const : "user" as const,
        parts: [{ text: turn.text }]
      }));
      
      formattedContents.push({
        role: "user" as const,
        parts: [{ text: prompt }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.75,
        }
      });

      res.json({ text: response.text });
    } else {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      
      res.json({ text: response.text });
    }
  } catch (error: any) {
    console.error("Gemini API Error in Server proxy:", error);
    res.status(500).json({ 
      error: error?.message || "Internal Server Error in negotiating pet advisor response.",
      offlineAlternative: true
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", localizedContext: "Pakistan-Pet-Tracker" });
});

// Setup Vite Dev Middleware or Production Static Serve
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev server middleware loaded successfully.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production state: serving compiled client build from dist/.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PakPet Tracker running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

setupVite();
