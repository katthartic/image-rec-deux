import React, { useState, useEffect } from 'react'
import { Camera } from 'expo-camera'
import {
  Dimensions,
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import CaptureButton from './CaptureButton'

const CameraMode = () => {
  const [identifiedAs, setIdentifiedAs] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasPermission, setHasPermission] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  let camera

  const displayAnswer = (identifiedImage) => {
    console.log('IDed image', identifiedImage)
    setIdentifiedAs(identifiedImage)
    console.log('set idetified?', identifiedAs)
    setLoading(false)
    console.log('set loading?', loading)
    Alert.alert(identifiedAs, '', { cancelable: false })
    camera.resumePreview()
  }

  const identifyImage = (imageData) => {
    console.log('got imageData', !!imageData)
    const Clarifai = require('clarifai')
    const app = new Clarifai.App({
      apiKey: '78292abdf6f24db69021d396b66f233b',
    })
    app.models
      .predict(Clarifai.GENERAL_MODEL, { base64: imageData })
      .then((response) => {
        console.log('response', response.outputs[0])
        displayAnswer(response.outputs[0].data.concepts[0].name).catch((err) =>
          alert(err)
        )
      })
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
    <Camera
      ref={(ref) => {
        camera = ref
      }}
      style={styles.preview}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
        }}></View>
      <ActivityIndicator
        size="large"
        style={styles.loadingIndicator}
        color="#fff"
        animating={loading}
      />
      <CaptureButton buttonDisabled={loading} onClick={takePicture} />
    </Camera>
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

export default CameraMode
