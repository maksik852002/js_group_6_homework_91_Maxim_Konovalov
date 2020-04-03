import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/usersActions";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { NavLink } from "react-router-dom";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  inputChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitFormHandler = event => {
    event.preventDefault();
    this.props.loginUser({ ...this.state });
  };

  render() {
    return (
      <div className="regWrap">
      <div className="register-body">
        <div className="register-header">
          <button
            className="register-goBack"
            onClick={this.props.history.goBack}
          >
            {<MdKeyboardArrowLeft color="white" size="28px" />}
          </button>
          {this.props.match.url === "/login" && (
            <NavLink className="register-link" to="/register">
              Register
            </NavLink>
          )}
        </div>
        <form onSubmit={this.submitFormHandler}>
          <div className="form-group pt-3">
            <input
              onChange={this.inputChangeHandler}
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Enter username"
              className={
                !this.props.error ? "form-control" : "form-control is-invalid"
              }
            />
            <div className={this.props.error && "invalid-feedback d-block"}>
              {this.props.error && this.props.error.error}
            </div>
          </div>
          <div className="form-group pt-3">
            <input
              onChange={this.inputChangeHandler}
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Enter password"
              className={
                !this.props.error ? "form-control" : "form-control is-invalid"
              }
            />
            <div className={this.props.error && "invalid-feedback d-block"}>
              {this.props.error && this.props.error.error}
            </div>
          </div>
          <div className="form-group pt-3">
            <button type="submit" className="register-submit">
              {this.props.loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="pl-1">Loading...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.users.logLoading,
  error: state.users.logError
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
