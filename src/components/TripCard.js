import React, { useState } from 'react';

export default function TripCard({ trip, onDelete, onViewDetails }) {
  const [showMenu, setShowMenu] = useState(false);

  const getEmoji = (category) => {
    const emojis = {
      adventure: '🏔️',
      relaxation: '🏖️',
      cultural: '🏛️',
      business: '💼',
      family: '👨‍👩‍👧‍👦',
      'road-trip': '🚗',
    };
    return emojis[category] || '✈️';
  };

  const daysUntilTrip = () => {
    const today = new Date();
    const tripDate = new Date(trip.startDate);
    const difference = tripDate - today;
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return days;
  };

  const days = daysUntilTrip();

  return (
    <div className="fade-in bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white relative">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-4xl mb-2">{getEmoji(trip.category)}</div>
            <h3 className="text-2xl font-bold">{trip.destination}</h3>
            <p className="text-blue-100 text-sm">{trip.category.replace('-', ' ').toUpperCase()}</p>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded transition relative"
          >
            ⋮
          </button>
          {showMenu && (
            <div className="absolute right-4 top-12 bg-white text-gray-800 rounded-lg shadow-lg z-10 min-w-max">
              <button
                onClick={() => {
                  onViewDetails(trip);
                  setShowMenu(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Delete this trip?')) {
                    onDelete(trip.id);
                  }
                  setShowMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Trip Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 font-semibold">DURATION</p>
            <p className="text-xl font-bold text-blue-600">{trip.duration} days</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 font-semibold">BUDGET</p>
            <p className="text-xl font-bold text-green-600">${trip.budget}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg col-span-2">
            <p className="text-xs text-gray-600 font-semibold">START DATE</p>
            <p className="text-sm font-bold text-purple-600">{trip.startDate}</p>
          </div>
        </div>

        {/* Days Until Trip */}
        <div className={`p-3 rounded-lg text-center font-semibold ${
          days > 0
            ? 'bg-yellow-50 text-yellow-700'
            : days === 0
            ? 'bg-red-50 text-red-700'
            : 'bg-gray-50 text-gray-700'
        }`}>
          {days > 0
            ? `${days} day${days !== 1 ? 's' : ''} away`
            : days === 0
            ? 'Today!'
            : `Trip was ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} ago`}
        </div>

        {/* Itinerary Preview */}
        {trip.itinerary && (
          <div>
            <p className="text-xs text-gray-600 font-semibold mb-1">ITINERARY</p>
            <p className="text-sm text-gray-700 line-clamp-2">{trip.itinerary}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <button
            onClick={() => onViewDetails(trip)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            View Details
          </button>
          <button
            onClick={() => {
              if (window.confirm('Delete this trip?')) {
                onDelete(trip.id);
              }
            }}
            className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
