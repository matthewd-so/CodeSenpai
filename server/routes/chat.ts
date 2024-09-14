import express from "express"

const chat = express.Router()

// general chat to llm
chat.post('/`', async (req, res) => {
    
});

// parse user data with llm and send to db
chat.post('/user`', async (req, res) => {
    // 
});

export default chat;



import { Anthropic } from '@anthropic-ai/sdk';

const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;

if (!apiKey) {
  console.error('Anthropic API key is not set. Please check your environment configuration.');
  throw new Error('API key is required');
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

export const getClaudeResponse = async (message: string): Promise<string> => {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [
        { role: 'assistant', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
    });

    console.log('Usage:', response.usage);

    const textContent = response.content.find(c => c.type === 'text');
    if (textContent && 'text' in textContent) {
      return textContent.text;
    } else {
      throw new Error('Unexpected response format from Claude AI API');
    }
  } catch (error) {
    if (error instanceof Anthropic.APIError) {
      console.error('API Error:', error.status, error.name, error.message);
      console.error('Error details:', error.error);
      if (error.name === 'AuthenticationError') {
        throw new Error('There was an authentication error. Please check your API key.');
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error("I apologize, but I'm having trouble connecting right now. Please try again later, and don't worry - we'll solve your coding challenge together!");
  }
};

// Example usage
async function main() {
  try {
    const response = await getClaudeResponse('What are the key features of TypeScript?');
    console.log('Claude says:', response);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Uncomment the line below to run the example
// main();