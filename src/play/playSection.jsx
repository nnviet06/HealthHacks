import React, { useState } from 'react';
import { History, X } from 'lucide-react';

export default function KnowledgeTestGame() {
  const [showHistory, setShowHistory] = useState(false);
  const [errorHistory, setErrorHistory] = useState([
    { id: 1, question: 'What is the capital of France?', yourAnswer: 'London', correctAnswer: 'Paris', date: '2025-10-03' },
    { id: 2, question: 'What is 15 × 8?', yourAnswer: '110', correctAnswer: '120', date: '2025-10-02' },
  ]);

  const handleStartTest = async () => {
    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'start_test'
        })
      });
      
      const data = await response.json();
      console.log('API Response:', data);
      
      // Handle your API response here
      alert('Test started! Check console for API response.');
      
    } catch (error) {
      console.error('API Error:', error);
      alert('Starting test... (Replace YOUR_API_ENDPOINT_HERE with your actual API)');
    }
  };

  const removeFromHistory = (id) => {
    setErrorHistory(errorHistory.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* History Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <History size={20} />
            History of error
          </button>
        </div>

        {/* Main Test Button - Big Rectangle */}
        <div className="mb-8">
          <button
            onClick={handleStartTest}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] overflow-hidden relative group"
            style={{ minHeight: '400px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <h1 className="text-6xl font-bold tracking-wide">
                Test your knowledge
              </h1>
            </div>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl"></div>
            </div>
          </button>
          <p className="text-center text-gray-400 mt-4 text-sm">
            Click the button above to start testing your knowledge
          </p>
        </div>

        {/* Error History Panel */}
        {showHistory && (
          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <History size={28} />
                Error History
              </h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <p className="text-gray-400 mb-6">
              When you press it, you will see the history of errors
            </p>

            <div className="space-y-4">
              {errorHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No errors yet! Great job!</p>
              ) : (
                errorHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-red-900/50 rounded-xl p-5 hover:border-red-700/50 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-white text-lg mb-3">{item.question}</p>
                        <div className="space-y-2 text-sm">
                          <p className="text-red-400">
                            <span className="font-medium">Your answer:</span> {item.yourAnswer}
                          </p>
                          <p className="text-green-400">
                            <span className="font-medium">Correct answer:</span> {item.correctAnswer}
                          </p>
                          <p className="text-gray-500 text-xs mt-3">{item.date}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromHistory(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors ml-4"
                      >
                        <X size={22} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}