'use client'
import { useState } from 'react';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [generatedQuote, setGeneratedQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setGeneratedQuote(''); // Clear previous quote
    setError(''); // Clear previous error

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: text.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData.message || 'Failed to generate quote');
      }

      const data = await response.text();
      setGeneratedQuote(data.quote);
    } catch (err) {
      console.error("Error fetching quote:", err);
      setError(err.message || 'Something went wrong while generating the quote.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Daily Motivation Generator</h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label htmlFor="goal" className="block text-gray-700 text-sm font-bold mb-2">
              Enter your goal or struggle:
            </label>
            <input
              type="text"
              id="goal"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., stay focused on work"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Motivation'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-1">{error}</span>
          </div>
        )}

        {generatedQuote && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-6">
            <p className="text-lg italic text-gray-700">
              " {generatedQuote} "
            </p>
          </div>
        )}
      </div>
    </div>
  );
}