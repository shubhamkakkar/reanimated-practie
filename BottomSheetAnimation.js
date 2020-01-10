import { Icon, Text } from 'native-base'
import React, { ReactNode } from 'react'
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

type ModalProps = {
  children: ReactNode
  onClose: () => void
  visible: boolean
  header?: string
}

export const HalfModal = (props: ModalProps) => {
  const Header = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.header || 'Modal Header'}</Text>
      <TouchableOpacity style={styles.button} onPress={props.onClose}>
        <Icon name="close" style={styles.buttonText} />
      </TouchableOpacity>
    </View>
  )

  return (
    <Modal transparent visible={props.visible} animationType="slide">
      <View style={styles.modal}>
        <SafeAreaView style={styles.bottomArea}>
          <Header />
          {props.children}
        </SafeAreaView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    padding: 10,
    marginLeft: '1%',
    marginRight: '1%',
    position: 'absolute',
    bottom: 0,
    width: '98%',
    height: '50%',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  header: {
    borderRadius: 10,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    height: 50,
    width: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 45,
    borderColor: '#CCC',
  },
  buttonText: {
    color: '#333',
    fontSize: 50,
    alignSelf: 'center',
  },
  bottomArea: {
    height: '100%',
  },
})

