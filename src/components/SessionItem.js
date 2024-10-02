import React, { forwardRef } from 'react';

const SessionItem = forwardRef(({ session, onClick, isSelected }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex items-center p-4 border-b border-gray-200 cursor-pointer ${
        isSelected ? 'bg-[#C8C8FF]' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <img
        src="/profile-picture.jpg"
        alt="Profile"
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <h3 className={`font-semibold`}>{session.name}</h3>
      </div>
    </div>
  );
});

export default SessionItem;