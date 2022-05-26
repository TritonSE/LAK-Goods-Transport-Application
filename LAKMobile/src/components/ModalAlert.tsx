import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface ModalProps {
  title: string;
  message?: string;
  confirmLabel: string;
  onConfirm: () => void;
  cancelLabel?: string;
  onCancel?: () => void;
  visible: boolean;
}

/**
 * This component works like the built-in `Modal` (https://reactnative.dev/docs/modal).
 *
 * The `message`, `cancelLabel`, and `onCancel` props are optional. If
 * `cancelLabel` is not provided, then there is only the confirmation button.
 *
 * Note that **the parent component completely controls whether the modal is
 * visible or not.** That means the `onConfirm` and `onCancel` callbacks should
 * hide the modal in addition to performing any other handling actions.
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
 *         confirmLabel="Confirm"
 *         onConfirm={() => handleConfirm()}
 *         cancelLabel="Optional cancel"
 *         onCancel={() => handleCancel()}
 *         visible={modalVisible}
 *       />
 *     </View>
 *   )
 * }
 * ```
 */
export function ModalAlert({
  title,
  message,
  confirmLabel,
  onConfirm,
  cancelLabel,
  onCancel,
  visible,
}: ModalProps) {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modalWrapper}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{title}</Text>
          {message ? <Text style={styles.modalMessage}>{message}</Text> : null}
          <View style={styles.modalButtonWrapper}>
            {cancelLabel ? (
              <Pressable
                onPress={() => {
                  if (onCancel) {
                    onCancel();
                  }
                }}
                android_ripple={{ color: "#ccc" }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonLabel}>{cancelLabel}</Text>
              </Pressable>
            ) : null}
            <Pressable
              onPress={onConfirm}
              android_ripple={{ color: "#ccc" }}
              style={styles.modalButton}
            >
              <Text
                style={[
                  styles.modalButtonLabel,
                  styles.modalButtonLabelPrimary,
                ]}
              >
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 320,
    height: "auto",
    padding: 40,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    elevation: 4,
  },
  modalTitle: {
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
  },
  modalMessage: {
    marginTop: 40,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
    textAlign: "center",
  },
  modalButtonWrapper: {
    marginTop: 40,
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  modalButtonLabel: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  modalButtonLabelPrimary: {
    color: "#da5c5c",
  },
});
