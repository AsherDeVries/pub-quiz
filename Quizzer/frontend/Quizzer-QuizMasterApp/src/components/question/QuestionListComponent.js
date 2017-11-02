import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { blue300, indigo900 } from 'material-ui/styles/colors';

import QuestionListItem from './QuestionListItem';

const styles = {
  chip: {
    margin: "0 auto",
  },
  subheading: {
    padding: 0
  }
};

class QuestionListComponent extends Component {

  constructor(props) {
    super(props);

    this.selectQuestion = this.selectQuestion.bind(this);
    this.deselectQuestion = this.deselectQuestion.bind(this);
  }

  selectQuestion(selectedQuestion) {
    this.props.selectQuestion(selectedQuestion);
  }

  deselectQuestion(deselectedQuestion) {
    this.props.deselectQuestion(deselectedQuestion);
  }

  renderCategoryChip() {
    return (
      <Chip
        backgroundColor={blue300}
        style={styles.chip}
      >
        {this.props.category}
      </Chip>
    );
  }

  render() {
    return (
        <List>
          <Subheader style={styles.subheading}>{this.renderCategoryChip()}</Subheader>
          {
            this.props.questions.map(question => {
              return (
                <QuestionListItem
                  key={question.id}
                  question={question}
                  selectQuestion={this.selectQuestion}
                  deselectQuestion={this.deselectQuestion}
                />
              );
            })
          }

        </List>

    );
  }
}

QuestionListComponent.propTypes = {
  category: PropTypes.string,
  questions: PropTypes.array,
  selectQuestion: PropTypes.func,
  deselectQuestion: PropTypes.func
};

export default QuestionListComponent;
