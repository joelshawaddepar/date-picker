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
      value: '',
    };

    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
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

  onChangeHandler(e) {
    const value = e.target.value;
    if (value === '=') {
      this.setState({
        showDateRangePicker: false,
        showAdvancedMode: true,
        value: '',
      });
    }
  }

  render() {
    return (
      <div className='addeDatePicker'>
        <div>
          <Input
            value={this.state.value}
            onFocus={this.onFocusHandler}
            onBlur={this.onBlurHandler}
            onChange={this.onChangeHandler}
          />
        </div>
        { this.renderAdvancedMode() }
        { this.renderDateRangePicker() }
      </div>
    );
  }
}

export default AddeDatePicker;