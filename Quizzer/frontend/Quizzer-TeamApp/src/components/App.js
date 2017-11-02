import React from 'react';
import PropTypes from 'prop-types';

import LayoutContainer from '../containers/LayoutContainer';
import AnswerQuestion from './AnswerQuestion'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
      {/*<LayoutContainer />*/}
      <AnswerQuestion category="huiewgew" question="gnewuigew"/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
