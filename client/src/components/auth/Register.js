import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const Register = ({ isAuthenticated, register, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    error: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dash/home" />;
  }

  return (
    <div className="reg-wrapper">
      <div className="box-container">
        <h1>REGISTER</h1>
        {error.id === 'REGISTER_FAIL' ? (
          <div className="alert">{error.msg.errors[0].msg}</div>
        ) : null}
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="inputBox">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              // required
              placeholder="USERNAME"
            />
          </div>
          <div className="inputBox">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              // required
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
              value="Register"
              className="btn btn-white btn-animation-1"
            />
            <br></br>
            <button className="btn btn-white btn-animation-1">
              <Link to="/login">Login</Link>
            </button>
          </section>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { register })(Register);
