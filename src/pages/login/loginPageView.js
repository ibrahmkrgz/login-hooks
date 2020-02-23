import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './loginPageStyles.scss';

import { setLoadingTrue } from '../../redux/action';

const LoginPage = ({ history, setLoadingTrue }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [auth, setAuth] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const handleSubmit = async e => {
    e.preventDefault();

    setSubmitted(true);
    setAuth(true);
    if (username === 'admin' && password === 'admin') {
      await setLoadingTrue();
      const user = {
        username,
        password,
      };
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/');
    }
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Login</h1>
        <form name="form" onSubmit={handleSubmit}>
          {submitted && auth && username && password && (
            <div className="help-block">Username or password is incorrect</div>
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={e => setUserName(e.target.value)}
            required
            ref={inputRef}
            autoComplete="on"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="on"
          />
          <button type="submit" className="btn btn-primary btn-block btn-large">
            GO
          </button>
        </form>
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  setLoadingTrue: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setLoadingTrue,
};

export default connect(null, mapDispatchToProps)(LoginPage);
