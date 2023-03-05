import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const ProfileButtonIcon = () => (
  <View>
    <Svg width={22} height={22} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-2 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0ZM2 11c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 11.065 13a8.983 8.983 0 0 1 7.092 3.458A9.001 9.001 0 1 0 2 11Zm9 9a8.963 8.963 0 0 1-5.672-2.012A6.991 6.991 0 0 1 11.065 15a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 11 20Z"
        fill="white"
      />
    </Svg>
  </View>
);
