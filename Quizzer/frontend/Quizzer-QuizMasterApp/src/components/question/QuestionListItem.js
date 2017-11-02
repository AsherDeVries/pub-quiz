import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Panel from 'react-uikit-panel';

const styles = {
  selected: {
    backgroundColor: '#ccffcc'
  },
  notSelected: {
    backgroundColor: '#ccc'
  },
  breakWord: {
    wordwrap: "break-word"
  }
};

class QuestionListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };

    this.updateCheck = this.updateCheck.bind(this);
  }

  updateCheck() {
    const { question } = this.props;
    this.setState({
      selected: !this.state.selected
    }, () => {
      (this.state.selected) ? this.props.selectQuestion(question) : this.props.deselectQuestion(question);
    });
  }

  render() {
    return (
        <Panel margin="top">
          <ListItem
            primaryText={this.props.question.id}
            onClick={this.updateCheck}
            style={this.state.selected ? styles.selected : styles.notSelected}
          />
        </Panel>
    );
  }
}

QuestionListItem.propTypes = {
  selectQuestion: PropTypes.func,
  deselectQuestion: PropTypes.func,
  question: PropTypes.object
};

export default QuestionListItem;
