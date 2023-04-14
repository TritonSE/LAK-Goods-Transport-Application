import React, { useState } from 'react';
import Image from 'next/image';

import LAKTAAlogo from '../../public/Logo.svg';
import eyeOpenLogo from '../../public/open-eye.svg';
import eyeClosedLogo from '../../public/closed-eye.svg';

import styles from '@/styles/Login.module.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.outer}>
      <Image src={LAKTAAlogo} alt="LAKTAAlogo" className={styles.logo} />

      <div className={styles.formContainer}>
        <div className={styles.formAllContents}>
          <form>
            <div className={styles.emailPassword}>
              <input
                type="email"
                placeholder="Email"
                className={`${styles.textInputField} ${styles.emailInput}`}
                required
              />
              <p>
                <input
                  placeholder="Password"
                  className={`${styles.textInputField} ${styles.passwordInput}`}
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
              <div className={styles.keepSignedIn}>
                <input className={styles.checkbox} type="checkbox" />
                <span className={styles.keepSignedInText}>
                  Keep me signed in
                </span>
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
    </div>
  );
}