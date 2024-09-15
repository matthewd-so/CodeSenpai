import { Anthropic } from "@anthropic-ai/sdk";
import React, { useEffect } from 'react';

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
`;

interface ClaudeChatProps {
    input: string;
    problemTitle: string;
    currentSolution: string;
    problemDescription: string;
    onResponse: (response: string) => void;
}

export const ClaudeChat: React.FC<ClaudeChatProps> = ({ 
    input, 
    problemTitle, 
    currentSolution, 
    problemDescription,
    onResponse 
}) => {
    useEffect(() => {
        const fetchResponse = async () => {
            try {
                const contextMessage = `
Problem: ${problemTitle}
Description: ${problemDescription}
Current Solution:
${currentSolution}

User Message: ${input}`;

                const response = await getClaudeResponse(contextMessage);
                onResponse(response);
            } catch (error) {
                console.error('Error fetching Claude response:', error);
                onResponse('Sorry, I encountered an error. Please try again.');
            }
        };

        if (input) {
            fetchResponse();
        }
    }, [input, problemTitle, currentSolution, problemDescription, onResponse]);

    return null; // This component doesn't render anything
};

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