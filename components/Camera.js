import React, { useState } from 'react'
import { RNCamera } from 'react-native-camera'
import { Dimensions, Alert, StyleSheet, ActivityIndicator } from 'react-native'
import CaptureButton from './CaptureButton'

const Camera = (props) => {
  const [identifiedAs, setIdentifiedAs] = useState('')
  const [loading, setLoading] = useState(false)

  let camera

  const displayAnswer = (identifiedImage) => {
    setIdentifiedAs(identifiedImage)
    setLoading(false)
    Alert.alert(identifedAs, '', { cancelable: false })
    camera.resumePreview()
  }

  const identifyImage = (imageData) => {
    const Clarifai = require('clarifai')
    const app = new Clarifai.App({
      apiKey: '78292abdf6f24db69021d396b66f233b',
    })
    app.models
      .predict(Clarifai.GENERAL_MODEL, { base64: imageData })
      .then((response) =>
        displayAnswer(response.outputs[0].data.concepts[0].name).catch((err) =>
          alert(err)
        )
      )
  }

  const takePicture = async () => {
    camera.pausePreview()
    setLoading(true)
    const options = {
      base64: true,
    }
    const data = await camera.takePictureAsync(options)
    identifyImage(data.base64)
  }

  return (
    <RNCamera
      ref={(ref) => {
        camera = ref
      }}
      style={styles.preview}>
      <ActivityIndicator
        size="large"
        style={styles.loadingIndicator}
        color="#fff"
        animating={loading}
      />
      <CaptureButton buttonDisabled={loading} onClick={takePicture} />
    </RNCamera>
  )
}

const styles = StyleSheet.create({
  screeen: {
    padding: 50,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Camera
