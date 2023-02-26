import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { CheckmarkIcon } from "../icons";

const TIMEOUT = 2000;

interface ModalCheckmarkProps {
  visible: boolean;
  onTimeout: () => void;
}

export function ModalCheckmark({ visible, onTimeout }: ModalCheckmarkProps) {
  const [timerRunning, setTimerRunning] = useState(false);
  // Track if the component is mounted so we don't try to modify the state of an unmounted item
  const componentMounted = useRef(false);

  useEffect(() => {
    if (visible && !timerRunning) {
      componentMounted.current = true;
      const timeout = setTimeout(() => {
        if (componentMounted.current) {
          setTimerRunning(false);
        }
        onTimeout();
      }, TIMEOUT);
      setTimerRunning(true);
      return () => { 
        componentMounted.current = false;
      };
    }
  }, [visible, onTimeout, timerRunning]);

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modalWrapper}>
        <View style={styles.modalBox}>
          <CheckmarkIcon />
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
    height: 320,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});
