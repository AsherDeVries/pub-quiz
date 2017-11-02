import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import Done from 'material-ui/svg-icons/action/done';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off';

const styles = {
  thumbOff: {
    backgroundColor: '#ea0202',
  },
  thumbSwitched: {
    backgroundColor: 'green',
  },
  trackOff: {
    backgroundColor: '#ffb5b5',
  },
  trackSwitched: {
    backgroundColor: '#86f996',
  },
  done: {
    color: 'green'
  },
  highlight: {
    color: '#ea0202'
  }
};

class TeamWidgetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  renderCardActions() {
    return (
      <CardText>
        <h3>Answer: {this.props.answer.text}</h3>
        <Toggle
          toggled={this.state.toggled}
          onToggle={this.handleToggle}
          thumbStyle={styles.thumbOff}
          trackStyle={styles.trackOff}
          thumbSwitchedStyle={styles.thumbSwitched}
          trackSwitchedStyle={styles.trackSwitched}
          disabled={!this.props.closed}
        />
        {this.renderIcons()}
      </CardText>
    );
  }

  handleToggle() {
    if(this.props.closed) {
      this.setState({
        toggled: !this.state.toggled
      }, () => {
        this.props.onApproveClick(this.props.answer, this.state.toggled);
      });
    }
  }

  renderIcons() {
    if(this.props.closed) {
      return (this.state.toggled) ? <Done style={styles.done} /> : <HighlightOff style={styles.highlight} />;
    }
  }

  render() {
    return (
      <Card onClick={this.handleToggle}>
        <CardHeader
          title={this.props.answer.team}
        />
        {this.renderCardActions()}
      </Card>
    );
  }
}

TeamWidgetComponent.propTypes = {
  answer: PropTypes.object,
  onApproveClick: PropTypes.func,
  closed: PropTypes.bool
};

export default TeamWidgetComponent;