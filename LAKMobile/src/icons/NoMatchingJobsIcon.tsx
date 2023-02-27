import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export const NoMatchingJobsIcon = () => (
  <View>
    <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
        <Path d="M22 42C33.046 42 42 33.046 42 22C42 10.954 33.046 2 22 2C10.954 2 2 10.954 2 22C2 33.046 10.954 42 22 42Z" stroke="#94100C" stroke-width="4" stroke-linejoin="round"/>
        <Path d="M27 17V17C28.6569 18.6569 31.3431 18.6569 33 17V17M17 17V17C15.3431 18.6569 12.6569 18.6569 11 17V17" stroke="#94100C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M26 30C26 27.7909 24.2091 26 22 26C19.7909 26 18 27.7909 18 30C18 32.2091 19.7909 34 22 34C24.2091 34 26 32.2091 26 30Z" stroke="#94100C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  </View>
)
