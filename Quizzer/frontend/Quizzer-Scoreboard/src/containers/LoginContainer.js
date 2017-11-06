import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Button from 'react-uikit-button';
import Flex from 'react-uikit-flex';

import WithLoading from '../components/shared/WithLoading';
import { login } from '../actions/loginActions';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: ""
    };
  }

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
      <Flex center middle viewport row="wrap" direction="column">
        <WithLoading loadingState={this.props.loginState} >
          <TextField
            id="text-field-controlled"
            value={this.state.password}
            type="password"
            floatingLabelText="Password"
            onChange={(event) => this.handlePasswordChange(event.target.value)}
          />
          <br />
          <Button
            size="large"
            body="Login"
            context="primary"
            margin="bottom"
            onClick={() => this.handleLogin()}
          />
        </WithLoading>
      </Flex>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginState: state.sessionReducer.loginState
  };
}

LoginContainer.propTypes = {
  loginState: PropTypes.string,
  login: PropTypes.func
};

export default connect(mapStateToProps, {login})(LoginContainer);
