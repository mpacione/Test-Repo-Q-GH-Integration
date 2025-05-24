import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Research() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [sources, setSources] = useState<string[]>(['academic', 'news', 'patents']);
  const [timeframe, setTimeframe] = useState('last-year');
  const [loading, setLoading] = useState(false);

  const handleSourceToggle = (source: string) => {
    if (sources.includes(source)) {
      setSources(sources.filter(s => s !== source));
    } else {
      setSources([...sources, source]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setLoading(true);
    
    // In a real app, this would call the API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to results page with query parameters
      navigate(`/results?query=${encodeURIComponent(query)}&sources=${sources.join(',')}&timeframe=${timeframe}`);
    } catch (error) {
      console.error('Error submitting research query:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Research</h1>
        <p className="mt-2 text-sm text-gray-500">
          Use our LLM-powered research tool to discover weak signals of innovation across the web.
        </p>
      </div>

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Research Query */}
          <div>
            <label htmlFor="query" className="block text-sm font-medium text-gray-700">
              Research Query
            </label>
            <div className="mt-1">
              <textarea
                id="query"
                name="query"
                rows={4}
                className="input"
                placeholder="Describe the innovation area or technology you want to research..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Be specific about the signals or innovations you're looking for.
            </p>
          </div>

          {/* Sources */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Sources</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="academic"
                  name="sources"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={sources.includes('academic')}
                  onChange={() => handleSourceToggle('academic')}
                />
                <label htmlFor="academic" className="ml-3 text-sm text-gray-700">
                  Academic Papers
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="news"
                  name="sources"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={sources.includes('news')}
                  onChange={() => handleSourceToggle('news')}
                />
                <label htmlFor="news" className="ml-3 text-sm text-gray-700">
                  News Articles
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="patents"
                  name="sources"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={sources.includes('patents')}
                  onChange={() => handleSourceToggle('patents')}
                />
                <label htmlFor="patents" className="ml-3 text-sm text-gray-700">
                  Patents
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="social"
                  name="sources"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={sources.includes('social')}
                  onChange={() => handleSourceToggle('social')}
                />
                <label htmlFor="social" className="ml-3 text-sm text-gray-700">
                  Social Media
                </label>
              </div>
            </div>
          </div>

          {/* Timeframe */}
          <div>
            <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">
              Timeframe
            </label>
            <select
              id="timeframe"
              name="timeframe"
              className="mt-1 input"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="last-month">Last Month</option>
              <option value="last-6-months">Last 6 Months</option>
              <option value="last-year">Last Year</option>
              <option value="last-3-years">Last 3 Years</option>
              <option value="last-5-years">Last 5 Years</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full sm:w-auto"
              disabled={loading || !query.trim()}
            >
              {loading ? 'Searching...' : 'Start Research'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}