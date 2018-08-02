import React, { Component } from 'react';
import AdvancedMode from '../AdvancedMode/AdvancedMode';
import DateRangePicker from '../DateRangePicker/DateRangePicker';

class AddeDatePicker extends Component {
  render() {
    return (
      <div className='addeDatePicker'>
        <div>
          <input />
        </div>
        <DateRangePicker />
        <AdvancedMode />
      </div>
    );
  }
}

export default AddeDatePicker;