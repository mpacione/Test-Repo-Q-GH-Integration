import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface InsightItem {
  id: number;
  title: string;
  description: string;
  confidence: number;
  sources: {
    title: string;
    url: string;
    type: string;
  }[];
  date: string;
}

export default function Results() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<InsightItem[]>([]);

  useEffect(() => {
    // In a real app, this would fetch data from the API
    const fetchResults = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockInsights: InsightItem[] = [
          {
            id: 1,
            title: 'Novel approach to quantum error correction',
            description: 'Researchers at MIT have developed a new approach to quantum error correction that could significantly reduce the number of physical qubits needed for fault-tolerant quantum computing.',
            confidence: 0.85,
            sources: [
              { title: 'Quantum Computing Progress Report', url: 'https://example.com/quantum-report', type: 'academic' },
              { title: 'MIT Technology Review', url: 'https://example.com/mit-tech', type: 'news' }
            ],
            date: '2023-06-15'
          },
          {
            id: 2,
            title: 'Emerging trend in sustainable battery materials',
            description: 'Multiple research groups are exploring sodium-based battery technologies as an alternative to lithium-ion batteries, potentially addressing resource constraints.',
            confidence: 0.72,
            sources: [
              { title: 'Journal of Energy Storage', url: 'https://example.com/energy-storage', type: 'academic' },
              { title: 'Battery Innovation Patent', url: 'https://example.com/battery-patent', type: 'patent' }
            ],
            date: '2023-05-28'
          },
          {
            id: 3,
            title: 'AI-driven drug discovery gaining momentum',
            description: 'Several pharmaceutical startups are leveraging large language models to accelerate drug discovery processes, particularly for rare diseases.',
            confidence: 0.91,
            sources: [
              { title: 'Nature Biotechnology', url: 'https://example.com/nature-biotech', type: 'academic' },
              { title: 'Pharma Industry Report', url: 'https://example.com/pharma-report', type: 'news' },
              { title: 'AI Drug Discovery Conference', url: 'https://example.com/ai-drug-conf', type: 'social' }
            ],
            date: '2023-07-03'
          }
        ];
        
        setInsights(mockInsights);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-green-100 text-green-800';
    if (confidence >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getSourceBadgeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'news': return 'bg-purple-100 text-purple-800';
      case 'patent': return 'bg-green-100 text-green-800';
      case 'social': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Research Results</h1>
        {query && (
          <p className="mt-2 text-sm text-gray-500">
            Results for: <span className="font-medium">{query}</span>
          </p>
        )}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-500">Analyzing data and generating insights...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {insights.map((insight) => (
              <div key={insight.id} className="card">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-medium text-gray-900">{insight.title}</h2>
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getConfidenceColor(insight.confidence)}`}
                  >
                    {Math.round(insight.confidence * 100)}% confidence
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">{insight.description}</p>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700">Sources:</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {insight.sources.map((source, idx) => (
                      <a
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSourceBadgeColor(source.type)}`}>
                          {source.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  Identified on {insight.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}