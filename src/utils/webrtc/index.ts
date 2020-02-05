import { useState, useRef, useEffect } from 'react'
const Peer = require('simple-peer')

const useWebRTC = (initiator = true) => {
  const p = useRef<ReturnType<typeof Peer>>(
    new Peer({
      initiator: initiator
    })
  )
  const [signatures, setSignatures] = useState<string[]>([])

  useEffect(() => {
    p.current.on('error', (err: unknown) => console.log('error', err))
    p.current.on('connect', () => {
      p.current.send('whatever' + Math.random())
    })
    p.current.on('data', (data: unknown) => {
      console.log('data: ' + data)
    })
  }, [p])

  useEffect(() => {
    p.current.on('signal', handleSignal)
  }, [signatures])

  const handleSignal = (data: unknown) => {
    setSignatures(signatures.concat(JSON.stringify(data)))
  }

  const onSignal = () => {
    for (let signature of signatures) {
      if (signature) p.current.signal(JSON.parse(signature))
    }
    if (initiator === false) setSignatures([])
  }

  const onSend = () => {
    p.current.send('whatever' + Math.random())
  }

  return [signatures, setSignatures, onSignal, onSend] as const
}

export default useWebRTC
