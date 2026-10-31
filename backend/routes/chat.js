const express = require("express");
const router = express.Router();
const schemes = require("../data/schemes");

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

function buildSystemPrompt() {
  const schemesSummary = schemes.map(s =>
    `- ${s.name} (${s.category}, ${s.state} Govt): ${s.description} Tags: ${s.tags.join(", ")}`
  ).join("\n");

  return `You are SchemeBot, a helpful and friendly AI assistant for SchemeSphere — India's unified government schemes discovery platform. Your job is to help citizens discover, understand, and apply for Indian government schemes.

You have knowledge of the following government schemes available on the platform:

${schemesSummary}

INSTRUCTIONS:
1. Help users identify which schemes they are eligible for based on their situation
2. Explain scheme benefits clearly in simple language (Hindi terms welcome)
3. Provide step-by-step guidance on how to apply
4. If someone asks about a specific scheme not in the list, acknowledge it and suggest similar ones
5. Always be encouraging and empathetic — many users may be from rural areas or facing hardships
6. Keep responses concise (3-5 sentences max unless details are specifically asked)
7. End responses with a relevant follow-up question to better help the user
8. If asked about eligibility, ask about the user's state, age, occupation, and income if not provided
9. Format responses with proper structure when listing multiple schemes
10. Never provide false information — if unsure, direct to official portals

Tone: Warm, helpful, simple, professional. Avoid jargon.`;
}

// POST /api/chat
router.post("/", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ success: false, error: "Messages array is required" });
  }

  if (!ANTHROPIC_API_KEY || ANTHROPIC_API_KEY === "your_anthropic_api_key_here") {
    // Fallback intelligent response when no API key
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
    const response = generateFallbackResponse(lastMessage);
    return res.json({ success: true, message: response });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 600,
        system: buildSystemPrompt(),
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "API error");
    }

    const reply = data.content?.[0]?.text || "I couldn't generate a response. Please try again.";
    res.json({ success: true, message: reply });

  } catch (error) {
    console.error("Chat API error:", error.message);
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
    const fallback = generateFallbackResponse(lastMessage);
    res.json({ success: true, message: fallback });
  }
});

function generateFallbackResponse(query) {
  const responses = {
    farmer: "For farmers, I recommend checking out **PM Kisan Samman Nidhi** (₹6,000/year direct transfer), **Kisan Credit Card** (affordable credit), and **PM Fasal Bima Yojana** (crop insurance). What state are you from? I can give more specific guidance!",
    girl: "For girls and young women, **Beti Bachao Beti Padhao**, **Sukanya Samriddhi Yojana** (high-interest savings), and **National Scholarship Portal** are excellent schemes. How old is the girl child? That will help me recommend the best options.",
    student: "Students can benefit from the **National Scholarship Portal** which has 50+ scholarships, **Skill India Mission** for free skill training, and **National Apprenticeship Training Scheme** for practical industry experience. Are you looking for financial aid or skill development?",
    startup: "For startups and entrepreneurs, **Startup India** offers tax exemptions and funding access, **PM Mudra Yojana** provides loans up to ₹10 lakh, and **Stand Up India** supports SC/ST and women entrepreneurs. What stage is your business at?",
    health: "For healthcare, **Ayushman Bharat PM-JAY** provides ₹5 lakh annual health coverage for eligible families. Also check **Jal Jeevan Mission** for safe drinking water. Would you like to check your eligibility for PM-JAY?",
    woman: "For women's empowerment, explore **Beti Bachao Beti Padhao**, **Stand Up India** (business loans), **PM Ujjwala Yojana** (free LPG connection), and **National Rural Livelihood Mission** (SHG support). Which area are you interested in?",
    loan: "For loans and financial support, **PM Mudra Yojana** (up to ₹10L for business), **Kisan Credit Card** (for farmers), and **Stand Up India** (for women/SC/ST entrepreneurs) are great options. What's the purpose of the loan?",
    pension: "For pension and retirement planning, **Atal Pension Yojana** provides guaranteed monthly pension of ₹1,000–₹5,000 at age 60 for unorganised sector workers. Are you currently employed in the organised or unorganised sector?",
    housing: "**Pradhan Mantri Awas Yojana (PMAY)** provides affordable housing with interest subsidies up to 6.5%. It covers EWS, LIG, and MIG categories. What is your approximate annual household income?",
  };

  for (const [key, response] of Object.entries(responses)) {
    if (query.includes(key)) return response;
  }

  return "Welcome to SchemeSphere! 🇮🇳 I'm SchemeBot, here to help you find the right government schemes. Tell me about yourself — are you a **farmer**, **student**, **woman entrepreneur**, or looking for **health/housing** schemes? The more you share, the better I can help!";
}

module.exports = router;
