import React, { useState } from 'react';
import TripCard from './TripCard';

export default function TripsList({ trips, onDelete, onViewDetails }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredTrips = filter === 'all' ? trips : trips.filter((trip) => trip.category === filter);

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'oldest') return a.id - b.id;
    if (sortBy === 'destination') return a.destination.localeCompare(b.destination);
    if (sortBy === 'budget-high') return parseFloat(b.budget) - parseFloat(a.budget);
    if (sortBy === 'budget-low') return parseFloat(a.budget) - parseFloat(b.budget);
    return 0;
  });

  const categories = ['all', 'adventure', 'relaxation', 'cultural', 'business', 'family', 'road-trip'];

  return (
    <div className="space-y-8">
      {/* Filters and Sort */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Filter & Sort</h3>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  filter === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="destination">Destination (A-Z)</option>
            <option value="budget-high">Budget (High to Low)</option>
            <option value="budget-low">Budget (Low to High)</option>
          </select>
        </div>
      </div>

      {/* Trips Grid */}
      {sortedTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onDelete={onDelete}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">No trips found in this category.</p>
        </div>
      )}
    </div>
  );
}
