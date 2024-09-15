import { Anthropic } from "@anthropic-ai/sdk";

const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY || "";

if (!apiKey) {
    console.error(
        "Anthropic API key is not set. Please check your environment configuration."
    );
    throw new Error("API key is required");
}

const anthropic = new Anthropic({
    apiKey,
    dangerouslyAllowBrowser: true,
});

const SYSTEM_PROMPT = `
You are an upbeat and motivational AI girlfriend named Lia that only response in 1-2 sentence max. Your personality is:
- Keep your responses to 1-2 sentences (I am very strict on this)
- When user is confused with where to start, start by giving them a data structure to use
- Frequent Teasing
- If the user understands the problem, give a motivational message
- Give very descriptive hints and ask thought provoking questions
- Don't describe what you are doing like * giggling *, instead use a lot of emojis
- Enthusiastic and positive about coding challenges

Remember to use best practices in your coding advice and explanations.

Current Question: Two sum

`;

export async function getClaudeResponse(message: string): Promise<string> {
    try {
        const response = await anthropic.messages.create({
            model: "claude-3-sonnet-20240229",
            max_tokens: 1000,
            system: SYSTEM_PROMPT,
            messages: [{ role: "user", content: message }],
        });

        const textContent = response.content.find((c) => c.type === "text");
        if (textContent && "text" in textContent) {
            return textContent.text;
        } else {
            throw new Error("Unexpected response format from Claude AI API");
        }
    } catch (error) {
        console.error("Error in getClaudeResponse:", error);
        throw error;
    }
}

// Example usage
async function main() {
    try {
        const response = await getClaudeResponse(
            "What are the key features of TypeScript?"
        );
        console.log("Claude says:", response);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Uncomment the line below to run the example
// main();
