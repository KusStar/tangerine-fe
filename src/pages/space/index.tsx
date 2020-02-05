import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container, TextField } from '@material-ui/core'
import { Close, Send } from '@material-ui/icons'
import HeaderBar from '@/components/HeaderBar'
import IconButton from '@/components/IconButton'
import useStyles from '@/theme/container.style'
import useWebRTC from '@/utils/webrtc'

const Space: React.FC<RouteComponentProps> = props => {
  const styles = useStyles()
  const [signatures, setSignatures, onSignal, onSend] = useWebRTC(
    location.hash === '#1'
  )

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let text = event.target.value
    let newSignatures = text.split('$$$__SPLIT__$$$')
    if (newSignatures) {
      setSignatures(newSignatures)
    }
  }

  return (
    <>
      <HeaderBar
        title={'Space'}
        leftButton={{
          Icon: <Close />,
          onClick: () => props.history.goBack()
        }}
      />
      <Container className={styles.container}>
        <IconButton onClick={() => onSignal()}>
          <Send />
        </IconButton>
        <IconButton onClick={() => onSend()}>
          <Send />
        </IconButton>
        <TextField
          margin='dense'
          label='Description'
          fullWidth
          color='secondary'
          multiline
          onChange={handleTextChange}
          value={signatures.join('$$$__SPLIT__$$$')}
        />
      </Container>
    </>
  )
}

export default Space
