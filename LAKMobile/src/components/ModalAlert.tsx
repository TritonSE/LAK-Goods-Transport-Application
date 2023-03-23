import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface ModalButtonOptions {
  type: 'primary' | 'secondary';
  label: string;
  onPress: () => void;
}

interface ModalProps {
  title: string;
  message?: string;
  buttons: ModalButtonOptions[];
  visible: boolean;
}

/**
 * This component works like the built-in `Modal`
 * (https://reactnative.dev/docs/modal).
 *
 * The `buttons` prop works similarly to the built-in `Alert`
 * (https://reactnative.dev/docs/alert). "Primary" buttons have red labels and
 * "secondary" buttons have black labels.
 *
 * Note that **the parent component completely controls whether the modal is
 * visible or not.** That means the button press callbacks should hide the modal
 * in addition to performing any other handling actions.
 *
 * Example usage:
 *
 * ```
 * import React, { useState } from "react";
 * import { ModalAlert } from "./src/components";
 * // ...
 * function App() {
 *   const [modalVisible, setModalVisible] = useState(false);
 *   // ...
 *   return (
 *     <View>
 *       <SomeOtherComponents />
 *       <ModalAlert
 *         title="Modal title"
 *         message="Optional message"
 *         buttons={[
 *           { type: "secondary", label: "Cancel", onPress: handleCancel },
 *           { type: "primary", label: "Confirm", onPress: handleConfirm },
 *         ]}
 *         visible={modalVisible}
 *       />
 *     </View>
 *   )
 * }
 * ```
 */
export function ModalAlert({ title, message, buttons, visible }: ModalProps) {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modalWrapper}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{title}</Text>
          {message ? <Text style={styles.modalMessage}>{message}</Text> : null}
          <View
            style={[
              styles.modalButtonWrapper,
              buttons.length > 2 ? styles.modalButtonWrapperVertical : null,
            ]}
          >
            {buttons.map((button, index) => (
              <Pressable
                key={index}
                onPress={button.onPress}
                android_ripple={{ color: '#ccc' }}
                style={[styles.modalButton, buttons.length > 2 ? styles.modalButtonVertical : null]}
              >
                <Text
                  style={[
                    styles.modalButtonLabel,
                    button.type === 'primary' ? styles.modalButtonLabelPrimary : null,
                  ]}
                >
                  {button.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 320,
    height: 'auto',
    padding: 40,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    elevation: 4,
  },
  modalTitle: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  modalMessage: {
    marginTop: 40,
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    textAlign: 'center',
  },
  modalButtonWrapper: {
    marginTop: 40,
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButtonWrapperVertical: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalButtonVertical: {
    flex: 0,
  },
  modalButtonLabel: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  modalButtonLabelPrimary: {
    color: '#da5c5c',
  },
});
