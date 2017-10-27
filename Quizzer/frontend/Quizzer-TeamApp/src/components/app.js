import React from 'react';
import PropTypes from 'prop-types';

import LayoutContainer from '../containers/LayoutContainer';

class App extends React.Component {
  render() {
    return (
      <div>
        <LayoutContainer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
