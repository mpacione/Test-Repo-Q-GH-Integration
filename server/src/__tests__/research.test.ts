import request from 'supertest';
import app from '../index';
import { searchForInnovations } from '../services/llmService';

// Mock the LLM service
jest.mock('../services/llmService');
const mockSearchForInnovations = searchForInnovations as jest.MockedFunction<typeof searchForInnovations>;

describe('Research API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should validate the request body', async () => {
    const response = await request(app)
      .post('/api/research/search')
      .send({ query: '' }); // Empty query should fail validation
    
    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
  });

  it('should return search results', async () => {
    const mockResults = [
      {
        id: '1',
        title: 'Test Innovation',
        description: 'This is a test innovation',
        confidence: 0.85,
        sources: [
          {
            title: 'Test Source',
            url: 'https://example.com',
            type: 'academic'
          }
        ],
        date: '2023-07-15'
      }
    ];

    mockSearchForInnovations.mockResolvedValue(mockResults);

    const response = await request(app)
      .post('/api/research/search')
      .send({
        query: 'test innovation',
        sources: ['academic'],
        timeframe: 'last-year'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toEqual(mockResults);
    expect(mockSearchForInnovations).toHaveBeenCalledWith({
      query: 'test innovation',
      sources: ['academic'],
      timeframe: 'last-year'
    });
  });
});