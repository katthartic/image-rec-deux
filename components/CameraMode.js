import React, { useState } from 'react'
import { Camera } from 'expo-camera'
import {
  Dimensions,
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
  const [type, setType] = useState(Camera.Constants.Type.back)

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
        }}>
        <TouchableOpacity
          style={{
            flex: 0.1,
            alignSelf: 'flex-end',
            alignItems: 'center',
          }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )
          }}>
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
            {' '}
            Flip{' '}
          </Text>
        </TouchableOpacity>
      </View>
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
