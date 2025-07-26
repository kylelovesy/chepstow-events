import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  MapPin, 
  Star, 
  PoundSterling, 
  ExternalLink, 
  Plus,
  Navigation,
  Users,
  Search,
  Filter
} from 'lucide-react'
import './App.css'

// Sample data for demonstration
const sampleEvents = [
  {
    id: 1,
    event_name: 'Falconry at Chepstow Castle',
    event_date: '2025-07-19',
    location: 'Chepstow Castle, NP16 5EY',
    description: 'See magnificent birds of prey in a spectacular medieval castle setting overlooking the River Wye.',
    cost_text: 'Adult: £9.50, Child: £6.70 (Carer admitted free)',
    cost_numeric: 9.50,
    rating: 4.5,
    url: 'https://cadw.gov.wales/visit/places-to-visit/chepstow-castle',
    child_friendly_features: 'Educational and engaging for children, historic setting',
    distance: 0.5
  },
  {
    id: 2,
    event_name: 'Bristol Zoo Project',
    event_date: '2025-07-20',
    location: 'Bristol, BS10 7TT',
    description: 'A spacious wildlife park focusing on conservation. Features play areas, animal talks, and themed trails.',
    cost_text: 'Adult: £18, Child: £14',
    cost_numeric: 18.00,
    rating: 4.5,
    url: 'https://bristolzoo.org.uk',
    child_friendly_features: 'Play areas, animal talks, family-friendly activities',
    distance: 25.3
  },
  {
    id: 3,
    event_name: 'Big Splash Festival',
    event_date: '2025-07-21',
    location: 'Newport City Centre',
    description: 'Newport\'s fantastic free festival with street theatre, pop-up performances, and family-friendly activities.',
    cost_text: 'Free',
    cost_numeric: 0,
    rating: 4.5,
    url: 'https://www.newportlive.co.uk/big-splash',
    child_friendly_features: 'Street theatre, family activities, free entertainment',
    distance: 12.8
  }
]

function EventCard({ event }) {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const getRatingStars = (rating) => {
    if (!rating) return null
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />)
    }

    return <div className="flex items-center gap-1">{stars}</div>
  }

  return (
    <Card className="event-card hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-400 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-800 mb-1">
              {event.event_name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              {formatDate(event.event_date)}
            </CardDescription>
          </div>
          {event.rating && (
            <div className="flex items-center gap-1">
              {getRatingStars(event.rating)}
              <span className="text-sm text-gray-600 ml-1">{event.rating}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Location and Distance */}
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">{event.location}</p>
            {event.distance && (
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Navigation className="h-3 w-3" />
                {event.distance} miles from Chepstow
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
        )}

        {/* Cost */}
        {event.cost_text && (
          <div className="flex items-center gap-2">
            <PoundSterling className="h-4 w-4 text-green-600" />
            <span className="text-sm text-gray-700">{event.cost_text}</span>
          </div>
        )}

        {/* Child-friendly features */}
        {event.child_friendly_features && (
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">{event.child_friendly_features}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center pt-2 border-t">
          <div className="flex gap-2">
            {event.url && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(event.url, '_blank')}
                className="text-xs"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Visit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSetupInfo, setShowSetupInfo] = useState(false)

  const filteredEvents = sampleEvents.filter(event => 
    event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 cheetah-pattern">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🐆</div>
            <div>
              <h1 className="text-xl font-bold text-orange-600">Chepstow Events</h1>
              <p className="text-xs text-gray-500">Summer Holiday Planner</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowSetupInfo(!showSetupInfo)}
            variant="outline"
            size="sm"
          >
            Setup Guide
          </Button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Setup Information */}
        {showSetupInfo && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">🚀 Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <p className="mb-4">
                This is a demo version with sample data. To use the full application with your own Supabase backend:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Follow the Supabase setup guide (included in the project files)</li>
                <li>Update the environment variables in <code>.env.local</code></li>
                <li>The app will automatically switch to live mode once configured</li>
              </ol>
            </CardContent>
          </Card>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              🐆 Summer Events
            </h1>
            <p className="text-gray-600 mt-1">
              Discover amazing events within 75 miles of Chepstow
            </p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, locations, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="mt-4">
              <Badge variant="secondary">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No events match your search</h3>
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
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

