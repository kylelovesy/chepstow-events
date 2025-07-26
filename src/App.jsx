import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useEvents } from './hooks/useEvents'
import { AuthForm } from './components/AuthForm'
import { Header } from './components/Header'
import { EventList } from './components/EventList'
import { EventForm } from './components/EventForm'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import './App.css'

function App() {
  const { user, loading: authLoading } = useAuth()
  const { 
    events, 
    loading: eventsLoading, 
    error, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    sortEvents 
  } = useEvents()

  const [showEventForm, setShowEventForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show auth form if user is not logged in
  if (!user) {
    return <AuthForm />
  }

  const handleAddEvent = () => {
    setEditingEvent(null)
    setShowEventForm(true)
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setShowEventForm(true)
  }

  const handleSaveEvent = async (eventData) => {
    if (editingEvent) {
      return await updateEvent(editingEvent.id, eventData)
    } else {
      return await addEvent(eventData)
    }
  }

  const handleCancelForm = () => {
    setShowEventForm(false)
    setEditingEvent(null)
  }

  const handleDeleteEvent = async (eventId) => {
    return await deleteEvent(eventId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 cheetah-pattern">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-600">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <EventList
          events={events}
          loading={eventsLoading}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onSort={sortEvents}
        />

        <EventForm
          event={editingEvent}
          onSave={handleSaveEvent}
          onCancel={handleCancelForm}
          isOpen={showEventForm}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>🐆 Chepstow Events - Your summer holiday adventure planner</p>
          <p className="mt-1">Built with React and Supabase</p>
        </div>
      </footer>
    </div>
  )
}

export default App

