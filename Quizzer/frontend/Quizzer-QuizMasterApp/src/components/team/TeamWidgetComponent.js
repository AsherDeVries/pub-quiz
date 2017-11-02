import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Done from 'material-ui/svg-icons/action/done';

const iconStyles = {
  color: 'green',
  marigin: 'auto'
};

class TeamWidgetComponent extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  renderCardActionsOrApproval() {
    if(!this.props.team.isAccepted) {
      return (
        <CardActions>
          <FlatButton label="Accept" onClick={() => this.onButtonClick(true)} />
          <FlatButton label="Decline" onClick={() => this.onButtonClick(false)} />
        </CardActions>
      );
    }
    return (
      <Done style={iconStyles}/>
    );
  }

  onButtonClick(isAccepted) {
    this.props.onApproveclick(this.props.team.name, isAccepted);
  }

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.team.name}
        />
        {this.renderCardActionsOrApproval()}
      </Card>
    );
  }
}

TeamWidgetComponent.propTypes = {
  team: PropTypes.object,
  onApproveclick: PropTypes.func
};

export default TeamWidgetComponent;