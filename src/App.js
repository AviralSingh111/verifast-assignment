import React, { useState, useEffect } from 'react';
import SessionList from './components/SessionList';
import ChatView from './components/ChatView';
import { ArrowLeft } from 'lucide-react';

function App() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleSelectSession = (session) => {
    setSelectedSession(session);
    if (isMobile) {
      setShowChat(true);
    }
  };

  const handleBackToList = () => {
    setShowChat(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {(!isMobile || (isMobile && !showChat)) && (
        <div className={`${isMobile ? 'w-full' : 'w-1/5'} border-r border-gray-200 overflow-y-auto`}>
          <SessionList
            onSelectSession={handleSelectSession}
            selectedSession={selectedSession}
          />
        </div>
      )}
      {(!isMobile || (isMobile && showChat)) && (
        <div className={`${isMobile ? 'w-full' : 'w-4/5'}`}>
          {selectedSession ? (
            <div className="h-full flex flex-col">
              {(
                <div className="bg-white p-4 flex items-center border-b border-gray-200">
                  {isMobile && (<button onClick={handleBackToList} className="mr-4">
                    <ArrowLeft size={24} />
                  </button>)}
                  <h2 className="text-lg font-semibold">{selectedSession.name}</h2>
                </div>
              )}
              <ChatView session={selectedSession} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;