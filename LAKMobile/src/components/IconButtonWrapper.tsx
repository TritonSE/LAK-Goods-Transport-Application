import React, { PropsWithChildren } from 'react';
import { TouchableOpacity, StyleProp, ViewStyle, TouchableOpacityProps } from 'react-native';


/**
 * Button Wrapper
 */
 type IconButtonWrapperProps = PropsWithChildren<TouchableOpacityProps> & {
    style?: StyleProp<ViewStyle>;
}
export function IconButtonWrapper({ onPress, style, children }: IconButtonWrapperProps) {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            {children}
        </TouchableOpacity>
    )
}
