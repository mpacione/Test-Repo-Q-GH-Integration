import { Router } from 'express';
import { searchController } from '../controllers/researchController';

export const researchRouter = Router();

// POST /api/research/search
researchRouter.post('/search', searchController);