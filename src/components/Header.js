import React, { useState } from 'react';

export default function Header({ onViewChange, currentView }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="slide-in-down bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('home')}>
            <div className="text-3xl">✈️</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">
              Travel<span className="text-indigo-600">Planner</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => onViewChange('home')}
              className={`font-semibold transition ${
                currentView === 'home' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onViewChange('home')}
              className={`font-semibold transition ${
                currentView === 'trips' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              My Trips
            </button>
            <button
              onClick={() => onViewChange('home')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              New Trip
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-blue-600 text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <nav className="flex flex-col gap-3">
              <button
                onClick={() => {
                  onViewChange('home');
                  setIsMenuOpen(false);
                }}
                className="block text-left px-4 py-2 text-gray-600 hover:text-blue-600 font-semibold"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onViewChange('home');
                  setIsMenuOpen(false);
                }}
                className="block text-left px-4 py-2 text-gray-600 hover:text-blue-600 font-semibold"
              >
                My Trips
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                New Trip
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
