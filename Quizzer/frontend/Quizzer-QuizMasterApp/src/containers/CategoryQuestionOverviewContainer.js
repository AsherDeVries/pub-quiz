import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CategoryQuestionOverviewContainer extends Component {
  render() {
    return (
      <div>
        Select Categories, Select Question 
        {this.props.availableCategories}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    availableCategories: state
  };
}

CategoryQuestionOverviewContainer.propTypes = {
  availableCategories: PropTypes.array
};

export default connect(mapStateToProps)(CategoryQuestionOverviewContainer);