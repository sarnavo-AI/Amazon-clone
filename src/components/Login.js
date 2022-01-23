import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../assets/css/Login.css'
import { useStateValue } from '../contextAPI/StateProvider';
import { auth } from '../Firebase';

function Login() {
  const history = useHistory();
  const [state, dispatch] = useStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = e => {
    e.preventDefault();
    auth
        .signInWithEmailAndPassword(email, password)
        .then(auth => {
          console.log("Signed In");
          history.push('/')
          console.log(auth)
          dispatch({
            // logged in
            type: "SET_USER",
            user: auth
          })
        })
        .catch(error => alert(error.message))
  }

  const register = e => {
    e.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((auth) => {
      //Success
      console.log("Successfully created an account");
      if(auth) {
        history.push('/')
        dispatch({
          // logged in
          type: "SET_USER",
          user: auth
        })
      }
    })
    .catch(error => alert(error.message))
  }

  return (
        <div className='login'>
            <Link to='/'>
            <img 
              className='login__logo'
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
              alt=''
            />
            </Link>

            <div className='login__container'>
              <h1>Sign-in</h1>

              <form>
                <h5>Email or mobile phone number</h5>
                <input 
                  type="text" 
                  value={email}
                  placeholder='Enter your Email'
                  onChange={e => setEmail(e.target.value)}
                />

                <h5>Password</h5>
                <input 
                  type="password"
                  value={password}
                  placeholder='Enter your Password'
                  onChange={e => setPassword(e.target.value)} 
                />

                <button 
                  type='submit'
                  onClick={signIn}
                  className='login__signInButton'>
                    Sign In
                </button>
              </form>

              <p>
              By continuing, you agree to 
              Amazon's <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=200545940'>Conditions of Use </a> 
              and <a href='https://www.amazon.in/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=200534380'>Privacy Notice</a>.
              </p>

              <button
                onClick={register} 
                className='login__registerButton'>
                  Create your Amazon Account
              </button>
            </div>
        </div>
  );
}

export default Login;
