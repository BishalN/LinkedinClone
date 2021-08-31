import React from 'react';
import { FcGoogle } from 'react-icons/fc';

import { useState } from 'react';
import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Layout } from '../components/Layout';
import LogoSvg from '../components/LogoSvg';
import firebase from '../utils/initFirebase';
import { userPostRegisterActions } from '../utils/userPostRegister';
import { useHistory } from 'react-router-dom';

export const Login: React.FC = ({}) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ code: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSignInWithGoogle = () => {
    setError({ code: '', message: '' });

    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (value) => {
        const isNewUser = value.additionalUserInfo?.isNewUser;
        if (isNewUser) {
          await userPostRegisterActions(value);
        }

        history.push(`/`);
      })
      .catch((err) => setError(err));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({ code: '', message: '' });
    setLoading(true);

    if (email.length === 0) {
      return setError({ message: 'Email is required', code: 'email/required' });
    } else if (password.length === 0) {
      return setError({
        message: 'Password is required',
        code: 'password/required',
      });
    }

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then((value) => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((value) => {
            history.push(`/`);
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
          });
      });
  };
  return (
    <Layout>
      <nav className='flex mt-5 justify-between items-center px-2'>
        <LogoSvg />
        <div className='flex space-x-2 sm:space-x-10'>
          <Button variant='ghost' onClick={() => history.push('/register')}>
            Join Now
          </Button>
          <Button variant='outlined'>Sign in</Button>
        </div>
      </nav>

      <main className='mt-20 flex w-screen px-2'>
        <section id='Login' className=''>
          <h1 className='text-blue-500 text-2xl text-center sm:text-left  sm:text-5xl max-w-lg leading-snug '>
            Welcome to your professional community
          </h1>

          <form
            onSubmit={handleSubmit}
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            className='mt-10 flex flex-col space-y-5 max-w-md'
          >
            {error.message.length > 0 && (
              <Alert variant='failure' message={error.message} />
            )}
            <Input
              type='text'
              placeholder='Email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button variant='filled' type='submit' loading={loading}>
              Sign in
            </Button>
            <Button
              variant='outlined'
              type='button'
              onClick={handleSignInWithGoogle}
              icon={<FcGoogle size={30} />}
            >
              Sign in google
            </Button>
          </form>
        </section>

        <img
          src='https://static-exp1.licdn.com/sc/h/dxf91zhqd2z6b0bwg85ktm5s4'
          className='hidden lg:block max-w-xl ml-20 -mt-5'
          alt='ShowCase'
        />
      </main>
    </Layout>
  );
};
