import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from "@react-native-picker/picker";

interface Props {
    label: string,
    value: string,
}

export default function PickerItem({ label, value } : Props) {

  return (
    <Picker.Item label={label} value={value}/>
  );
}
