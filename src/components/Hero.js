import React from 'react';

export default function Hero({ onStartPlanning, tripsCount }) {
  return (
    <section className="fade-in bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Plan Your <span className="text-yellow-300">Dream</span> Vacation
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
            Organize your travels with ease. Create detailed itineraries, manage budgets, and keep all your travel plans in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-8">
            <button
              onClick={onStartPlanning}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
            >
              Start Planning
            </button>
            <p className="text-blue-100">
              {tripsCount > 0 && (
                <>
                  <span className="font-bold text-yellow-300">{tripsCount}</span> trip
                  {tripsCount !== 1 ? 's' : ''} planned so far
                </>
              )}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-blue-300">
            <div className="text-center sm:text-left">
              <p className="text-3xl mb-2">🗺️</p>
              <p className="font-semibold">Track Destinations</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-3xl mb-2">💰</p>
              <p className="font-semibold">Manage Budget</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-3xl mb-2">📋</p>
              <p className="font-semibold">Create Itineraries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
