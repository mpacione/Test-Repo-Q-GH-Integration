import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [recentSearches] = useState([
    { id: 1, query: 'Emerging battery technologies', date: '2023-07-15' },
    { id: 2, query: 'Sustainable agriculture innovations', date: '2023-07-14' },
    { id: 3, query: 'AI in healthcare diagnostics', date: '2023-07-12' },
  ]);

  const [savedInsights] = useState([
    { 
      id: 1, 
      title: 'Potential breakthrough in quantum computing', 
      description: 'Early signals suggest a new approach to quantum error correction that could accelerate practical quantum computing.',
      date: '2023-07-10',
      sources: 3
    },
    { 
      id: 2, 
      title: 'Novel materials for solar energy', 
      description: 'Research from multiple universities points to new materials that could significantly improve solar panel efficiency.',
      date: '2023-07-08',
      sources: 5
    },
  ]);

  return (
    <div>
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <Link
            to="/research"
            className="btn btn-primary"
          >
            New Research
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Searches */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Searches</h2>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentSearches.map((search) => (
                <li key={search.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-600 truncate">{search.query}</p>
                      <p className="text-sm text-gray-500">{search.date}</p>
                    </div>
                    <div>
                      <Link
                        to={`/results?query=${encodeURIComponent(search.query)}`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
                      >
                        View Results
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <Link to="/research" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all searches
            </Link>
          </div>
        </div>

        {/* Saved Insights */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Saved Insights</h2>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {savedInsights.map((insight) => (
                <li key={insight.id} className="py-4">
                  <div>
                    <h3 className="text-sm font-medium text-primary-600">{insight.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{insight.description}</p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <span>{insight.date}</span>
                      <span className="mx-1">&middot;</span>
                      <span>{insight.sources} sources</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <Link to="/results" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}