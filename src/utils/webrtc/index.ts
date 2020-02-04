import { useState, useRef, useCallback, useEffect } from 'react'
var Peer = require('simple-peer')

interface Signature {
  type: string
  sdp: string
}

const useWebRTC = () => {
  const p: ReturnType<typeof Peer> = new Peer({
    initiator: location.hash === '#1',
  })
  const [signature, setSignature] = useState<string>('')

  useEffect(() => {
    p.on('error', (err: unknown) => console.log('error', err))

    p.on('signal', (data: unknown) => {
      console.log('SIGNAL', data)
      setSignature(JSON.stringify(data))
    })

    p.on('connect', () => {
      console.log('CONNECT')
      p.send('whatever' + Math.random())
    })

    p.on('data', (data: unknown) => {
      console.log('data: ' + data)
    })
    console.log(signature)
  }, [])

  const onSignal = useCallback((outterSignature?: string) => {
    p.signal(JSON.parse(outterSignature || signature))
  }, [])

  return [signature, setSignature, onSignal] as const
}

export default useWebRTC
