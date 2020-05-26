import React, { useState } from 'react'
import { StyleSheet, Button, TouchableHighlight } from 'react-native'

const CaptureButton = ({ buttonDisabled, onClick }) => {
  return (
    <TouchableHighlight style={styles.captureButton} disabled={buttonDisabled}>
      <Button
        onPress={onClick}
        disabled={buttonDisabled}
        title="Capture"
        accessibilityLabel="Captures the image on the screen"
      />
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  captureButton: {
    marginBottom: 30,
    width: 160,
    borderRadius: 10,
    backgroundColor: 'white',
  },
})

export default CaptureButton
