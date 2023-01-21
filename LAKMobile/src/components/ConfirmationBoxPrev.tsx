/**
 * Apply to job?
 * 
 * Be sure to contact <Client> at <phone number>
 * 
 * cancel, apply
 */

import React, { useEffect, useState } from "react";
import { JobData } from "../api";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Modal } from "react-native";
import { ModalCheckmark } from "./ModalCheckmark";
import { wrap } from "lodash";

const TIMEOUT = 2000;

interface ConfirmationBoxProps {
    visible: boolean;
    onTimeout: () => void;
}

export const ConfirmationBoxPrev = ({visible, onTimeout}: ConfirmationBoxProps) => {

    // Defining the state variables
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
    if (visible && !timerRunning) {
        setTimeout(() => {
            setTimerRunning(false);
            onTimeout();
        }, TIMEOUT);
        setTimerRunning(true);
        }
    }, [visible, onTimeout, timerRunning]); 

    const clientName = ((jobDataObject : JobData) => {
        return jobDataObject.clientName;
    });

    const clientPhoneNumber = ((jobDataObject : JobData) => {
        return jobDataObject.phoneNumber;
    });


    /**
     * This function is called when the "Accept" button is clicked.
     * If clicked, the checkmark icon should be displayed underneath 
     * the current box.
     * 
     * @returns True, indication that the user has accepted the job
     */
    const displayCheckmark = () => {
        
        // TODO

        // make a call to the ModalCheckmark() specifying the visible and onTimeOut arguments
        // in order to make the checkmark show up on the screen
        
        return true;
    }

    /**
     * This function is called when the "Cancel" button is clicked.
     * If clicked, the current component should be removed and the user should be 
     * taken back to the previous screen. 
     * 
     * @returns False, indicating that the user has refused to take up the job
     */
    const cancelConfirmationAction = () => {
        
        // TODO

        return false;
    }


    return (

        <Modal animationType="fade" transparent visible={visible}>
            <View style={styles.modalWrapper}>
                <View style={styles.modalBox}>

                    <div className="confirmationBox">
            
                        <h3 className="heading">Apply to Job?</h3>

                        <p className="mainBody">
                            By clicking confirm, you are agreeing to accept this job. Be sure to contact ${clientName} at 
                            the phone number ${clientPhoneNumber}.
                        </p>

                        <div className="buttons">
                            <button className="Apply" onClick={displayCheckmark}>
                                Apply
                            </button>

                            <button className="Cancel" onClick={cancelConfirmationAction}>
                                Cancel
                            </button>
                        </div>

                    </div>


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
      height: 284,
      backgroundColor: "#f5f5f5",
      justifyContent: "center",
      alignItems: "center",
      elevation: 4,
    },

    confirmationBox: {
        paddingTop: "33px",
        paddingBottom: "33px",
        paddingRight: "72px",
        paddingLeft: "72px",
    },

    heading :{
        color: "#5A5A5A",
        alignContent: "center",
        fontFamily: "Roboto",
        flexWrap: "wrap",
        paddingBottom: "47px",
    },

    maindBody: {
        color: "#D3D3D3",
        alignContent: "center",
        paddingBottom: "105px",
    },



});  