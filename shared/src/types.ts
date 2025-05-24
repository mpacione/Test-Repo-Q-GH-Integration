// Research types
export interface ResearchQuery {
  query: string;
  sources?: string[];
  timeframe?: string;
  maxResults?: number;
  confidenceThreshold?: number;
}

export interface InsightSource {
  title: string;
  url: string;
  type: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  sources: InsightSource[];
  date: string;
}

export interface ResearchResponse {
  status: 'success' | 'error';
  data?: Insight[];
  message?: string;
}

// API response types
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

// Settings types
export interface UserSettings {
  apiKey?: string;
  model: string;
  confidenceThreshold: number;
  maxResults: number;
}