import React, { useEffect, useState } from "react";
import { JobData } from "../api";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Modal } from "react-native";
import { ModalCheckmark } from "./ModalCheckmark";
import { wrap } from "lodash";
import { AppButton } from "./AppButton";
import { AppText } from "./AppText";
import { COLORS } from "../../constants";

const TIMEOUT = 2000;

interface ConfirmationBoxProps {
    title: string;
    body: string;
    acceptName: string;
    rejectName: string;
    rejectVisible: boolean;
    checkMarkAppear: boolean;
    onAccept: () => void;
    onReject: () => void;
}

export const ConfirmationBox = ({title, body, acceptName, rejectName, onAccept, onReject, rejectVisible, checkMarkAppear}: ConfirmationBoxProps) => {
    const [checkmarkVisible, setCheckmarkVisible] = useState(false);

    return (

        <Modal animationType="fade" transparent = {true}>
            <View style={styles.modalWrapper}>
                <View style={styles.modalBox}>
            
                    <AppText style={styles.heading}>{title}</AppText>

                    <AppText style={[styles.body]}>{body}</AppText>

                    <View style={styles.buttonContainer}>
                        { rejectVisible ? 
                        (<AppButton 
                            style={styles.rejectButton}
                            textStyle={styles.grey}
                            type='primary'
                            title={rejectName} 
                            onPress={onReject}/>) : null }

                        <AppButton 
                            style={styles.acceptButton}
                            textStyle={styles.red}
                            type='primary'
                            title={acceptName} 
                            onPress={() => {
                              checkMarkAppear ? (
                              setCheckmarkVisible(true)
                              ) : onAccept()   
                            }}/>

                    </View>
                    
                    { checkmarkVisible ? (<ModalCheckmark
                        visible={true}
                        onTimeout={() => {
                            onAccept(); 
                            // We call onReject to clean up the modal after the checkmark is displayed
                            onReject();
                        }}
                    />): null}
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
      backgroundColor: "transparent",
      //backfaceVisibility: "visible"
    },
    
    modalBox: {
      width: 320,
      height: 284,
      backgroundColor: "#f5f5f5",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      elevation: 4,
      
    },

    heading :{
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: "center"
    },

    body: {
        fontSize: 16,
        textAlign: "center",
        
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },

    rejectButton: {
        width: 130,
        marginRight: 20,
        backgroundColor: "transparent",
        elevation: 0,
    },

    acceptButton: {
        width: 130,
        backgroundColor: "transparent",
        elevation: 0,
    },

    grey: {
        color: COLORS.darkGrey
    },

    red: {
        color: COLORS.red
    },
});  