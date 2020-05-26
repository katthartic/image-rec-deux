import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CameraMode from './components/CameraMode'

export default App = () => {
  return (
    <View style={styles.container}>
      <CameraMode />
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
