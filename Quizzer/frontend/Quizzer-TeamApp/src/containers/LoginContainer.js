import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

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
      <div>
        <WithLoading loadingState={this.props.session.loginState.requestStatus} >
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
    session: state.sessionReducer
  };
}

LoginContainer.propTypes = {
  session: PropTypes.object,
  login: PropTypes.func
};

export default connect(mapStateToProps, {login})(LoginContainer);