import { Router } from 'express';
import { researchRouter } from './research';

export const apiRouter = Router();

apiRouter.use('/research', researchRouter);