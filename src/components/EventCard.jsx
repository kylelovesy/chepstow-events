import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  MapPin, 
  Star, 
  Pound, 
  ExternalLink, 
  Edit, 
  Trash2,
  Navigation,
  Users
} from 'lucide-react'
import { format } from 'date-fns'

export function EventCard({ event, onEdit, onDelete, showActions = true }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setIsDeleting(true)
      await onDelete(event.id)
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy')
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
              {event.end_date && event.end_date !== event.event_date && (
                <span>- {formatDate(event.end_date)}</span>
              )}
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
                {event.distance.toFixed(1)} miles from Chepstow
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
            <Pound className="h-4 w-4 text-green-600" />
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

        {/* Carer/Disability Info */}
        {event.carer_disability_info && (
          <Badge variant="secondary" className="text-xs">
            {event.carer_disability_info}
          </Badge>
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
          
          {showActions && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(event)}
                className="text-xs"
              >
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-xs text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

