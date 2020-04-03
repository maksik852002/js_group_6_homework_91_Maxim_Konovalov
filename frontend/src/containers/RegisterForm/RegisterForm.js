import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/usersActions";
import {MdKeyboardArrowLeft} from "react-icons/md"
import './RegisterForm.css'

class RegisterForm extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    phone: "",
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitFormHandler = event => {
    event.preventDefault();
    this.props.registerUser({ ...this.state })
  };

  getFieldError = fieldName => {
    try {
      return this.props.error.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  render() {
    return (
      <div className="regWrap">
      <div className="register-body">
        <div className="register-header">
          <button className='register-goBack' onClick={this.props.history.goBack}>{<MdKeyboardArrowLeft color="white"  size="28px"/>}</button>
        </div>
        <form onSubmit={this.submitFormHandler}>
          <div className="form-group pt-3">
            <input
              onChange={this.inputChangeHandler}
              type="text"
              name="username"
              value={this.state.username}
              placeholder='Enter username'
              className={
                !this.props.error ? "form-control" : "form-control is-invalid"
              }
            />
            <div className={this.props.error && "invalid-feedback d-block"}>
              {this.getFieldError("username")}
            </div>
          </div>
          <div className="form-group pt-3">
            <input
              onChange={this.inputChangeHandler}
              type="password"
              name="password"
              value={this.state.password}
              placeholder='Enter password'
              className={
                !this.props.error ? "form-control" : "form-control is-invalid"
              }
            />
            <div className={this.props.error && "invalid-feedback d-block"}>
              {this.getFieldError("password")}
            </div>
          </div>
          <div className="form-group pt-3">
            <button type="submit" className="register-submit">
              {this.props.loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="pl-1">Loading...</span>
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
      </div>
    )
  };
};

const mapStateToProps = state => ({
  loading: state.users.regLoading,
  error: state.users.regError
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
