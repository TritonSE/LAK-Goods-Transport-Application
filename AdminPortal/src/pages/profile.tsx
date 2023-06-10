import styles from '@/styles/Home.module.css';
import { Sidebar } from '../components/sidebar';
import { useState, useContext } from 'react';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { User, getAuth } from 'firebase/auth';

export default function Profile() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [firstName, setFirstName] = useState(' ');
  const [lastName, setLastName] = useState(' ');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const auth = useContext(AuthContext);

  const login = async (e: any): Promise<User | null> => {
    e.preventDefault();
    const user = await auth.login(loginEmail, loginPassword);
    return user;
  };

  const signup = async (e: any): Promise<User | null> => {
    e.preventDefault();
    const user = await auth.signup(
      firstName,
      lastName,
      signupEmail,
      signupPassword
    );
    return user;
  };

  const logout = async (e: any) => {
    e.preventDefault();
    auth.logout();
  };

  const deleteUser = async (e: any) => {
    e.preventDefault();
    const user = await auth.removeUser();
  };

  return (
    <main className={styles.main}>
      <Sidebar currentPage={'/profile'} />
      <div>{'This is the profile page!'}</div>
      {/* LOGIN  */}
      <form className="form" onSubmit={login}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="email"
          className="name"
          onChange={(e) => setLoginEmail(e.target.value)}
          value={loginEmail}
        />

        <input
          type="password"
          placeholder="password"
          className="name"
          onChange={(e) => setLoginPassword(e.target.value)}
          value={loginPassword}
        />

        <div className="login-button">
          <button onClick={login}>Login</button>
        </div>
      </form>

      {/* SIGNUP */}
      <form className="form" onSubmit={signup}>
        <h2>Sign up</h2>
        <input
          type="text"
          placeholder="First name"
          className="name"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />

        <input
          type="text"
          placeholder="Last name"
          className="name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />

        <input
          type="email"
          placeholder="email"
          className="name"
          onChange={(e) => setSignupEmail(e.target.value)}
          value={signupEmail}
        />

        <input
          type="password"
          placeholder="password"
          className="name"
          onChange={(e) => setSignupPassword(e.target.value)}
          value={signupPassword}
        />

        <div className="login-button">
          <button onClick={signup}>Sign up</button>
        </div>
      </form>

      {/* LOGOUT */}
      <div className="login-button">
        <button onClick={logout}>Log out</button>
      </div>

      {/* DELETE USER */}
      <form className="form" onSubmit={login}>
        <h2>Delete user</h2>
        <div className="login-button">
          <button onClick={deleteUser}>Delete User</button>
        </div>
      </form>
      {auth.user ? (
        <p>
          auth.user is {auth.user.displayName} {auth.user.email}
        </p>
      ) : (
        <p>no auth.user</p>
      )}
    </main>
  );
}
