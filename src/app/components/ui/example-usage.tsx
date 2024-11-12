import React from 'react'
import Skeleton from './skeleton'

export default function LoadingCard() {
  return (
    <div className="p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <Skeleton variant="circular" width={50} height={50} />
        <div className="flex-1 space-y-6 py-1">
          <Skeleton variant="text" className="h-2 w-3/4" />
          <Skeleton variant="rectangular" className="h-4 w-5/6" />
          <Skeleton variant="text" className="h-2 w-1/2" />
        </div>
      </div>
    </div>
  )
}