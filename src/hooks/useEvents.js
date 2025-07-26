import { useState, useEffect } from 'react'
import { supabase, calculateDistance, CHEPSTOW_COORDS } from '../lib/supabase'

export function useEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch events from Supabase
  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .gte('event_date', new Date().toISOString().split('T')[0]) // Only future events
        .order('event_date', { ascending: true })

      if (error) throw error

      // Calculate distances and add to events
      const eventsWithDistance = data.map(event => ({
        ...event,
        distance: event.latitude && event.longitude 
          ? calculateDistance(CHEPSTOW_COORDS.lat, CHEPSTOW_COORDS.lng, event.latitude, event.longitude)
          : null
      }))

      setEvents(eventsWithDistance)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Add new event
  const addEvent = async (eventData) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()

      if (error) throw error

      // Add distance calculation to new event
      const eventWithDistance = {
        ...data[0],
        distance: data[0].latitude && data[0].longitude 
          ? calculateDistance(CHEPSTOW_COORDS.lat, CHEPSTOW_COORDS.lng, data[0].latitude, data[0].longitude)
          : null
      }

      setEvents(prev => [...prev, eventWithDistance].sort((a, b) => new Date(a.event_date) - new Date(b.event_date)))
      return { success: true, data: eventWithDistance }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  // Update event
  const updateEvent = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error

      // Add distance calculation to updated event
      const eventWithDistance = {
        ...data[0],
        distance: data[0].latitude && data[0].longitude 
          ? calculateDistance(CHEPSTOW_COORDS.lat, CHEPSTOW_COORDS.lng, data[0].latitude, data[0].longitude)
          : null
      }

      setEvents(prev => 
        prev.map(event => 
          event.id === id ? eventWithDistance : event
        ).sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
      )
      return { success: true, data: eventWithDistance }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  // Delete event (soft delete by setting is_active to false)
  const deleteEvent = async (id) => {
    try {
      const { error } = await supabase
        .from('events')
        .update({ is_active: false })
        .eq('id', id)

      if (error) throw error

      setEvents(prev => prev.filter(event => event.id !== id))
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  // Sort events
  const sortEvents = (sortBy, direction = 'asc') => {
    const sorted = [...events].sort((a, b) => {
      let aVal, bVal

      switch (sortBy) {
        case 'date':
          aVal = new Date(a.event_date)
          bVal = new Date(b.event_date)
          break
        case 'distance':
          aVal = a.distance || 999
          bVal = b.distance || 999
          break
        case 'cost':
          aVal = a.cost_numeric || 0
          bVal = b.cost_numeric || 0
          break
        case 'rating':
          aVal = a.rating || 0
          bVal = b.rating || 0
          break
        case 'name':
          aVal = a.event_name.toLowerCase()
          bVal = b.event_name.toLowerCase()
          break
        default:
          return 0
      }

      if (direction === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
      }
    })

    setEvents(sorted)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    sortEvents,
    refetch: fetchEvents
  }
}

