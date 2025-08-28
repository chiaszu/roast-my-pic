import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="glass p-6 text-center text-white">
      <h1 className="text-4xl font-light mb-2">
        AI Vision
      </h1>
      <p className="text-white/70 font-light">
        Minimal image analysis with artificial intelligence
      </p>
    </header>
  );
};

export default Header;