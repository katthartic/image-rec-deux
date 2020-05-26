import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Button, Modal } from 'react-native'

const DisplayModal = (props) => {
  const [] = useState('')

  return <Modal visible={visible} animationType="slide"></Modal>
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '60%',
  },
  button: {
    flex: 1,
  },
})

export default GoalInput
