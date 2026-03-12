import { Brain } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1F6FEB] to-[#58A6FF] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#1F6FEB]/50 transition-all">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-[#58A6FF] bg-clip-text text-transparent group-hover:from-[#58A6FF] group-hover:to-[#7d5ff5] transition-all">
              AI Study Buddy
            </span>
          </div>

          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-all relative ${
                currentPage === 'home'
                  ? 'text-[#58A6FF]'
                  : 'text-gray-400 hover:text-white'
              } ${currentPage === 'home' ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#1F6FEB] after:to-[#58A6FF]' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('tools')}
              className={`text-sm font-medium transition-all relative ${
                currentPage === 'tools'
                  ? 'text-[#58A6FF]'
                  : 'text-gray-400 hover:text-white'
              } ${currentPage === 'tools' ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#1F6FEB] after:to-[#58A6FF]' : ''}`}
            >
              Tools
            </button>
            <button
  onClick={() => onNavigate("history")}
  className="text-gray-300 hover:text-white"
>
  History
</button>
            <button
              onClick={() => onNavigate('login')}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="button-premium px-5 py-2 bg-gradient-to-r from-[#1F6FEB] to-[#58A6FF] text-white rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-[#1F6FEB]/50"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
