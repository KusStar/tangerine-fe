import React, { useState, useEffect, MouseEvent } from 'react'

export type CurrentTarget = HTMLElement | null

const useLongPress = (callback = (t: CurrentTarget) => {}, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState<boolean>(false)
  const [currentTarget, setCurrentTarget] = useState<CurrentTarget>(null)

  useEffect(() => {
    let timer: any
    if (startLongPress) {
      timer = setTimeout(() => callback(currentTarget), ms)
    } else {
      setCurrentTarget(null)
      clearTimeout(timer)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [startLongPress])

  const handleStartEvent = (event: MouseEvent<HTMLElement>) => {
    setStartLongPress(true)
    setCurrentTarget(event.currentTarget)
  }
  return {
    onMouseDown: handleStartEvent,
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: handleStartEvent,
    onTouchEnd: () => setStartLongPress(false)
  }
}

export default useLongPress
