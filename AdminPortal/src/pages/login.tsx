import React, { useState } from 'react';
import Image from 'next/image';

import LAAKTAlogo from '../../public/LAAKTAlogo.png';
import eyeOpenLogo from '../../public/open-eye.svg';
import eyeClosedLogo from '../../public/closed-eye.svg';
import { Martian_Mono } from '@next/font/google';

import styles from "@/styles/Login.module.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.outer}>
      <Image
        src={LAAKTAlogo}
        alt="LAAKTAlogo"
        className={styles.LAAKTAlogo}
      />

      <div className={styles.formContainer}>
        <form>
          <div className={styles.emailPassword}>
            <input
              type="email"
              placeholder="Email"
              className={styles.emailInput}
              required
            />
            <p>
              <input
                placeholder="Password"
                className={styles.passwordInput}
                type={showPassword ? 'text' : 'password'}
                required
              />

              <Image
                onClick={() => setShowPassword((prevState) => !prevState)}
                src={showPassword ? eyeOpenLogo : eyeClosedLogo}
                alt="passwordLogo"
                className={styles.passwordLogo}
              />
            </p>
          </div>

          <div className={styles.rememberUserAndForgotPassword}>
            <div>
              <input className={styles.checkbox} type="checkbox" />
              <span className={styles.keepSignedInText}>Keep me signed in</span>
            </div>
            <a href="#" className={styles.forgotPasswordText}>
              Forgot password
            </a>
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
