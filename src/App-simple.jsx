import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">
          🐆 Chepstow Events
        </h1>
        <p className="text-gray-600 mb-8">
          Your summer holiday adventure planner
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
          <p className="text-gray-700">
            This is a test version to ensure the basic React app is working.
            The full application will include authentication and event management features.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

