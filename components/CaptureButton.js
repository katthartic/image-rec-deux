import React, { useState } from 'react'
import { StyleSheet, Button, TouchableHighlight } from 'react-native'

const CaptureButton = (props) => {
  return (
    <TouchableHighlight
      style={styles.captureButton}
      disabled={props.buttonDisabled}>
      <Button
        onPress={props.onClick}
        disabled={props.buttonDisabled}
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
