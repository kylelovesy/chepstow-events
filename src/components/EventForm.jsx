import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Save, X } from 'lucide-react'

export function EventForm({ event, onSave, onCancel, isOpen }) {
  const [formData, setFormData] = useState({
    event_name: '',
    event_date: '',
    end_date: '',
    location: '',
    latitude: '',
    longitude: '',
    description: '',
    cost_text: '',
    cost_numeric: '',
    carer_disability_info: '',
    rating: '',
    url: '',
    child_friendly_features: '',
    source: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Populate form when editing
  useEffect(() => {
    if (event) {
      setFormData({
        event_name: event.event_name || '',
        event_date: event.event_date || '',
        end_date: event.end_date || '',
        location: event.location || '',
        latitude: event.latitude || '',
        longitude: event.longitude || '',
        description: event.description || '',
        cost_text: event.cost_text || '',
        cost_numeric: event.cost_numeric || '',
        carer_disability_info: event.carer_disability_info || '',
        rating: event.rating || '',
        url: event.url || '',
        child_friendly_features: event.child_friendly_features || '',
        source: event.source || ''
      })
    } else {
      // Reset form for new event
      setFormData({
        event_name: '',
        event_date: '',
        end_date: '',
        location: '',
        latitude: '',
        longitude: '',
        description: '',
        cost_text: '',
        cost_numeric: '',
        carer_disability_info: '',
        rating: '',
        url: '',
        child_friendly_features: '',
        source: ''
      })
    }
  }, [event])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        cost_numeric: formData.cost_numeric ? parseFloat(formData.cost_numeric) : null,
        rating: formData.rating ? parseFloat(formData.rating) : null,
      }

      // Remove empty strings
      Object.keys(submitData).forEach(key => {
        if (submitData[key] === '') {
          submitData[key] = null
        }
      })

      const result = await onSave(submitData)
      if (result.success) {
        onCancel() // Close form on success
      } else {
        setError(result.error || 'Failed to save event')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold text-orange-600">
                {event ? 'Edit Event' : 'Add New Event'}
              </CardTitle>
              <CardDescription>
                {event ? 'Update event details' : 'Add a new summer holiday event'}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Event Name */}
            <div className="space-y-2">
              <Label htmlFor="event_name">Event Name *</Label>
              <Input
                id="event_name"
                value={formData.event_name}
                onChange={(e) => handleChange('event_name', e.target.value)}
                placeholder="Enter event name"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event_date">Start Date *</Label>
                <Input
                  id="event_date"
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => handleChange('event_date', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date (optional)</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleChange('end_date', e.target.value)}
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Enter location address"
                required
              />
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude">Latitude (optional)</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => handleChange('latitude', e.target.value)}
                  placeholder="e.g., 51.6419"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude (optional)</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => handleChange('longitude', e.target.value)}
                  placeholder="e.g., -2.6773"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe the event..."
                rows={3}
              />
            </div>

            {/* Cost */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost_text">Cost Description</Label>
                <Input
                  id="cost_text"
                  value={formData.cost_text}
                  onChange={(e) => handleChange('cost_text', e.target.value)}
                  placeholder="e.g., Adult: £10, Child: £5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost_numeric">Cost (£) for sorting</Label>
                <Input
                  id="cost_numeric"
                  type="number"
                  step="0.01"
                  value={formData.cost_numeric}
                  onChange={(e) => handleChange('cost_numeric', e.target.value)}
                  placeholder="e.g., 10.00"
                />
              </div>
            </div>

            {/* Rating and URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => handleChange('rating', e.target.value)}
                  placeholder="e.g., 4.5"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => handleChange('url', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Child-friendly features */}
            <div className="space-y-2">
              <Label htmlFor="child_friendly_features">Child-Friendly Features</Label>
              <Textarea
                id="child_friendly_features"
                value={formData.child_friendly_features}
                onChange={(e) => handleChange('child_friendly_features', e.target.value)}
                placeholder="Describe what makes this event suitable for children..."
                rows={2}
              />
            </div>

            {/* Carer/Disability Info */}
            <div className="space-y-2">
              <Label htmlFor="carer_disability_info">Carer/Disability Information</Label>
              <Input
                id="carer_disability_info"
                value={formData.carer_disability_info}
                onChange={(e) => handleChange('carer_disability_info', e.target.value)}
                placeholder="e.g., Carer admitted free"
              />
            </div>

            {/* Source */}
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => handleChange('source', e.target.value)}
                placeholder="Where did you find this event?"
              />
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-600">{error}</AlertDescription>
              </Alert>
            )}

            {/* Form Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                {event ? 'Update Event' : 'Add Event'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

