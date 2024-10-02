import React from 'react';
import Message from './Message';

function ChatView({ session }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-y-auto p-4">
        {session.messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
    </div>
  );
}

export default ChatView;