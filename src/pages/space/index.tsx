import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { Close, Send } from '@material-ui/icons'
import HeaderBar from '@/components/HeaderBar'
import IconButton from '@/components/IconButton'
import useStyles from '@/theme/container.style'
import useWebRTC from '@/utils/webrtc';

const Space: React.FC<RouteComponentProps> = props => {
  const styles = useStyles()
  const [signature, setSignature, onSignal] = useWebRTC()


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
        <IconButton onClick={onSignal}>
          <Send />
        </IconButton>
      </Container>
    </>
  )
}

export default Space
