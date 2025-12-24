function parseGeminiResponse(text) {
  const lines = text.split("\n").filter(Boolean);
  const schemes = [];
  let current = {};

  lines.forEach((line) => {
    if (line.startsWith("✅") || line.startsWith("-") || /^\d+\./.test(line)) {
      if (current.title) schemes.push(current);
      current = { title: line.replace(/^✅|^-|\d+\./, "").trim() };
    } else if (line.toLowerCase().includes("apply")) {
      current.applicationLink = line.match(/https?:\/\/\S+/)?.[0] || "#";
    } else if (line.toLowerCase().includes("eligibility")) {
      current.eligibility = line.trim();
    } else {
      current.description = current.description
        ? current.description + " " + line
        : line;
    }
  });

  if (current.title) schemes.push(current);

  return schemes.map((s, i) => ({
    id: i + 1,
    title: s.title || "Scheme",
    category: "General",
    description: s.description || "No description available",
    applicationLink: s.applicationLink || "#",
    maxIncome: "All",
    ageGroup: "All",
    state: "All",
    occupation: "All",
  }));
}

module.exports = { parseGeminiResponse };
