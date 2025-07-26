import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  SortAsc, 
  SortDesc, 
  Plus, 
  Calendar,
  Navigation,
  Pound,
  Star,
  Filter
} from 'lucide-react'
import { EventCard } from './EventCard'

export function EventList({ 
  events, 
  loading, 
  onAddEvent, 
  onEditEvent, 
  onDeleteEvent, 
  onSort 
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortDirection, setSortDirection] = useState('asc')
  const [filterBy, setFilterBy] = useState('all')

  // Filter events based on search term and filter
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))

    if (!matchesSearch) return false

    switch (filterBy) {
      case 'free':
        return !event.cost_numeric || event.cost_numeric === 0
      case 'paid':
        return event.cost_numeric && event.cost_numeric > 0
      case 'nearby':
        return event.distance && event.distance <= 25 // Within 25 miles
      case 'rated':
        return event.rating && event.rating >= 4
      default:
        return true
    }
  })

  const handleSort = (newSortBy) => {
    let newDirection = 'asc'
    
    if (sortBy === newSortBy) {
      newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
    }
    
    setSortBy(newSortBy)
    setSortDirection(newDirection)
    onSort(newSortBy, newDirection)
  }

  const getSortIcon = (field) => {
    if (sortBy !== field) return null
    return sortDirection === 'asc' ? 
      <SortAsc className="h-4 w-4 ml-1" /> : 
      <SortDesc className="h-4 w-4 ml-1" />
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            🐆 Summer Events
          </h1>
          <p className="text-gray-600 mt-1">
            Discover amazing events within 75 miles of Chepstow
          </p>
        </div>
        <Button 
          onClick={onAddEvent}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events, locations, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter events" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="free">Free Events</SelectItem>
                  <SelectItem value="paid">Paid Events</SelectItem>
                  <SelectItem value="nearby">Nearby (≤25 miles)</SelectItem>
                  <SelectItem value="rated">Highly Rated (4+ stars)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={sortBy === 'date' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSort('date')}
                className="flex items-center"
              >
                <Calendar className="h-4 w-4 mr-1" />
                Date
                {getSortIcon('date')}
              </Button>
              
              <Button
                variant={sortBy === 'distance' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSort('distance')}
                className="flex items-center"
              >
                <Navigation className="h-4 w-4 mr-1" />
                Distance
                {getSortIcon('distance')}
              </Button>
              
              <Button
                variant={sortBy === 'cost' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSort('cost')}
                className="flex items-center"
              >
                <Pound className="h-4 w-4 mr-1" />
                Cost
                {getSortIcon('cost')}
              </Button>
              
              <Button
                variant={sortBy === 'rating' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSort('rating')}
                className="flex items-center"
              >
                <Star className="h-4 w-4 mr-1" />
                Rating
                {getSortIcon('rating')}
              </Button>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Badge variant="secondary">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            </Badge>
            {searchTerm && (
              <Badge variant="outline">
                Search: "{searchTerm}"
              </Badge>
            )}
            {filterBy !== 'all' && (
              <Badge variant="outline">
                Filter: {filterBy}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-gray-500">
              {events.length === 0 ? (
                <div>
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No events yet</h3>
                  <p className="text-sm">Add your first summer holiday event to get started!</p>
                </div>
              ) : (
                <div>
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No events match your search</h3>
                  <p className="text-sm">Try adjusting your search terms or filters</p>
                </div>
              )}
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
              <EventCard
                event={event}
                onEdit={onEditEvent}
                onDelete={onDeleteEvent}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

