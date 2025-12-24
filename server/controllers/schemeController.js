const gemini = require("../config/gemini");

exports.getSchemes = async (req, res) => {
  try {
    const { category, state, income, age, occupation } = req.body;

    // If all filters are 'All', return some general schemes
    if (
      (!category || category === "All") &&
      (!state || state === "All") &&
      (!income || income === "All") &&
      (!age || age === "All") &&
      (!occupation || occupation === "All")
    ) {
      // Example general schemes (add more as needed)
      const generalSchemes = [
        {
          name: "Pradhan Mantri Jan Dhan Yojana",
          description: "Financial inclusion program for affordable access to financial services.",
          eligibility: "All Indian citizens.",
          category: "General",
          state: "All India",
          lastApplyDate: "N/A",
          applicationProcedure: "Visit any bank branch or official website to apply.",
          applicationLink: "https://pmjdy.gov.in/"
        },
        {
          name: "Pradhan Mantri Awas Yojana",
          description: "Affordable housing for urban and rural poor.",
          eligibility: "Economically weaker sections, low and middle income groups.",
          category: "Housing",
          state: "All India",
          lastApplyDate: "N/A",
          applicationProcedure: "Apply online through the official PMAY website or at Common Service Centres.",
          applicationLink: "https://pmaymis.gov.in/"
        },
        {
          name: "Ayushman Bharat Yojana",
          description: "Health insurance scheme for economically vulnerable Indians.",
          eligibility: "Families identified as poor and vulnerable by the government.",
          category: "Healthcare",
          state: "All India",
          lastApplyDate: "N/A",
          applicationProcedure: "Check eligibility and apply at the official website or empanelled hospitals.",
          applicationLink: "https://pmjay.gov.in/"
        }
      ];
      return res.json(generalSchemes);
    }

//     const prompt = `
// Suggest Indian government schemes for:
// - Category: ${category}
// - State: ${state}
// - Income: ${income}
// - Age: ${age}
// - Occupation: ${occupation}
// Return the result as a JSON array like:
// [
//   {
//     "name": "Scheme Name",
//     "description": "Short description of scheme",
//     "eligibility": "Eligibility criteria",
//     "category": "Scheme category",
//     "state": "State",
//     "lastApplyDate": "YYYY-MM-DD or N/A",
//     "applicationProcedure": "How to apply",
//     "applicationLink": "Official government application URL (if available, else leave blank or null)"
//   },
//   ...
// ]
// Only provide real, official government URLs for applicationLink. If not available, leave it blank or null.
// `;

const prompt = `
You are an expert in Indian government welfare schemes.

Given the following user profile:
- Category: ${category}
- State: ${state}
- Income: ${income}
- Age: ${age}
- Occupation: ${occupation}

List the most relevant and up-to-date Indian government schemes that match the profile above.

Output:
Return an array of JSON objects, each representing one scheme, with the following fields:
[
  {
    "name": "Official name of the scheme",
    "description": "Brief summary (1-2 sentences) based on official sources",
    "eligibility": "Key official eligibility criteria tailored to user's profile",
    "category": "Targeted category (e.g. Women, SC/ST, Rural, Youth, Farmer, etc.)",
    "state": "State(s) to which the scheme applies",
    "lastApplyDate": "YYYY-MM-DD or 'N/A' if not available",
    "applicationProcedure": "Concise step-by-step procedure as per government sources",
    "applicationLink": "Official government URL for application (leave null if none exists)"
  },
  ...
]

Instructions:
- Only include real, current government schemes, not discontinued programs or general advice.
- Prefer central schemes and state schemes specific to the user's state.
- Double-check eligibility and details with official sources.
- Leave 'applicationLink' blank or null if no official online link is available.
- Output only the JSON array, with no extra text or commentary before or after.
- If a field is unknown, use 'N/A' (except for applicationLink).
- Show the maximum number of matching schemes that are relevant and available for this user profile.
- Do not invent or fabricate scheme names, descriptions, or application links.
`


    const schemes = await gemini(prompt);
    const jsonStart = schemes.indexOf("[");
    const jsonEnd = schemes.lastIndexOf("]") + 1;
    const jsonString = schemes.substring(jsonStart, jsonEnd);

    const parsed = JSON.parse(jsonString);
    res.json(parsed);
  } catch (error) {
    console.error("Error fetching schemes:", error.message);
    res.status(500).json({ error: "Failed to fetch schemes" });
  }
};
