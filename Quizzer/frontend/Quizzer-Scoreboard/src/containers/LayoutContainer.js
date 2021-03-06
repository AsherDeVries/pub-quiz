import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NotFoundPageComponent from '../components/NotFoundPageComponent';
import LoginContainer from './LoginContainer';
import ScoreboardContainer from './ScoreboardContainer';

class LayoutContainer extends Component {
  constructor(props) {
    super(props);
  }

  renderGameIfLoggedIn() {
    if (this.props.isLoggedIn) {
      return  <ScoreboardContainer />;
    }
    else {
      return  <Redirect to="/" />;
    }
  }

  renderLoginIfNotLoggedIn() {
    if (!this.props.isLoggedIn) {
      return <LoginContainer />;
    }
    else {
      return  <Redirect to="/scoreboard" />;
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => this.renderLoginIfNotLoggedIn()} />
          <Route path="/scoreboard" render={() => this.renderGameIfLoggedIn()}/>
          <Route component={NotFoundPageComponent} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.sessionReducer.isLoggedIn
  };
}

LayoutContainer.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default withRouter(connect(mapStateToProps)(LayoutContainer));
