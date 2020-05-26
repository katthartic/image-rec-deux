import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native'
import * as Linking from 'expo-linking'

const KeyInput = ({ visible, onAddKey, onCancel }) => {
  const [enteredKey, setEnteredKey] = useState('')

  const keyInputHandler = (enteredText) => {
    setEnteredKey(enteredText)
  }

  const addKeyHandler = () => {
    onAddKey(enteredKey)
  }

  const disabled = () => {
    if (enteredKey) return false
    return true
  }
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Your Clarifai Key"
          style={styles.input}
          value={enteredKey}
          onChangeText={keyInputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Submit"
              onPress={addKeyHandler}
              disabled={disabled()}
            />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" color="red" onPress={onCancel} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.clarifaiLink}
          onPress={() => {
            Linking.openURL('https://clarifai.com/developer/account/signup')
          }}>
          <Text>Sign up at Clarify</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
  },
  button: {
    flex: 1,
  },
  clarifaiLink: {
    marginVertical: 10,
  },
})

export default KeyInput
