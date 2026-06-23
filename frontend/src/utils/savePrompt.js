export const getSavedPrompts = () => {
  try {
    return JSON.parse(localStorage.getItem("savedPrompts")) || [];
  } catch {
    return [];
  }
};

export const savePrompt = (prompt) => {
  const existing = getSavedPrompts();
  const normalized =
    typeof prompt === "string"
      ? { id: prompt, title: "Saved Prompt", category: "social", prompt }
      : prompt;

  const exists = existing.some((item) => {
    const itemText = typeof item === "string" ? item : item.prompt;
    return itemText === normalized.prompt;
  });

  if (exists) return false;

  const updated = [normalized, ...existing];
  localStorage.setItem("savedPrompts", JSON.stringify(updated));
  return true;
};
