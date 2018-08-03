import React, { Component } from 'react';
import moment from 'moment';

import AdvancedMode from '../AdvancedMode/AdvancedMode';
import DateRangePicker from '../DateRangePicker/DateRangePicker';
import Input from '../Input/Input';

import {
  todayObject,
  dateOfToday,
  dateRangeBuilder,
  getLastDate,
  previousDateBuilder,
} from '../../utils/dates';

import {
  getSuggestions,
  getSuggestionValue,
  renderSuggestion,
} from '../../utils/autosuggestions';

class AddeDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAdvancedMode: false,
      showDateRangePicker: false,
      startDate: '',
      endDate: '',
      suggestions: [],
      isNotValid: false,
      value: '',
      commandValue: '',
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
    const { showAdvancedMode, commandValue, isNotValid } = this.state;
    if(showAdvancedMode) {
      return (
        <AdvancedMode 
          showInitialSuggestion={!commandValue}
          showNotValidSuggestion={isNotValid}
        />
      );
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
    if (!this.state.showAdvancedMode) {
      // Date Picker logic here.
      return;
    }
    const input = e.target.value;
    const dates = input.split(' ');
    if (dates.length === 1 && dates[0] === '') {
      this.setState({
        showDateRangePicker: false,
        showAdvancedMode: false,
        startDate: dateOfToday,
        endDate: dateOfToday,
        commandValue: '',
        value: dateRangeBuilder(dateOfToday, dateOfToday),
        isNotValid: false,
      });
    } else if (dates.length === 1 && dates[0].includes('t-')) {
      const date = dates[0];
      const characters = date.split('-');
      // handle error here
      const endDate = characters[1];
      // Pattern like T-1, T-30
      if(!isNaN(endDate)) {
        const result = previousDateBuilder(dateOfToday, parseInt(endDate), 'days');
        this.setState({
          showDateRangePicker: false,
          showAdvancedMode: false,
          startDate: result,
          endDate: dateOfToday,
          commandValue: '',
          value: dateRangeBuilder(result, dateOfToday),
          isNotValid: false,
        });
      } else {
        const digitPattern = /[0-9]/g;
        const charaterPattern = /[a-zA-Z]/g;
        const letters = endDate.match(charaterPattern).join('').toLowerCase();
        let result;
        switch (letters) {
          case 'me':
            result = getLastDate(todayObject, 'month');
            break;
          // QE is not finished.
          case 'qe':
            result = previousDateBuilder(dateOfToday, 3, 'months');
            break;
          case 'ye':
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

          result = previousDateBuilder(dateOfToday, daysToSubtract, 'days');
        }
    
        this.setState({
          showDateRangePicker: false,
          showAdvancedMode: false,
          startDate: result,
          endDate: dateOfToday,
          commandValue: '',
          value: dateRangeBuilder(result, dateOfToday),
          isNotValid: false,
        });
      }
    }
  }

  onChangeHandler(e) {
    const value = e.target.value;
    const { showAdvancedMode, showDateRangePicker } = this.state;

    if (value === '=' && !showAdvancedMode) {
      this.setState({
        showDateRangePicker: false,
        showAdvancedMode: true,
        startDate: '',
        endDate: '',
        commandValue: '',
        value: '',
      });
    } else if (showDateRangePicker) {
      this.setState({
        value,
      });
    } else if (showAdvancedMode) {
      this.setState({
        commandValue: value,
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
    const { suggestions, commandValue, value, showAdvancedMode } = this.state;
    let inputValue;
    let suggestionResults = suggestions;
    if(showAdvancedMode) {
      inputValue = commandValue;
    } else {
      inputValue = value;
      suggestionResults = [];
    }

    return (
      <div className='addeDatePicker'>
        <div>
          <Input
            value={inputValue}
            onFocus={this.onFocusHandler}
            onBlur={this.onBlurHandler}
            onChange={this.onChangeHandler}
            suggestions={suggestionResults}
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
