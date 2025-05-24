import { Configuration, OpenAIApi } from 'openai';
import { AppError } from '../middleware/errorHandler';

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface SearchParams {
  query: string;
  sources?: string[];
  timeframe?: string;
  maxResults?: number;
  confidenceThreshold?: number;
}

interface InsightSource {
  title: string;
  url: string;
  type: string;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  sources: InsightSource[];
  date: string;
}

export async function searchForInnovations(params: SearchParams): Promise<Insight[]> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new AppError('OpenAI API key is not configured', 500);
    }

    // Construct the prompt for the LLM
    const prompt = constructSearchPrompt(params);
    
    // Call the OpenAI API
    const response = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL || 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert research assistant that helps identify weak signals of innovation and emerging trends. Provide insights based on the query, formatted as JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Parse the response
    const content = response.data.choices[0]?.message?.content;
    if (!content) {
      throw new AppError('No response from LLM', 500);
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/```json\\n(.+?)\\n```/s) || content.match(/```(.+?)```/s);
    let insights: Insight[];
    
    if (jsonMatch && jsonMatch[1]) {
      insights = JSON.parse(jsonMatch[1]);
    } else {
      try {
        // Try to parse the whole response as JSON
        insights = JSON.parse(content);
      } catch (e) {
        throw new AppError('Failed to parse LLM response as JSON', 500);
      }
    }

    // Filter by confidence threshold if specified
    if (params.confidenceThreshold) {
      insights = insights.filter(insight => 
        insight.confidence * 100 >= params.confidenceThreshold!
      );
    }

    // Limit results if specified
    if (params.maxResults && insights.length > params.maxResults) {
      insights = insights.slice(0, params.maxResults);
    }

    return insights;
  } catch (error) {
    console.error('Error in LLM service:', error);
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('Failed to process research query', 500);
  }
}

function constructSearchPrompt(params: SearchParams): string {
  const { query, sources = [], timeframe = 'recent' } = params;
  
  let prompt = `
  I'm looking for weak signals of innovation related to: "${query}"
  
  Please analyze available information and identify potential emerging trends, technologies, or approaches that might not be mainstream yet but show promise.
  
  ${sources.length > 0 ? `Focus on these sources: ${sources.join(', ')}` : ''}
  ${timeframe ? `Consider the timeframe: ${timeframe}` : ''}
  
  For each identified weak signal or innovation:
  1. Provide a concise title
  2. Write a detailed description explaining the innovation and its potential impact
  3. Assign a confidence score (0.0 to 1.0) based on the strength of the signal
  4. List potential sources where this signal was detected (with titles, URLs, and source types)
  5. Include the approximate date when this signal was first detected
  
  Format your response as a JSON array of insights with the following structure:
  [
    {
      "id": "unique-id",
      "title": "Innovation Title",
      "description": "Detailed description of the innovation and its potential impact...",
      "confidence": 0.85,
      "sources": [
        {
          "title": "Source Title",
          "url": "https://example.com",
          "type": "academic|news|patent|social"
        }
      ],
      "date": "YYYY-MM-DD"
    }
  ]
  `;
  
  return prompt;
}