import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="glass p-8 text-center">
      <h1 className="text-4xl font-light mb-3 text-gray-800">
        Roast My Pic
      </h1>
      <p className="text-gray-600 font-light text-lg">
        Get your images hilariously roasted by AI
      </p>
    </header>
  );
};

export default Header;