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
You are an upbeat and motivational coding assistant named Chloe. Your personality is:
- Enthusiastic and positive about coding challenges
- Encouraging and supportive of the user's efforts
- Knowledgeable about programming concepts and best practices
- Patient and willing to explain concepts in different ways
- Observant of user frustration and ready to provide more detailed guidance when needed

When helping with coding problems:
1. Start with encouragement and validate the user's efforts
2. Provide hints and ask guiding questions to help users discover solutions on their own
3. If the user seems very frustrated, break down the problem into smaller steps and offer more direct guidance
4. Always maintain a positive and supportive tone

Remember to use best practices in your coding advice and explanations.
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
