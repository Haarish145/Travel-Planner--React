import React, { useState } from 'react';

export default function AddTripForm({ onAddTrip, onCancel }) {
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    startDate: '',
    budget: '',
    category: 'adventure',
    itinerary: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'Duration must be a positive number';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = 'Budget must be a positive number';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      onAddTrip(formData);
      setFormData({
        destination: '',
        duration: '',
        startDate: '',
        budget: '',
        category: 'adventure',
        itinerary: '',
        notes: '',
      });
    } else {
      setErrors(newErrors);
    }
  };

  const categories = ['adventure', 'relaxation', 'cultural', 'business', 'family', 'road-trip'];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Create New Trip</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Destination */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Destination *
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="e.g., Paris, Tokyo, New York"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.destination ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Duration (days) *
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 7"
            min="1"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.duration ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Budget ($) *
          </label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="e.g., 5000"
            min="1"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.budget ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Trip Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Itinerary */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Itinerary Details
        </label>
        <textarea
          name="itinerary"
          value={formData.itinerary}
          onChange={handleChange}
          placeholder="Describe your travel plans, activities, and highlights for each day..."
          rows="5"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any additional information, reminders, or bookings..."
          rows="3"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
        >
          Create Trip
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
