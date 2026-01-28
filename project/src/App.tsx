import { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Input from './pages/Input';
import Output from './pages/Output';
import Login from './pages/Login';
import Register from './pages/Register';

type Page = 'home' | 'tools' | 'input' | 'output' | 'login' | 'register';
type Mode = 'explain' | 'summarize' | 'quiz';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedMode, setSelectedMode] = useState<Mode>('explain');
  const [inputData, setInputData] = useState<{
    topic: string;
    notes: string;
    mode: Mode;
  }>({
    topic: '',
    notes: '',
    mode: 'explain'
  });

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <Navigation
        currentPage={currentPage}
        onNavigate={(page: string) => setCurrentPage(page as Page)}
      />

      {currentPage === 'home' && (
        <Home onNavigate={(page: string) => setCurrentPage(page as Page)} />
      )}
      {currentPage === 'tools' && (
        <Tools
          onNavigate={(page: string) => setCurrentPage(page as Page)}
          onSelectTool={setSelectedMode}
        />
      )}
      {currentPage === 'login' && (
        <Login onNavigate={(page: string) => setCurrentPage(page as Page)} />
      )}
      {currentPage === 'register' && (
        <Register
          onNavigate={(page: string) => setCurrentPage(page as Page)}
        />
      )}
      {currentPage === 'input' && (
        <Input
          selectedMode={selectedMode}
          onNavigate={(page: string) => setCurrentPage(page as Page)}
          onSubmit={(data) =>
            setInputData({
              topic: data.topic,
              notes: data.notes,
              mode: data.mode as Mode
            })
          }
        />
      )}
      {currentPage === 'output' && (
        <Output
          data={inputData}
          onNavigate={(page: string) => setCurrentPage(page as Page)}
        />
      )}
    </div>
  );
}

export default App;
