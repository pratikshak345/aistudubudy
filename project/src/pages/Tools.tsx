import { Brain, FileText, HelpCircle, ArrowRight } from 'lucide-react';

interface ToolsProps {
  onNavigate: (page: string) => void;
  onSelectTool: (tool: 'explain' | 'summarize' | 'quiz') => void;
}

export default function Tools({ onNavigate, onSelectTool }: ToolsProps) {
  const handleToolClick = (tool: 'explain' | 'summarize' | 'quiz') => {
    onSelectTool(tool);
    onNavigate('input');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] page-transition py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Choose Your Study Tool
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Select a tool below to enhance your learning experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <button
            onClick={() => handleToolClick('explain')}
            className="group card-premium relative border-2 border-gray-800 rounded-2xl p-8 hover:border-[#1F6FEB] text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1F6FEB]/0 to-[#1F6FEB]/0 group-hover:from-[#1F6FEB]/5 group-hover:to-[#1F6FEB]/10 rounded-2xl transition-all" />

            <div className="relative">
              <div className="w-16 h-16 bg-[#1F6FEB]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1F6FEB]/20 group-hover:scale-110 transition-all">
                <Brain className="w-8 h-8 text-[#58A6FF]" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#58A6FF] transition-colors">
                Explain Topic
              </h2>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Get comprehensive AI-powered explanations for any topic you're studying.
                Perfect for understanding complex concepts.
              </p>

              <div className="flex items-center text-[#58A6FF] font-medium group-hover:translate-x-2 transition-transform">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </button>

          <button
            onClick={() => handleToolClick('summarize')}
            className="group card-premium relative border-2 border-gray-800 rounded-2xl p-8 hover:border-[#10b981] text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/0 to-[#10b981]/0 group-hover:from-[#10b981]/5 group-hover:to-[#10b981]/10 rounded-2xl transition-all" />

            <div className="relative">
              <div className="w-16 h-16 bg-[#10b981]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#10b981]/20 group-hover:scale-110 transition-all">
                <FileText className="w-8 h-8 text-[#34d399]" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#34d399] transition-colors">
                Summarize Notes
              </h2>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Transform lengthy study notes into concise, organized bullet points.
                Save time and focus on what matters most.
              </p>

              <div className="flex items-center text-[#34d399] font-medium group-hover:translate-x-2 transition-transform">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </button>

          <button
            onClick={() => handleToolClick('quiz')}
            className="group card-premium relative border-2 border-gray-800 rounded-2xl p-8 hover:border-[#14b8a6] text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#14b8a6]/0 to-[#14b8a6]/0 group-hover:from-[#14b8a6]/5 group-hover:to-[#14b8a6]/10 rounded-2xl transition-all" />

            <div className="relative">
              <div className="w-16 h-16 bg-[#14b8a6]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#14b8a6]/20 group-hover:scale-110 transition-all">
                <HelpCircle className="w-8 h-8 text-[#2dd4bf]" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#2dd4bf] transition-colors">
                Generate Quiz
              </h2>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Test your knowledge with custom multiple-choice quizzes.
                Get instant feedback and track your progress.
              </p>

              <div className="flex items-center text-[#2dd4bf] font-medium group-hover:translate-x-2 transition-transform">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
