import React from 'react';

function Message({ message }) {
  const isUser = message.action === 'USER';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
          isUser ? 'bg-[#2E3B5B] text-white' : 'bg-[#000929] text-white'
        }`}
      >
        <p>{message.content}</p>

      </div>

    </div>
  );
}


export default Message;