import React, { Component } from 'react';
import moment from 'moment';

import AdvancedMode from '../AdvancedMode/AdvancedMode';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import Input from '../Input/Input';

const suggestions = [];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return suggestions.filter(suggestion => regex.test(suggestion));
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion}</span>
  );
}

const dateRangeBuilder = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  return `${startDate} - ${endDate}`;
};

const dateBuilder = (dateObject) => {
  return `${dateObject.getMonth() + 1 }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
};

const getLastDate = (dateObject, dateType) => {
  let result;
  switch (dateType) {
    case 'month':
      result = new Date(dateObject.getFullYear(), dateObject.getMonth(), 0);
      debugger;
      return dateBuilder(result);
    case 'quarter':
      return;
    case 'year':
      result = new Date(dateObject.getFullYear(), 0, 0);
      return dateBuilder(result);
  }
}

// return the first day of the date range
const momentBuilder = (endate, period, dateType) => {
  return moment(endate, 'MM/DD/YYYY').subtract(period, dateType).format('L');
};

const todayObject = new Date();
const dateOfToday = dateBuilder(todayObject);

class AddeDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAdvancedMode: false,
      showDateRangePicker: false,
      startDate: '',
      endDate: '',
      suggestions: [],
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

  onBlurHandler(e) {
    const input = e.target.value;
    // Simple logic for now
    if(input.includes('/')) {
      return;
    }

    const dates = input.split(' ');
    if (dates.length === 1 && dates[0] === '') {
      this.setState({
        showDateRangePicker: false,
        showAdvancedMode: false,
        startDate: dateOfToday,
        endDate: dateOfToday,
      });
    } else if (dates.length === 1) {
      const date = dates[0];
      const characters = date.split('-');
      // handle error here
      const endDate = characters[1];
      // Pattern like T-1, T-30
      if(!isNaN(endDate)) {
        const result = momentBuilder(dateOfToday, parseInt(endDate), 'days');
        this.setState({
          showDateRangePicker: false,
          showAdvancedMode: false,
          startDate: result,
          endDate: dateOfToday,
        });
      } else {
        const digitPattern = /[0-9]/g;
        const charaterPattern = /[a-zA-Z]/g;
        const letters = endDate.match(charaterPattern).join('');
        let result;
        switch (letters) {
          case 'ME':
            result = getLastDate(todayObject, 'month');
            break;
          // QE is not finished.
          case 'QE':
            result = momentBuilder(dateOfToday, 3, 'months');
            break;
          case 'YE':
            result = getLastDate(todayObject, 'year');
            break;
        }
        const numberStrings = endDate.match(digitPattern);
        let numbers;
        numberStrings ? numbers = parseInt(endDate.match(digitPattern).join('')) : null;
        if (numbers) {
          let daysToSubtract;
          let numbersOfWeekends = Math.floor(numbers / 7);

          switch (moment(todayObject).day()) {
            case 0:
              daysToSubtract = numbers + 1 + numbersOfWeekends * 2;
              break;
            case 1:
              daysToSubtract = numbers + 2 + numbersOfWeekends * 2;
              break;
            case 2:
              if (numbers > 1) {
                daysToSubtract = numbers + 2 + numbersOfWeekends * 2;
              } else {
                daysToSubtract = numbers;
              }
              break;
            case 3:
              if (numbers > 2) {
                daysToSubtract = numbers + 2 + numbersOfWeekends * 2;
              } else {
                daysToSubtract = numbers;
              }
              break;
            case 4:
              if (numbers > 3) {
                daysToSubtract = numbers + 2 + numbersOfWeekends * 2;
              } else {
                daysToSubtract = numbers;
              }
              break;
            case 5:
              if (numbers > 4) {
                daysToSubtract = numbers + 2 + numbersOfWeekends * 2;
              } else {
                daysToSubtract = numbers;
              }
              break;
            case 6:
              daysToSubtract = numbers + numbersOfWeekends * 2;
              break;
          }

          result = momentBuilder(dateOfToday, daysToSubtract, 'days');
        }
    
        this.setState({
          showDateRangePicker: false,
          showAdvancedMode: false,
          startDate: result,
          endDate: dateOfToday,
        });
      }
    }
  }

  onChangeHandler(e) {
    const value = e.target.value;
    if (value === '=' && !this.state.showAdvancedMode) {
      this.setState({
        showDateRangePicker: false,
        showAdvancedMode: true,
        value: '',
      });
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { startDate, endDate, suggestions } = this.state;
    return (
      <div className='addeDatePicker'>
        <div>
          <Input
            value={dateRangeBuilder(startDate, endDate)}
            onFocus={this.onFocusHandler}
            onBlur={this.onBlurHandler}
            onChange={this.onChangeHandler}
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
          />
        </div>
        { this.renderAdvancedMode() }
        { this.renderDateRangePicker() }
      </div>
    );
  }
}

export default AddeDatePicker;
