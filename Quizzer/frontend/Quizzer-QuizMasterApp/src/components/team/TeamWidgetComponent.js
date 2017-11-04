import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Done from 'material-ui/svg-icons/action/done';
import Panel from 'react-uikit-panel';

const iconStyles = {
  color: 'green',
  margin: 'auto'
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
    this.props.onApproveclick(this.props.team, isAccepted);
  }

  render() {
    return (
      <Panel margin="left">
        <Card>
          <CardHeader
            title={this.props.team.teamName}
            textStyle={{"padding-right": 0}}
          />
          {this.renderCardActionsOrApproval()}
        </Card>
      </Panel>
    );
  }
}

TeamWidgetComponent.propTypes = {
  team: PropTypes.object,
  onApproveclick: PropTypes.func
};

export default TeamWidgetComponent;
