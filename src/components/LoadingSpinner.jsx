import { Loader2 } from 'lucide-react'

export function LoadingSpinner({ size = 'default', text = 'Loading' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-orange-500 mb-2`} />
      <p className="text-gray-600 text-sm animate-pulse">{text}</p>
    </div>
  )
}

