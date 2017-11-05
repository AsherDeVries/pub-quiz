import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Flex from 'react-uikit-flex';
import Button from 'react-uikit-button';

import WithLoading from '../components/shared/WithLoading';
import { login } from '../actions/loginActions';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamName: "",
      password: ""
    };
  }

  handleTeamNameChange(teamName) {
    this.setState({
      teamName
    });
  }

  handlePasswordChange(password) {
    this.setState({
      password
    });
  }

  handleLogin() {
    this.props.login(this.state.teamName, this.state.password);
  }

  render() {
    return (
      <Flex center middle viewport row="wrap" direction="column">
        <WithLoading loadingState={this.props.session.loginState.requestStatus} message={this.props.session.loginState.message} >
          <TextField
            id="text-field-controlled"
            value={this.state.teamName}
            floatingLabelText="Name your team"
            onChange={(event) => this.handleTeamNameChange(event.target.value)}
          />
          <br />
          <TextField
            id="text-field-controlled"
            value={this.state.password}
            floatingLabelText="Quiz code"
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
    session: state.sessionReducer
  };
}

LoginContainer.propTypes = {
  session: PropTypes.object,
  login: PropTypes.func
};
export default connect(mapStateToProps, {login})(LoginContainer);
