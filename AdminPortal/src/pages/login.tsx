import React, { useContext, useState } from 'react';
import Image from 'next/image';

import LAKTAAlogo from '../../public/Logo.svg';
import eyeOpenLogo from '../../public/open-eye.svg';
import eyeClosedLogo from '../../public/closed-eye.svg';

import styles from '@/styles/Login.module.css';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';

export default function Login() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>('');
  const [password, setPassword] = useState('');

  const login = async () => {
    setError('');
    const user = await auth.login(email, password);
    console.log('here');
    if (user instanceof Error) {
      setError(auth.error?.message);
    } else {
      router.push('/dashboard');
    }
  };

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p>
                <input
                  placeholder="Password"
                  className={`${styles.textInputField} ${styles.passwordInput}`}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <button
              type="button"
              onClick={login}
              className={styles.loginButton}
            >
              Login
            </button>
          </form>
          <div className={styles.error}>{error}</div>
        </div>
      </div>
    </div>
  );
}
