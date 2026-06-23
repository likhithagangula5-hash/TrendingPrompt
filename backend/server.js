import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

// ─── In-memory store (replace with a DB for production) ────────────────────────
const promptsStore = new Map(); // id → { likes: number }
const rateLimitMap  = new Map(); // ip → [timestamps]

// ─── Rate limiter (max 10 generate requests per minute per IP) ──────────────────
function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 10;

  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < windowMs);
  if (timestamps.length >= maxRequests) {
    return res.status(429).json({
      error: "Too many requests. Please wait a minute before generating again.",
    });
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  next();
}

// ─── GET /api/prompts  (returns curated metadata list) ─────────────────────────
app.get("/api/prompts", (req, res) => {
  const { category, sort = "trending" } = req.query;

  // We return a lightweight catalogue — real data lives in the frontend seed
  const catalogue = Array.from({ length: 32 }, (_, i) => ({
    id: `prompt-${i + 1}`,
    likes: promptsStore.get(`prompt-${i + 1}`)?.likes ?? Math.floor(Math.random() * 300) + 20,
    category: ["social","business","coding","image","writing","study","career","video"][i % 8],
  }));

  const sorted = [...catalogue].sort((a, b) =>
    sort === "liked" ? b.likes - a.likes : b.id.localeCompare(a.id)
  );

  const filtered = category ? sorted.filter((p) => p.category === category) : sorted;
  res.json({ prompts: filtered, total: filtered.length });
});

// ─── POST /api/prompts/generate  (Gemini API call) ─────────────────────────────
app.post("/api/prompts/generate", rateLimit, async (req, res) => {
  const topic    = String(req.body.topic    || "").trim();
  const category = String(req.body.category || "General").trim();
  const tone     = String(req.body.tone     || "Expert").trim();
  const model    = String(req.body.model    || "gemini-2.5-flash").trim();

  if (!topic) {
    return res.status(400).json({ error: "Topic is required." });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({ error: "GEMINI_API_KEY is not configured on the server." });
  }

  const systemPrompt = [
    `You are an expert ${category} prompt engineer.`,
    `Tone profile: ${tone}.`,
    `Target AI model: ${model}.`,
    "",
    `Create one high-quality, structured ${category} prompt for this topic: "${topic}".`,
    "",
    "The prompt must include:",
    "  1. A precise expert role definition",
    "  2. Clear goal and objective statement",
    "  3. Required context or background to provide",
    "  4. Explicit output format and structure",
    "  5. Quality constraints and success criteria",
    "  6. (Optional) Variation or follow-up instructions",
    "",
    "Return ONLY the final executable prompt the user will paste into an AI tool.",
    "Make it specific, actionable, and high-signal. No preamble, no meta-commentary.",
  ].join("\n");

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: systemPrompt }] }] },
      { timeout: 30_000 }
    );

    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    if (!result) throw new Error("Empty response from Gemini");

    res.json({ result, model, category, tone });
  } catch (err) {
    const geminiError = err.response?.data?.error;
    console.error("[Generate Error]", geminiError || err.message);

    if (err.response?.status === 429) {
      return res.status(429).json({ error: "Gemini API quota exceeded. Please try again shortly." });
    }
    res.status(500).json({ error: geminiError?.message || "AI generation failed. Falling back to local draft." });
  }
});

// ─── POST /api/prompts/:id/like ─────────────────────────────────────────────────
app.post("/api/prompts/:id/like", (req, res) => {
  const { id } = req.params;
  const current = promptsStore.get(id) || { likes: Math.floor(Math.random() * 100) + 10 };
  const updated = { ...current, likes: current.likes + 1 };
  promptsStore.set(id, updated);
  res.json({ id, likes: updated.likes });
});

// ─── GET /api/trending ──────────────────────────────────────────────────────────
app.get("/api/trending", (req, res) => {
  const { period = "week" } = req.query;

  const multiplier = period === "today" ? 1 : period === "week" ? 2 : 3;
  const trending = Array.from({ length: 12 }, (_, i) => ({
    id: `prompt-${i + 1}`,
    rank: i + 1,
    score: (12 - i) * 10 * multiplier + Math.floor(Math.random() * 50),
    trend: i < 3 ? "up" : i < 6 ? "neutral" : "down",
    likes: (12 - i) * 8 + Math.floor(Math.random() * 30),
  }));

  res.json({ trending, period });
});

// ─── GET /api/users/:id ─────────────────────────────────────────────────────────
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  // Mock user data — swap for DB lookup in production
  res.json({
    id,
    username: "Genz_PromptGod",
    bio: "AI prompt crafter. Turning random topics into signal-dense AI instructions since 2024.",
    promptsCreated: 42,
    totalLikes: 3800,
    followers: 1200,
    following: 340,
    joinedAt: "2024-01-15",
  });
});

// ─── Health check ───────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    gemini: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// ─── Error handler ──────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("[Unhandled Error]", err.message);
  res.status(500).json({ error: "Internal server error." });
});

// ─── Start ───────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅  TrendingPrompt API running → http://localhost:${PORT}`);
  console.log(`🔑  Gemini API key: ${process.env.GEMINI_API_KEY ? "loaded" : "⚠️  MISSING (set GEMINI_API_KEY in .env)"}`);
});
