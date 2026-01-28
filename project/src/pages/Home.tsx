import { ArrowRight, Sparkles, BookOpen, Brain } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-[calc(100vh-64px)] page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center space-x-2 bg-[#1F6FEB]/10 border border-[#1F6FEB]/30 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#58A6FF]" />
            <span className="text-sm text-[#58A6FF] font-medium">Powered by AI</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Your Personal
            <span className="block bg-gradient-to-r from-[#1F6FEB] to-[#58A6FF] bg-clip-text text-transparent">
              AI Study Companion
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Master any subject with AI-powered explanations, smart note summaries,
            and interactive quizzes. Study smarter, not harder.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('tools')}
              className="button-premium group px-8 py-4 bg-gradient-to-r from-[#1F6FEB] to-[#58A6FF] text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-[#1F6FEB]/60 flex items-center space-x-2"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('tools')}
              className="neon-border px-8 py-4 text-white rounded-xl font-semibold text-lg flex items-center space-x-2"
            >
              Explore Tools
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <div className="card-premium rounded-2xl p-8 group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#1F6FEB]/20 to-[#58A6FF]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:from-[#1F6FEB]/30 group-hover:to-[#58A6FF]/20 transition-all">
              <Brain className="w-7 h-7 text-[#58A6FF] group-hover:text-[#7d5ff5] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Explain Topics</h3>
            <p className="text-gray-400 leading-relaxed">
              Get clear, detailed explanations for any topic you're struggling to understand.
            </p>
          </div>

          <div className="card-premium rounded-2xl p-8 group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#10b981]/20 to-[#34d399]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:from-[#10b981]/30 group-hover:to-[#34d399]/20 transition-all">
              <BookOpen className="w-7 h-7 text-[#34d399] group-hover:text-[#7d5ff5] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Summarize Notes</h3>
            <p className="text-gray-400 leading-relaxed">
              Transform lengthy notes into concise, easy-to-review bullet points.
            </p>
          </div>

          <div className="card-premium rounded-2xl p-8 group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#14b8a6]/20 to-[#2dd4bf]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:from-[#14b8a6]/30 group-hover:to-[#2dd4bf]/20 transition-all">
              <Sparkles className="w-7 h-7 text-[#2dd4bf] group-hover:text-[#7d5ff5] transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Generate Quizzes</h3>
            <p className="text-gray-400 leading-relaxed">
              Test your knowledge with AI-generated multiple choice questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
