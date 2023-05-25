/**
 * Renders the {url}/profile page.
 */

import styles from '@/styles/Home.module.css';
import { Sidebar } from '../components/sidebar';
import { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User } from 'firebase/auth';

export default function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false); // testing

  const auth = useContext(AuthContext);

  const handleSubmit = async (e: any): Promise<User | null> => {
    e.preventDefault();
    setSubmitted(!submitted); // testing
    const user = await auth.login(email, password);
    return user;
  };

  return (
    <>
      <main className={styles.main}>
        <Sidebar currentPage={'/profile'} />
        <div>{'This is the profile page!'}</div>

        <form className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="email"
            className="name"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div>
            <input
              type="password"
              placeholder="password"
              className="name"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="login-button">
            <button onClick={handleSubmit}>Sign in</button>
          </div>
        </form>

        {auth.user == null ? (
          <p>no auth.user</p>
        ) : (
          <p>auth.user is {auth.user.email}</p>
        )}

        {/* testing */}
        {submitted ? <p>submitted</p> : <p>not submitted</p>}
      </main>
    </>
  );
}
