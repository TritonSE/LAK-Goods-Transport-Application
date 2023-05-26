import styles from '@/styles/Home.module.css';
import { Sidebar } from '../components/sidebar';
import { useState, useContext } from 'react';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { User } from 'firebase/auth';

export default function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false); // testing

  const auth = useContext(AuthContext);

  const handleSubmit = async (e: any): Promise<User | null> => {
    e.preventDefault();
    setSubmitted(!submitted); // testing
    // console.log("idk what to put here");
    const user = await auth.login(email, password);
    // console.log(user); // not printing
    // console.log("nur");  // not printing
    return user;
  };

  return (
    <AuthProvider>
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

        {auth.user ? (
          <p>auth.user is {auth.user.email}</p>
        ) : (
          <p>no auth.user</p>
        )}

        {/* testing */}
        {submitted ? <p>submitted</p> : <p>not submitted</p>}
      </main>
    </AuthProvider>
  );
}
