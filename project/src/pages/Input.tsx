import { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';

interface InputProps {
  selectedMode: 'explain' | 'summarize' | 'quiz';
  onNavigate: (page: string) => void;
  onSubmit: (data: { topic: string; notes: string; mode: string }) => void;
}

export default function Input({ selectedMode, onNavigate, onSubmit }: InputProps) {
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');
  const [mode, setMode] = useState(selectedMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() || notes.trim()) {
      onSubmit({ topic, notes, mode });
      onNavigate('output');
    }
  };

  const getModeConfig = () => {
    switch (mode) {
      case 'explain':
        return {
          title: 'Explain a Topic',
          description: 'Enter a topic you want to understand better',
          placeholder: 'e.g., Photosynthesis, Quantum Mechanics, Neural Networks',
          accentColor: '#1F6FEB',
        };
      case 'summarize':
        return {
          title: 'Summarize Your Notes',
          description: 'Paste your notes to get a concise summary',
          placeholder: 'e.g., The mitochondria is the powerhouse of the cell...',
          accentColor: '#10b981',
        };
      case 'quiz':
        return {
          title: 'Generate a Quiz',
          description: 'Enter a topic to create practice questions',
          placeholder: 'e.g., World War II, Python Programming, Cell Biology',
          accentColor: '#14b8a6',
        };
    }
  };

  const config = getModeConfig();

  return (
    <div className="min-h-[calc(100vh-64px)] page-transition py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('tools')}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Tools
        </button>

        <div className="card-premium rounded-2xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{config.title}</h1>
            <p className="text-gray-400">{config.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-gray-300 mb-2">
                Study Mode
              </label>
              <select
                id="mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as 'explain' | 'summarize' | 'quiz')}
                className="w-full px-4 py-3 bg-[#0D1117] border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent transition-all hover:border-gray-600"
              >
                <option value="explain">Explain Topic</option>
                <option value="summarize">Summarize Notes</option>
                <option value="quiz">Generate Quiz</option>
              </select>
            </div>

            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
                Topic
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={config.placeholder}
                className="w-full px-4 py-3 bg-[#0D1117] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent transition-all hover:border-gray-600"
              />
            </div>

            {mode === 'summarize' && (
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Paste your study notes here..."
                  rows={8}
                  className="w-full px-4 py-3 bg-[#0D1117] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#10b981] focus:border-transparent transition-all hover:border-gray-600 resize-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={!topic.trim() && !notes.trim()}
              className="button-premium w-full px-6 py-4 bg-gradient-to-r from-[#1F6FEB] to-[#58A6FF] text-white rounded-xl font-semibold text-lg transition-all hover:shadow-2xl hover:shadow-[#1F6FEB]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center space-x-2"
            >
              <span>Process</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="mt-8 glass-morphism rounded-xl p-6">
          <h3 className="text-sm font-semibold text-white mb-3">Tips for Best Results</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start">
              <span className="text-[#58A6FF] mr-2">•</span>
              <span>Be specific with your topic for more detailed explanations</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58A6FF] mr-2">•</span>
              <span>For summaries, paste complete notes for better context</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#58A6FF] mr-2">•</span>
              <span>Quiz questions work best with focused, single topics</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
