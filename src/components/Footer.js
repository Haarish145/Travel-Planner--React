import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-100 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✈️</span>
              <h3 className="text-xl font-bold text-white">TravelPlanner</h3>
            </div>
            <p className="text-gray-400">
              Your personal travel companion for creating unforgettable adventures.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => {}} className="hover:text-blue-400 transition bg-none border-none p-0 cursor-pointer text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => {}} className="hover:text-blue-400 transition bg-none border-none p-0 cursor-pointer text-left">
                  Create Trip
                </button>
              </li>
              <li>
                <button onClick={() => {}} className="hover:text-blue-400 transition bg-none border-none p-0 cursor-pointer text-left">
                  My Trips
                </button>
              </li>
              <li>
                <button onClick={() => {}} className="hover:text-blue-400 transition bg-none border-none p-0 cursor-pointer text-left">
                  Help
                </button>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📍 Track Destinations</li>
              <li>💰 Budget Management</li>
              <li>📋 Detailed Itineraries</li>
              <li>💾 Local Storage</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              &copy; {currentYear} TravelPlanner. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-400">
              <button onClick={() => {}} className="hover:text-blue-400 transition bg-none border-none p-0 cursor-pointer">
                Privacy Policy
              </button>
              <button onClick={() => {}} className="hover:text-blue-400 transition bg-none border-none p-0 cursor-pointer">
                Terms of Service
              </button>
              <button onClick={() => {}} className="hover:text-blue-400 transition bg-none border-none p-0 cursor-pointer">
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 pt-8 border-t border-gray-700 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-400">📱</p>
            <p className="text-gray-400 text-sm">Mobile Friendly</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">🔒</p>
            <p className="text-gray-400 text-sm">Secure & Private</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-400">⚡</p>
            <p className="text-gray-400 text-sm">Fast & Reliable</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
