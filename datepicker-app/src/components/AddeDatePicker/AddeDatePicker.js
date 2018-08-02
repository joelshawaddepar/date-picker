import React, { Component } from 'react';
import AdvancedMode from '../AdvancedMode/AdvancedMode';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import Input from './Input';

class AddeDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAdvancedMode: false,
      showDateRangePicker: false,
      startDate: '',
      endDate: '',
    };

    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
  }

  renderDateRangePicker() {
    if(this.state.showDateRangePicker) {
      return <DateRangePicker />;
    }
    return null;
  }

  renderAdvancedMode() {
    if(this.state.showAdvancedMode) {
      return <AdvancedMode />;
    }
    return null;
  }

  onFocusHandler() {
    this.setState({
      showDateRangePicker: true,
      showAdvancedMode: false,
    });
  }

  onBlurHandler() {
    this.setState({
      showDateRangePicker: false,
      showAdvancedMode: false,
    });
  }

  render() {
    return (
      <div className='addeDatePicker'>

        <Input
          onFocus={this.onFocusHandler}
          className='adde-text-input'
        />


        { this.renderAdvancedMode() }
        { this.renderDateRangePicker() }
      </div>
    );
  }
}

export default AddeDatePicker;
