# Code Examples & API Reference - TravelPlanner

## 📚 Component API Reference

### App.js - Main Component

```javascript
// State Management
const [trips, setTrips] = useState([]);           // All trips
const [showForm, setShowForm] = useState(false);  // Form visibility
const [currentView, setCurrentView] = useState('home'); // Current page
const [selectedTrip, setSelectedTrip] = useState(null); // Selected trip

// Core Functions
handleAddTrip(newTrip)        // Add new trip
handleDeleteTrip(id)          // Delete trip by ID
handleEditTrip(id, updates)   // Update trip
```

---

## 🎯 Working with Trips

### Creating a Trip
```javascript
const handleAddTrip = (newTrip) => {
  const trip = {
    ...newTrip,
    id: Date.now(),  // Unique ID
    createdAt: new Date().toLocaleDateString(),
  };
  setTrips([trip, ...trips]);
  setShowForm(false);
  // Auto-saves to localStorage
};
```

### Trip Object Format
```javascript
{
  id: 1234567890,
  destination: "Tokyo",
  duration: 10,
  startDate: "2025-12-25",
  budget: 5000,
  category: "adventure",
  itinerary: "Day 1: Arrive at Tokyo...",
  notes: "Remember passport!",
  createdAt: "11/12/2025"
}
```

### Filtering Trips
```javascript
// Filter by category
const filteredTrips = trips.filter(trip => trip.category === 'adventure');

// Filter by budget range
const budgetTrips = trips.filter(trip => trip.budget <= 3000);

// Filter by destination (search)
const searchTrips = trips.filter(trip => 
  trip.destination.toLowerCase().includes('paris')
);
```

### Sorting Trips
```javascript
// Sort by newest first
trips.sort((a, b) => b.id - a.id);

// Sort by destination A-Z
trips.sort((a, b) => a.destination.localeCompare(b.destination));

// Sort by budget high to low
trips.sort((a, b) => b.budget - a.budget);

// Sort by start date
trips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
```

---

## 💾 localStorage API

### Save Trips
```javascript
useEffect(() => {
  localStorage.setItem('trips', JSON.stringify(trips));
}, [trips]);
```

### Load Trips
```javascript
useEffect(() => {
  const savedTrips = localStorage.getItem('trips');
  if (savedTrips) {
    setTrips(JSON.parse(savedTrips));
  }
}, []);
```

### Clear All Trips
```javascript
const clearAllTrips = () => {
  if (window.confirm('Delete all trips?')) {
    localStorage.removeItem('trips');
    setTrips([]);
  }
};
```

### Export Trips as JSON
```javascript
const exportTrips = () => {
  const dataStr = JSON.stringify(trips, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'trips.json';
  link.click();
};
```

---

## 🎨 Component Examples

### Using Header Component
```javascript
<Header 
  onViewChange={setCurrentView}  // Function to change view
  currentView={currentView}       // Current view name
/>
```

### Using AddTripForm Component
```javascript
<AddTripForm 
  onAddTrip={handleAddTrip}      // Callback when trip created
  onCancel={() => setShowForm(false)}  // Callback to close
/>
```

### Using TripsList Component
```javascript
<TripsList
  trips={trips}                  // Array of trips
  onDelete={handleDeleteTrip}    // Delete callback
  onViewDetails={(trip) => {}}   // View details callback
/>
```

### Using TripCard Component
```javascript
<TripCard
  trip={trip}                    // Trip object
  onDelete={handleDeleteTrip}    // Delete callback
  onViewDetails={handleViewDetails}  // Details callback
/>
```

---

## ✅ Form Validation

### Validate Form Data
```javascript
const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.destination.trim()) {
    errors.destination = 'Destination is required';
  }
  
  if (!formData.duration || formData.duration <= 0) {
    errors.duration = 'Duration must be positive';
  }
  
  if (!formData.startDate) {
    errors.startDate = 'Start date is required';
  }
  
  if (!formData.budget || formData.budget <= 0) {
    errors.budget = 'Budget must be positive';
  }
  
  return errors;
};
```

### Show Form Errors
```javascript
{errors.destination && (
  <p className="text-red-500 text-sm mt-1">
    {errors.destination}
  </p>
)}
```

---

## 🎨 Styling with Tailwind

### Common Patterns
```javascript
// Container with padding
<div className="container mx-auto px-4 py-8">

// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Gradient backgrounds
<div className="bg-gradient-to-r from-blue-500 to-indigo-600">

// Responsive text sizes
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">

// Buttons
<button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
  Click me
</button>

// Cards
<div className="bg-white rounded-lg shadow-lg p-6">
```

---

## 🔄 State Management Patterns

### Simple State Update
```javascript
const [trips, setTrips] = useState([]);

// Add trip
setTrips([newTrip, ...trips]);

// Remove trip
setTrips(trips.filter(t => t.id !== tripId));

// Update trip
setTrips(trips.map(t => t.id === id ? {...t, ...updates} : t));
```

### Conditional Rendering
```javascript
{trips.length > 0 ? (
  <TripsList trips={trips} />
) : (
  <div>No trips yet!</div>
)}
```

### Multiple State Updates
```javascript
const handleSelectTrip = (trip) => {
  setSelectedTrip(trip);
  setCurrentView('details');
  window.scrollToTop();
};
```

---

## 📅 Working with Dates

### Get Days Until Trip
```javascript
const daysUntilTrip = (startDate) => {
  const today = new Date();
  const tripDate = new Date(startDate);
  const difference = tripDate - today;
  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return days;
};
```

### Format Date Display
```javascript
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
```

### Date Input Format
```javascript
// HTML date input expects YYYY-MM-DD
<input type="date" value={formData.startDate} />

// Convert to display format
const displayDate = new Date(formData.startDate).toLocaleDateString();
```

---

## 🎭 Conditional Styling

### Based on State
```javascript
<button className={`
  px-4 py-2 rounded font-bold transition
  ${isActive 
    ? 'bg-blue-600 text-white' 
    : 'bg-gray-200 text-gray-800'
  }
`}>
  Click me
</button>
```

### Based on Data
```javascript
<div className={`
  p-4 rounded
  ${trip.budget > 5000 
    ? 'bg-green-100 border-green-500' 
    : trip.budget > 2000
    ? 'bg-yellow-100 border-yellow-500'
    : 'bg-red-100 border-red-500'
  }
`}>
```

### Responsive Classes
```javascript
<div className="
  grid
  grid-cols-1      // Mobile: 1 column
  md:grid-cols-2   // Tablet: 2 columns
  lg:grid-cols-3   // Desktop: 3 columns
  gap-6
">
```

---

## 🔍 Search & Filter Patterns

### Search by Destination
```javascript
const searchTrips = (searchTerm) => {
  return trips.filter(trip =>
    trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
```

### Filter by Multiple Criteria
```javascript
const filterTrips = (category, minBudget, maxBudget) => {
  return trips.filter(trip =>
    (category === 'all' || trip.category === category) &&
    trip.budget >= minBudget &&
    trip.budget <= maxBudget
  );
};
```

### Advanced Filter
```javascript
const advancedFilter = (filters) => {
  return trips.filter(trip => {
    const matchCategory = !filters.category || trip.category === filters.category;
    const matchBudget = trip.budget >= filters.minBudget && trip.budget <= filters.maxBudget;
    const matchSearch = !filters.search || 
      trip.destination.toLowerCase().includes(filters.search.toLowerCase());
    return matchCategory && matchBudget && matchSearch;
  });
};
```

---

## 📊 Array Methods Used

### map() - Transform array
```javascript
// Add an ID to each trip
const tripsWithIds = trips.map((trip, index) => ({
  ...trip,
  displayId: index + 1
}));
```

### filter() - Create subset
```javascript
// Get only adventure trips
const adventureTrips = trips.filter(t => t.category === 'adventure');
```

### sort() - Reorder array
```javascript
// Sort by budget descending
const sorted = [...trips].sort((a, b) => b.budget - a.budget);
```

### find() - Get single item
```javascript
// Find trip by ID
const trip = trips.find(t => t.id === tripId);
```

### some() - Check condition
```javascript
// Check if any trip is coming up
const hasUpcoming = trips.some(t => daysUntilTrip(t.startDate) > 0);
```

### reduce() - Aggregate data
```javascript
// Get total budget across all trips
const totalBudget = trips.reduce((sum, trip) => sum + parseInt(trip.budget), 0);

// Group trips by category
const byCategory = trips.reduce((acc, trip) => {
  acc[trip.category] = [...(acc[trip.category] || []), trip];
  return acc;
}, {});
```

---

## 🎯 Useful Helper Functions

### Capitalize String
```javascript
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
```

### Format Currency
```javascript
const formatCurrency = (amount) => 
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
```

### Format Date Relative
```javascript
const formatRelativeDate = (date) => {
  const days = daysUntilTrip(date);
  if (days > 0) return `${days} days away`;
  if (days === 0) return 'Today!';
  return `${Math.abs(days)} days ago`;
};
```

### Debounce Function
```javascript
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
```

---

## 🚀 Performance Tips

### Memoize Expensive Calculations
```javascript
import { useMemo } from 'react';

const expensiveValue = useMemo(() => {
  return trips.filter(...).sort(...);
}, [trips]);
```

### Prevent Unnecessary Renders
```javascript
import { useCallback } from 'react';

const handleDelete = useCallback((id) => {
  setTrips(trips.filter(t => t.id !== id));
}, [trips]);
```

### Lazy Load Images
```javascript
<img 
  src="trip.jpg" 
  loading="lazy"
  alt="Trip destination"
/>
```

---

## 🐛 Debugging Tips

### Console Logging
```javascript
// Log component render
console.log('Component rendered', trips);

// Log state updates
console.log('State updated:', newTrips);

// Conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('Dev mode:', data);
}
```

### React DevTools
```javascript
// Check component props
// Props passed to component are visible in React DevTools

// Check hooks state
// useState values shown in Hooks tab

// Check component tree
// Visual representation of component hierarchy
```

### LocalStorage Debugging
```javascript
// Check stored data in browser DevTools:
// F12 > Application > Storage > Local Storage > localhost:3000

// Manually inspect
console.log(localStorage.getItem('trips'));

// Clear for fresh start
localStorage.clear();
```

---

## 📝 Common Code Patterns

### Conditional Button Display
```javascript
<button
  onClick={() => {
    if (window.confirm('Are you sure?')) {
      handleDelete(trip.id);
    }
  }}
>
  Delete
</button>
```

### Modal/Dialog Pattern
```javascript
{showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 max-w-md w-full">
      <h2>Form Title</h2>
      {/* Form content */}
    </div>
  </div>
)}
```

### Loading States
```javascript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  // Do something
  setLoading(false);
};

{loading ? <Spinner /> : <Content />}
```

---

## 🎓 Learning Resources

These code examples demonstrate:
- React hooks (useState, useEffect)
- Array methods (map, filter, sort)
- Conditional rendering
- Event handling
- Form handling
- Local storage
- Responsive design
- Component composition
- State management

---

**Happy coding! 🚀**
