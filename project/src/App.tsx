import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Input from './pages/Input';
import Output from './pages/Output';
import Login from './pages/Login';
import Register from './pages/Register';
import History from "./pages/History";

type Page = 'home' | 'tools' | 'input' | 'output' | 'login' | 'register' | 'history';
type Mode = 'explain' | 'summarize' | 'quiz';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [selectedMode, setSelectedMode] = useState<Mode>('explain');

  const [inputData, setInputData] = useState({
    topic: '',
    notes: '',
    mode: 'explain' as Mode
  });

  // URL detection
  useEffect(() => {
    const path = window.location.pathname.replace("/", "");
  
    if (path === "login") setCurrentPage("login");
    else if (path === "register") setCurrentPage("register");
    else if (path === "tools") setCurrentPage("tools");
    else if (path === "history") setCurrentPage("history");
    else setCurrentPage("login");
  }, []);

  const navigate = (page: string) => {
    window.history.pushState({}, "", "/" + page);
    setCurrentPage(page as Page);
  };

  return (
    <div className="min-h-screen bg-[#0D1117]">

      {/* Hide Navbar on Login & Register */}
      {currentPage !== "login" && currentPage !== "register" && (
        <Navigation
          currentPage={currentPage}
          onNavigate={navigate}
        />
      )}

      {currentPage === 'home' && (
        <Home onNavigate={navigate} />
      )}

      {currentPage === 'tools' && (
        <Tools
          onNavigate={navigate}
          onSelectTool={setSelectedMode}
        />
      )}

      {currentPage === 'login' && (
        <Login onNavigate={navigate} />
      )}

      {currentPage === 'register' && (
        <Register onNavigate={navigate} />
      )}

      {currentPage === 'input' && (
        <Input
          selectedMode={selectedMode}
          onNavigate={navigate}
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
          onNavigate={navigate}
        />
      )}
      {currentPage === "history" && (
  <History />
)}

    </div>
  );
}

export default App;