import { useRef, useState, useCallback } from 'react'
import 'webrtc-adapter'

const useWebRTC = () => {
  const [connected, setConnected] = useState<boolean>(false)
  const peer = useRef<RTCPeerConnection>()

  useCallback(() => {
    if (!peer.current) {
      peer.current = new RTCPeerConnection()
    } else if (!connected) {
      peer.current.close()
    }
  }, [connected])

  return [connected, setConnected, peer.current] as const
}

export default useWebRTC
