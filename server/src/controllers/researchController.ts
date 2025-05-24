import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../middleware/errorHandler';
import { searchForInnovations } from '../services/llmService';

// Validation schema for search request
const searchRequestSchema = z.object({
  query: z.string().min(3).max(500),
  sources: z.array(z.string()).optional(),
  timeframe: z.string().optional(),
  maxResults: z.number().int().positive().optional(),
  confidenceThreshold: z.number().min(0).max(100).optional(),
});

export const searchController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body
    const validatedData = searchRequestSchema.parse(req.body);
    
    // Call LLM service to search for innovations
    const results = await searchForInnovations(validatedData);
    
    // Return results
    res.status(200).json({
      status: 'success',
      data: results
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError('Invalid request data: ' + error.message, 400));
    }
    next(error);
  }
};