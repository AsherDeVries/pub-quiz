import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import WithLoading from '../components/shared/WithLoading';
import { login } from '../actions/loginActions';

class LoginContainer extends Component {
  handlePasswordChange(password) {
    this.setState({
      password
    });
  }

  handleLogin() {
    this.props.login(this.state.password);
  }

  render() {
    return (
      <div>
        <WithLoading loadingState={this.props.loginState.requestStatus} message={this.props.loginState.message} >
          <TextField
            id="text-field-controlled"
            value=""
            type="password"
            floatingLabelText="Password"
            onChange={(event) => this.handlePasswordChange(event.target.value)}
          />
          <br />
          <FlatButton
            label="Login"
            labelPosition="before"
            primary={true}
            onClick={() => this.handleLogin()}
          />
          </WithLoading >
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginState: state.sessionReducer.loginState
  };
}

LoginContainer.propTypes = {
  loginState: PropTypes.object,
  login: PropTypes.func
};

export default connect(mapStateToProps, {login})(LoginContainer);
