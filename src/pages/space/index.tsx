import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container, TextField, Typography } from '@material-ui/core'
import { Close, Send } from '@material-ui/icons'
import HeaderBar from '@/components/HeaderBar'
import IconButton from '@/components/IconButton'
import useStyles from '@/theme/container.style'
import useWebRTC from '@/utils/webrtc'

const Space: React.FC<RouteComponentProps> = props => {
  const styles = useStyles()
  const [id, data, onSend] = useWebRTC(location.hash === '#1')

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSend(event.target.value)
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
        <Typography>{id}</Typography>
        <TextField
          margin='dense'
          label='Description'
          fullWidth
          color='secondary'
          multiline
          onChange={handleTextChange}
          value={data}
        />
        <IconButton onClick={() => onSend(Math.random().toString())}>
          <Send />
        </IconButton>
      </Container>
    </>
  )
}

export default Space
