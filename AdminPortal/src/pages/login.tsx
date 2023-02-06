import React, { useState } from 'react';
import Image from 'next/image';

import LAAKTAlogo from '../images/LAAKTAlogo.png';
import eyeOpenLogo from '../images/openeye.png';
import eyeClosedLogo from '../images/closedeye.png';
import { Martian_Mono } from '@next/font/google';

const styles = {
  LAAKTAlogo: {
    width: '445.31px',
    height: '445.31px',
    position: 'absolute',
    left: '147px',
    top: '206px',
  },

  formContainer: {
    position: 'absolute',
    width: '554.91px',
    height: '496.64px',
    left: '756.71px',
    top: '247.62px',

    background: '#FFFFFF',
    'box-shadow': '0px 8.32361px 41.6181px rgba(0, 0, 0, 0.25)',
    'border-radius': '27.7454px',
  },

  emailPassword: {
    display: 'flex',
    'flex-direction': 'column',
  },

  emailInput: {
    'box-sizing': 'border-box',
    background: '#FFFFFF',
    color: 'black',
    border: '1.38727px solid #C4C4C4',
    width: '416.18px',
    height: '38.84px',
    margin: '69.36px 69.36px 0px 69.36px',
    'padding-left': '10px',
    'border-radius': '5px',
  },

  passwordInput: {
    'box-sizing': 'border-box',
    background: '#FFFFFF',
    color: 'black',
    border: '1.38727px solid #C4C4C4',
    width: '416.18px',
    height: '38.84px',
    margin: '15.26px 69.36px 0px 69.36px',
    'padding-left': '10px',
    'border-radius': '5px',
  },

  loginButton: {
    width: '416px',
    height: '45px',

    background: '#94100C',

    margin: '17.04px 69.36px 0px 69.36px',

    color: 'white',

    'border-radius': '5px',

    cursor: 'pointer',
  },

  rememberUserAndForgotPassword: {
    display: 'flex',
    margin: '18.03px 69.36px 0px 69.36px',
  },

  checkbox: {
    'box-sizing': 'border-box',
    width: '16.65px',
    height: '16.65px',
    border: '1.38727px solid #000000',
    margin: '0px 7px 0px 0px',
    cursor: 'pointer',
  },

  keepSignedInText: {
    'font-family': 'Lato',
    'font-style': 'normal',
    'font-weight': '400',
    'font-size': '16.6472px',
    'line-height': '20px',
    color: 'black',
    'letter-spacing': '0.2px',
  },

  forgotPasswordText: {
    'font-family': 'Lato',
    'font-style': 'normal',
    'font-weight': '400',
    'font-size': '16.6472px',
    'line-height': '20px',
    color: 'black',
    align: 'right',
    'margin-left': 'auto',
    'letter-spacing': '0.2px',
  },

  passwordLogo: {
    width: '20px',
    height: '17px',
    cursor: 'pointer',
    'margin-left': '-105px',
    'padding-top': '4px',
  },
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={styles.main}>
      <Image
        src={LAAKTAlogo}
        alt="LAAKTAlogo"
        className="LAAKTAlogo"
        style={styles.LAAKTAlogo}
      />

      <div className="formContainer" style={styles.formContainer}>
        <form>
          <div style={styles.emailPassword}>
            <input
              type="email"
              placeholder="Email"
              style={styles.emailInput}
              required
            />
            <p>
              <input
                placeholder="Password"
                style={styles.passwordInput}
                type={showPassword ? 'text' : 'password'}
                required
              />

              <Image
                onClick={() => setShowPassword((prevState) => !prevState)}
                src={showPassword ? eyeOpenLogo : eyeClosedLogo}
                alt="passwordLogo"
                className="passwordLogo"
                style={styles.passwordLogo}
              />
            </p>
          </div>

          <div style={styles.rememberUserAndForgotPassword}>
            <div>
              <input style={styles.checkbox} type="checkbox" />
              <span style={styles.keepSignedInText}>Keep me signed in</span>
            </div>
            <a href="#" style={styles.forgotPasswordText}>
              Forgot password
            </a>
          </div>

          <button type="submit" style={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
