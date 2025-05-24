import { useState } from 'react';

export default function Settings() {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4');
  const [confidenceThreshold, setConfidenceThreshold] = useState(70);
  const [maxResults, setMaxResults] = useState(10);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // In a real app, this would save to the API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-500">
          Configure your research preferences and API settings.
        </p>
      </div>

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* API Settings */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">LLM API Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                  API Key
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    id="apiKey"
                    name="apiKey"
                    className="input"
                    placeholder="Enter your OpenAI API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Your API key is stored securely and never shared.
                </p>
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                  LLM Model
                </label>
                <select
                  id="model"
                  name="model"
                  className="mt-1 input"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-2">Claude 2</option>
                  <option value="llama-2">Llama 2</option>
                </select>
              </div>
            </div>
          </div>

          {/* Research Settings */}
          <div className="card">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Research Settings</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="confidenceThreshold" className="block text-sm font-medium text-gray-700">
                  Confidence Threshold ({confidenceThreshold}%)
                </label>
                <div className="mt-1">
                  <input
                    type="range"
                    id="confidenceThreshold"
                    name="confidenceThreshold"
                    min="0"
                    max="100"
                    step="5"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Only show insights with confidence above this threshold.
                </p>
              </div>

              <div>
                <label htmlFor="maxResults" className="block text-sm font-medium text-gray-700">
                  Maximum Results
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="maxResults"
                    name="maxResults"
                    className="input"
                    min="1"
                    max="50"
                    value={maxResults}
                    onChange={(e) => setMaxResults(parseInt(e.target.value))}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Maximum number of insights to return per search.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end">
            {saved && (
              <span className="mr-4 text-sm text-green-600">Settings saved successfully!</span>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}