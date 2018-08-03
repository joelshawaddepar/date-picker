import React, { Component } from 'react';
import DayPicker from 'react-day-picker/DayPicker';
import moment from 'moment';
import 'react-day-picker/lib/style.css';


export default class DateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.selectedStartDay = this.selectedStartDay.bind(this);
    this.selectedEndDay = this.selectedEndDay.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.state = {
      selectedStartDay: undefined,
      selectedEndDay: undefined,
    };
  }

  selectedStartDay(day, { selected }) {
    this.setState({
      selectedStartDay: selected ? undefined : day,
    });
  }

  selectedEndDay(day, { selected }) {
    this.setState({
      selectedEndDay: selected ? undefined : day,
    });
  }

  handleApply(e) {
    this.props.handler({
      startday: this.state.selectedStartDay,
      endday: this.state.selectedEndDay
    })
  }




  render() {
    const { selectedStartDay, selectedEndDay } = this.state;
    return (

      <div className="dateRangePicker adde-date-range">
        <div className="dateRangePicker-quicklinks">
          <button className="button-text">YTD</button>
          <button className="button-text">MTD</button>
          <button className="button-text">This Year</button>
        </div>

        <section className="body">
          <div className="start-date">
            <label className="input-label">Start Date</label>
            <input type="text" className="adde-text-input" value={moment(this.state.selectedStartDay).format("MM/DD/YY")}/>

            <DayPicker
              selectedDays={this.state.selectedStartDay}
              onDayClick={this.selectedStartDay}
            />
          </div>

          <div className="end-date">
            <label className="input-label">End Date</label>
            <input type="text" className="adde-text-input" value={moment(this.state.selectedEndDay).format("MM/DD/YY")}/>

            <DayPicker
              selectedDays={this.state.selectedEndDay}
              onDayClick={this.selectedEndDay}
            />
          </div>
        </section>

        <footer className="cta-footer">
          <button className="button-primary" onClick = {this.handleApply}>Apply</button>
          <button className="button-default">Cancel</button>
        </footer>
      </div>
    );
  }
}
