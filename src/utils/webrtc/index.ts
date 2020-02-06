import { useState, useRef, useEffect } from 'react'
import Firebase from '@/utils/firebase'
const Peer = require('simple-peer')

interface Signature {
  type: string
  sdp: string
}

const useWebRTC = (initiator = true) => {
  const p = useRef<ReturnType<typeof Peer>>(
    new Peer({
      initiator: initiator
    })
  )
  const [signatures, setSignatures] = useState<string[]>([])
  const [id, setId] = useState<string>('')
  const [data, setData] = useState<string>('')

  useEffect(() => {
    p.current.on('error', onClose)
    p.current.on('connect', () => {
      p.current.send('whatever' + Math.random())
    })
    p.current.on('data', (receiveData: string) => {
      setData(receiveData)
    })

    if (location.hash !== '#1' && location.hash.length > 1) {
      const roomId = location.hash.substring(1)
      setId(roomId)
      signalToInitiator(roomId)
    }
  }, [p])

  useEffect(() => {
    p.current.on('signal', handleSignal)
    if (signatures.length === 3 && !initiator) {
      answerSignal()
    }
  }, [signatures])

  const signalToInitiator = async (id: string) => {
    const db = Firebase.firestore()
    const roomRef = db.collection('rooms').doc(`${id}`)
    const roomSnapshot = await roomRef.get()
    if (roomSnapshot.exists) {
      const data = roomSnapshot.data()
      if (data && 'offer' in data && !('answer' in data)) {
        p.current.signal(data.offer)
      }
    }
  }

  const handleSignal = (data: unknown) => {
    if (initiator) offerSignal(data)
    setSignatures(signatures.concat(JSON.stringify(data)))
  }

  const offerSignal = async (signature: Signature) => {
    if ('type' in signature && 'sdp' in signature) {
      const db = await Firebase.firestore()

      const roomWith = {
        [signature.type]: {
          type: signature.type,
          sdp: signature.sdp
        }
      }
      if (initiator) {
        const roomRef = await db.collection('rooms').add(roomWith)

        // console.log(`current room id is ${roomRef.id}`)
        setId(roomRef.id)

        roomRef.onSnapshot(async snapshot => {
          // console.log('Got updated room:', snapshot.data())
          const data = snapshot.data()
          if (data && 'answer' in data) {
            if (data.answer && data.answer.length === 3) {
              for (let signature of data.answer) {
                if (signature) p.current.signal(JSON.parse(signature))
              }
            }
          }
        })
      }
    }
  }

  const answerSignal = async () => {
    const db = await Firebase.firestore()
    const roomId = location.hash.substring(1)

    const roomRef = db.collection('rooms').doc(`${roomId}`)
    const roomWith = {
      answer: signatures
    }
    await roomRef.update(roomWith)
  }

  const onSend = (data: string) => {
    setData(data)
    p.current.send(data)
  }

  const onClose = async () => {
    const db = await Firebase.firestore()
    const roomRef = db.collection('rooms').doc(`${id}`)
    await roomRef.delete()

    p.current.close()
    p.current.clear()
  }

  return [id, data, onSend, onClose] as const
}

export default useWebRTC
