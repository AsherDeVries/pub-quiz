import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as GAME_STATE from '../constants/gameState';
import * as REQUEST from '../constants/request';
import StartGameContainer from './StartGameContainer';
import AcceptTeamContainer from './AcceptTeamContainer';
import CategoryQuestionOverviewContainer from './CategoryQuestionOverviewContainer';
import ReviewAnswerContainer from './ReviewAnswerContainer';
import NewRoundEndGameContainer from './NewRoundEndGameContainer';
import WithLoading from '../components/shared/WithLoading';

import Flex from 'react-uikit-flex';

class GameContainer extends Component {
  renderPageBasedOnGameState() {
    switch (this.props.gameState) {
      case GAME_STATE.WAITING_FOR_NEXT_QUESTION:
        return (
          <Flex center middle viewport>
            <WithLoading loadingState={REQUEST.PENDING} message="Waiting for next question" />
          </Flex>
        );
      case GAME_STATE.CHECKING_ANSWERS:
        return <ReviewAnswerContainer />;
      case GAME_STATE.CREATING_NEW_ROUND:
        return <CategoryQuestionOverviewContainer />;
      case GAME_STATE.END:
        return (
          <Flex center middle viewport>
            <h1>Game finished!</h1>;
          </Flex>
        );
      case GAME_STATE.NEW_ROUND_PENDING:
        return <NewRoundEndGameContainer />;
      case GAME_STATE.WAITING_FOR_APPLICANTS:
        return <AcceptTeamContainer />;
      default:
        return <StartGameContainer />;
    }
  }

  render() {
    return (
      <div>
        {this.renderPageBasedOnGameState()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gameState: state.gameStateReducer.gameState,
  };
}

GameContainer.propTypes = {
  gameState: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(GameContainer);
