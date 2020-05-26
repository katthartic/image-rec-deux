import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CameraMode from './components/CameraMode'
import KeyInput from './components/KeyInput'

export default function App() {
  const [key, setKey] = useState('')
  const [inputMode, setInputMode] = useState(true)

  const addKeyHandler = (key) => {
    setKey(key)
    setInputMode(false)
  }

  const cancelInputMode = () => {
    setInputMode(false)
  }

  return (
    <View style={styles.container}>
      <KeyInput
        visible={inputMode}
        onAddKey={addKeyHandler}
        onCancel={cancelInputMode}
      />
      <CameraMode clarifaiKey={key} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
