import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import TripsList from './components/TripsList';
import AddTripForm from './components/AddTripForm';
import Footer from './components/Footer';

function App() {
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Load trips from localStorage
  useEffect(() => {
    const savedTrips = localStorage.getItem('trips');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
  }, []);

  // Save trips to localStorage
  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  const handleAddTrip = (newTrip) => {
    const trip = {
      ...newTrip,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString(),
    };
    setTrips([trip, ...trips]);
    setShowForm(false);
  };

  const handleDeleteTrip = (id) => {
    setTrips(trips.filter((trip) => trip.id !== id));
  };

  const handleEditTrip = (id, updatedTrip) => {
    setTrips(trips.map((trip) => (trip.id === id ? { ...trip, ...updatedTrip } : trip)));
    setSelectedTrip(null);
    setCurrentView('home');
  };

  return (
    <div className="App min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header onViewChange={setCurrentView} currentView={currentView} />

      {currentView === 'home' ? (
        <>
          <Hero onStartPlanning={() => setShowForm(true)} tripsCount={trips.length} />

          {showForm && (
            <div className="w-full bg-white shadow-lg border-t-4 border-blue-500">
              <AddTripForm onAddTrip={handleAddTrip} onCancel={() => setShowForm(false)} />
            </div>
          )}

          <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
            {trips.length > 0 ? (
              <TripsList
                trips={trips}
                onDelete={handleDeleteTrip}
                onViewDetails={(trip) => {
                  setSelectedTrip(trip);
                  setCurrentView('details');
                }}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No trips yet! Create your first adventure.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Plan Your Trip
                </button>
              </div>
            )}
          </main>
        </>
      ) : (
        <div className="flex-1 container mx-auto px-4 py-8">
          {selectedTrip && (
            <div className="bg-white rounded-lg shadow-xl p-8">
              <button
                onClick={() => setCurrentView('home')}
                className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                ← Back to Trips
              </button>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">{selectedTrip.destination}</h1>
                  <div className="space-y-4 text-gray-700">
                    <p>
                      <strong>Duration:</strong> {selectedTrip.duration} days
                    </p>
                    <p>
                      <strong>Start Date:</strong> {selectedTrip.startDate}
                    </p>
                    <p>
                      <strong>Budget:</strong> ${selectedTrip.budget}
                    </p>
                    <p>
                      <strong>Category:</strong> <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">{selectedTrip.category}</span>
                    </p>
                    <p>
                      <strong>Created:</strong> {selectedTrip.createdAt}
                    </p>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Itinerary</h2>
                  <p className="text-gray-700 mb-6 whitespace-pre-wrap">{selectedTrip.itinerary}</p>
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        const newNotes = prompt('Add notes:', selectedTrip.notes || '');
                        if (newNotes !== null) {
                          handleEditTrip(selectedTrip.id, { notes: newNotes });
                          setSelectedTrip({ ...selectedTrip, notes: newNotes });
                        }
                      }}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition"
                    >
                      Add Notes
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this trip?')) {
                          handleDeleteTrip(selectedTrip.id);
                          setCurrentView('home');
                        }
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                    >
                      Delete Trip
                    </button>
                  </div>
                </div>
              </div>
              {selectedTrip.notes && (
                <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Notes:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedTrip.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
