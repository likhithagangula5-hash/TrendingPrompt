export const CATEGORIES = [
  {
    id: "social",
    label: "Social",
    accent: "#ff4d8d",
    tone: "sharp, visual, and scroll-stopping",
    description: "Captions, hooks, replies, creator campaigns",
  },
  {
    id: "business",
    label: "Business",
    accent: "#2dd4bf",
    tone: "clear, executive, and conversion-aware",
    description: "Strategy, sales, operations, leadership",
  },
  {
    id: "coding",
    label: "Coding",
    accent: "#60a5fa",
    tone: "precise, practical, and test-driven",
    description: "Debugging, architecture, code review, docs",
  },
  {
    id: "image",
    label: "Image",
    accent: "#f59e0b",
    tone: "cinematic, specific, and art-directable",
    description: "AI art, product shots, scenes, style boards",
  },
  {
    id: "writing",
    label: "Writing",
    accent: "#a78bfa",
    tone: "memorable, structured, and voice-sensitive",
    description: "Stories, essays, scripts, brand voice",
  },
  {
    id: "study",
    label: "Study",
    accent: "#84cc16",
    tone: "simple, rigorous, and retention-focused",
    description: "Learning plans, notes, flashcards, exams",
  },
  {
    id: "career",
    label: "Career",
    accent: "#fb7185",
    tone: "confident, concise, and human",
    description: "Resumes, interviews, portfolios, outreach",
  },
  {
    id: "video",
    label: "Video",
    accent: "#38bdf8",
    tone: "paced, visual, and production-ready",
    description: "Shorts, ads, explainers, shot lists",
  },
];

export const PROMPTS = [
  {
    id: "social-001",
    category: "social",
    title: "Travel Reel Caption",
    metric: "Hot",
    prompt:
      "Act as a travel creator. Write 5 short Instagram captions for a cinematic mountain reel. Each caption must include a hook, sensory detail, and a soft call to save the post.",
  },
  {
    id: "social-002",
    category: "social",
    title: "Launch Thread",
    metric: "New",
    prompt:
      "Create a 7-post launch thread for a new productivity app. Start with a painful workplace moment, introduce the product naturally, and end with a clean invitation to try it.",
  },
  {
    id: "social-003",
    category: "social",
    title: "Comment Reply Bank",
    metric: "Useful",
    prompt:
      "Build a reply bank for a creator responding to skeptical comments about AI tools. Include 12 replies: curious, funny, firm, educational, and conversion-focused.",
  },
  {
    id: "social-004",
    category: "social",
    title: "Carousel Outline",
    metric: "Viral",
    prompt:
      "Outline a 9-slide Instagram carousel about mistakes first-time founders make. Give each slide a punchy headline, one key point, and a visual direction.",
  },
  {
    id: "business-001",
    category: "business",
    title: "Investor Update",
    metric: "Pro",
    prompt:
      "Draft a concise monthly investor update for a SaaS startup. Include wins, metrics, risks, asks, and next milestones in a transparent but confident tone.",
  },
  {
    id: "business-002",
    category: "business",
    title: "Customer Interview",
    metric: "Research",
    prompt:
      "Create a customer interview guide for validating a subscription meal planning product. Include warm-up questions, problem discovery, willingness-to-pay, and closing prompts.",
  },
  {
    id: "business-003",
    category: "business",
    title: "Sales Email Sequence",
    metric: "Growth",
    prompt:
      "Write a 4-email outbound sequence for selling a cybersecurity audit to mid-market CTOs. Keep it direct, specific, and respectful of a busy inbox.",
  },
  {
    id: "business-004",
    category: "business",
    title: "Meeting Brief",
    metric: "Fast",
    prompt:
      "Turn these rough notes into a one-page executive meeting brief with context, decision needed, options, recommendation, risks, and next steps.",
  },
  {
    id: "coding-001",
    category: "coding",
    title: "React Bug Hunt",
    metric: "Debug",
    prompt:
      "Act as a senior React engineer. Review this component for state bugs, unnecessary renders, accessibility issues, and missing tests. Return findings by severity with code-level fixes.",
  },
  {
    id: "coding-002",
    category: "coding",
    title: "API Contract",
    metric: "Spec",
    prompt:
      "Design a REST API contract for saved prompt collections. Include endpoints, request bodies, response examples, validation errors, and pagination behavior.",
  },
  {
    id: "coding-003",
    category: "coding",
    title: "Refactor Plan",
    metric: "Clean",
    prompt:
      "Create a low-risk refactor plan for a legacy JavaScript module. Identify seams, tests to add first, migration steps, and rollback checkpoints.",
  },
  {
    id: "coding-004",
    category: "coding",
    title: "Test Matrix",
    metric: "QA",
    prompt:
      "Build a compact test matrix for a checkout flow. Cover happy paths, validation, payment failures, retries, mobile behavior, accessibility, and analytics events.",
  },
  {
    id: "image-001",
    category: "image",
    title: "Product Hero Shot",
    metric: "Studio",
    prompt:
      "Create an AI image prompt for a premium desk lamp on a walnut desk at blue hour. Include camera angle, lens, materials, lighting, color palette, and negative prompts.",
  },
  {
    id: "image-002",
    category: "image",
    title: "Futuristic City",
    metric: "Cinematic",
    prompt:
      "Write a detailed AI art prompt for a rain-soaked futuristic city market. Blend neon signage, practical street life, reflective surfaces, and documentary realism.",
  },
  {
    id: "image-003",
    category: "image",
    title: "Brand Moodboard",
    metric: "Design",
    prompt:
      "Generate a visual moodboard prompt for a calm fintech brand. Include typography mood, UI surfaces, lighting, textures, colors, and composition references.",
  },
  {
    id: "image-004",
    category: "image",
    title: "Character Sheet",
    metric: "Game",
    prompt:
      "Create a character design prompt for a tactical RPG healer. Include silhouette, outfit details, expression range, props, turnaround views, and style constraints.",
  },
  {
    id: "writing-001",
    category: "writing",
    title: "Founder Story",
    metric: "Voice",
    prompt:
      "Transform a founder's rough origin story into a polished About page. Preserve the human details, remove buzzwords, and structure it with narrative momentum.",
  },
  {
    id: "writing-002",
    category: "writing",
    title: "Essay Outline",
    metric: "Deep",
    prompt:
      "Create a thoughtful essay outline about why people procrastinate on meaningful work. Include thesis, counterarguments, anecdotes, and a grounded conclusion.",
  },
  {
    id: "writing-003",
    category: "writing",
    title: "Podcast Script",
    metric: "Audio",
    prompt:
      "Write a 6-minute podcast script explaining a complex technology trend to smart beginners. Include cold open, segment beats, transitions, and closing line.",
  },
  {
    id: "writing-004",
    category: "writing",
    title: "Brand Voice Rewrite",
    metric: "Polish",
    prompt:
      "Rewrite this landing page copy in a brand voice that is warm, precise, and premium. Keep the meaning, reduce fluff, and give 3 alternate hero lines.",
  },
  {
    id: "study-001",
    category: "study",
    title: "Exam Flashcards",
    metric: "Learn",
    prompt:
      "Convert this chapter into active-recall flashcards. Include definitions, examples, tricky distinctions, and 10 exam-style questions with answers.",
  },
  {
    id: "study-002",
    category: "study",
    title: "Learning Sprint",
    metric: "Plan",
    prompt:
      "Build a 14-day study sprint for learning SQL from zero. Include daily objectives, practice tasks, checkpoints, and review sessions.",
  },
  {
    id: "study-003",
    category: "study",
    title: "Explain Like a Tutor",
    metric: "Clear",
    prompt:
      "Teach me gradient descent like a patient tutor. Use intuition first, then math, then a small numeric example, then common mistakes.",
  },
  {
    id: "study-004",
    category: "study",
    title: "Research Digest",
    metric: "Brief",
    prompt:
      "Summarize these research notes into a digest with key claims, evidence quality, open questions, and practical implications.",
  },
  {
    id: "career-001",
    category: "career",
    title: "Resume Bullets",
    metric: "Hiring",
    prompt:
      "Rewrite these resume bullets for a product manager role. Make each bullet outcome-driven, specific, and credible without sounding inflated.",
  },
  {
    id: "career-002",
    category: "career",
    title: "Interview Practice",
    metric: "Prep",
    prompt:
      "Run a behavioral interview practice session for a senior engineer. Ask one question at a time, score my answer, and suggest a stronger STAR response.",
  },
  {
    id: "career-003",
    category: "career",
    title: "Recruiter Outreach",
    metric: "Warm",
    prompt:
      "Write 3 concise LinkedIn outreach messages to a recruiter for a data analyst role. Make them personal, specific, and low-pressure.",
  },
  {
    id: "career-004",
    category: "career",
    title: "Portfolio Case Study",
    metric: "Ship",
    prompt:
      "Structure a portfolio case study for a UX project. Include problem, constraints, process, tradeoffs, visuals to show, outcome, and reflection.",
  },
  {
    id: "video-001",
    category: "video",
    title: "Short-Form Script",
    metric: "Reels",
    prompt:
      "Write a 35-second short-form video script about a surprising productivity mistake. Include hook, beat-by-beat visuals, on-screen text, and CTA.",
  },
  {
    id: "video-002",
    category: "video",
    title: "Product Demo",
    metric: "Ad",
    prompt:
      "Create a 60-second product demo script for a note-taking app. Show the before state, product moments, user benefit, and final proof point.",
  },
  {
    id: "video-003",
    category: "video",
    title: "YouTube Outline",
    metric: "Long",
    prompt:
      "Outline a 10-minute YouTube video comparing three AI writing tools. Include intro hook, evaluation criteria, sections, examples, and closing recommendation.",
  },
  {
    id: "video-004",
    category: "video",
    title: "Shot List",
    metric: "Film",
    prompt:
      "Create a shot list for a cozy cafe brand film. Include shot type, camera movement, sound notes, lighting, and purpose for each shot.",
  },
];

export const FEATURED_PROMPTS = PROMPTS.filter((prompt) =>
  [
    "social-004",
    "business-003",
    "coding-001",
    "image-001",
    "writing-004",
    "study-002",
    "career-001",
    "video-001",
  ].includes(prompt.id)
);

export function getCategoryById(id) {
  return CATEGORIES.find((category) => category.id === id) || CATEGORIES[0];
}

export function getPromptsByCategory(categoryId) {
  if (!categoryId || categoryId === "all") return PROMPTS;
  return PROMPTS.filter((prompt) => prompt.category === categoryId);
}

export function getCategoryCounts() {
  return CATEGORIES.map((category) => ({
    ...category,
    count: PROMPTS.filter((prompt) => prompt.category === category.id).length,
  }));
}
