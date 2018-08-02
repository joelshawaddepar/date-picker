import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


export default class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      selectedDay: undefined,
    };
  }
  handleDayChange(day) {
    this.setState({ selectedDay: day });
  }
  render() {
    const { selectedDay } = this.state;
    return (
      <div className='dateRangePicker'>
        <div className='start-date'>
          <label>Start Date</label>
          <DayPickerInput
            onDayChange={this.handleDayChange}
            showOverlay={true}
            hideOnDayClick={false}
            showDayPicker={true}
          />
        </div>

        <div className='end-date'>
        <label>End Date</label>
        <DayPickerInput
          onDayChange={this.handleDayChange}
          showOverlay={true}
          hideOnDayClick={false}
          showDayPicker={true}
        />
        </div>

        <footer className="cta-footer">
          <button className="button-primary">Apply</button>
          <button className="button-default">Cancel</button>
        </footer>
      </div>
    );
  }
}
