import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class CategoryFilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategories: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, values) {
    this.setState({
      selectedCategories: values
    }, () => {
      if(values.length >= 3){
        this.props.onMultipleCategorySelect(this.state.selectedCategories);
      }
    });
  }

  menuItems(values) {
    return this.props.availableCategories.map((category) => (
      <MenuItem
        key={category}
        insetChildren={true}
        checked={values && values.indexOf(category) > -1}
        value={category}
        primaryText={category}
      />
    ));
  }

  render() {
    const { selectedCategories } = this.state;
    return (
      <div>
        <h2>Select 3 categories:</h2>
        <SelectField
          multiple={true}
          hintText="Select 3 categories"
          value={selectedCategories}
          onChange={this.handleChange}
        >
          {this.menuItems(selectedCategories)}
        </SelectField>
      </div>
    );
  }
}

CategoryFilterComponent.propTypes = {
  availableCategories: PropTypes.array,
  onMultipleCategorySelect: PropTypes.func.isRequired
};

export default CategoryFilterComponent;