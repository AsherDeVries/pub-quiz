import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import WithLoading from '../components/shared/WithLoading';

class GameContainer extends Component {
  render() {
    return (
      <div>
        <WithLoading loadingState="">
          <h1>Welcome {this.props.teamName}</h1>
        </WithLoading>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teamName: state.sessionReducer.teamName,
    loadingState: "IDLE",
    loadingMessage: ""

  };
}

GameContainer.propTypes = {
  teamName: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(GameContainer);