import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import * as REQUEST_STATE from '../../constants/request';

const refreshStyle = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

/**
 * This is a high order component that you can wrap around other components
 * It determines whether it should render it's children, a spinner or an error message.
 */
class WithLoading extends Component {
  renderComponentBasedOnLoadingState() {
    switch (this.props.loadingState) {
      case REQUEST_STATE.PENDING:
        return (
          <div style={refreshStyle.container}>
            <RefreshIndicator
              size={200}
              left={10}
              top={0}
              status="loading"
              style={refreshStyle.refresh}
            />
            <h2>{this.props.message}</h2>
        </div>
        );
      case REQUEST_STATE.ERROR:
        return <h1> ERROR! </h1>;
      default:
        return this.props.children;
    }
  }

  render() {
    return this.renderComponentBasedOnLoadingState();
  }
}

WithLoading.propTypes = {
  loadingState: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  message: PropTypes.string
};

WithLoading.defaultProps = {
  children: <div />
};

export default WithLoading;