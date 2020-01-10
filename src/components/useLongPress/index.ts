import React, { useState, useEffect, MouseEvent } from 'react'

const useLongPress = (callback = () => {}, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState<boolean>(false)

  useEffect(() => {
    let timer: any
    if (startLongPress) {
      timer = setTimeout(() => callback(), ms)
    } else {
      clearTimeout(timer)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [startLongPress])

  const handleStartEvent = () => {
    setStartLongPress(true)
  }

  const handleEndEvent = () => {
    setStartLongPress(false)
  }
  return {
    onMouseDown: handleStartEvent,
    onMouseUp: handleEndEvent,
    onMouseLeave: handleEndEvent,
    onTouchStart: handleStartEvent,
    onTouchEnd: handleEndEvent
  }
}

export default useLongPress
