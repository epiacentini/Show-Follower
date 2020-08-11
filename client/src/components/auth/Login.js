import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { connect } from 'react-redux';

const Login = ({ login, isAuthenticated, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    error: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dash/home" />;
  }

  return (
    <div className="reg-wrapper">
      <div className="box-container">
        <h1>Login</h1>
        {error.id === 'LOGIN_FAIL' ? (
          <div className="alert">{error.msg.errors[0].msg}</div>
        ) : null}
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="inputBox">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              //required
              placeholder="EMAIL"
            />
          </div>
          <div className="inputBox">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              //required
              placeholder="PASSWORD"
            />
          </div>
          <section className="btns">
            <input
              type="submit"
              name=""
              value="Login"
              className="btn btn-white"
            />
            <br></br>
            <button className="btn btn-white">
              <Link to="/">Register</Link>
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
export default connect(mapStateToProps, { login })(Login);
