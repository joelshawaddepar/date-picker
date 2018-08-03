import React, { Component } from 'react';
import moment from 'moment';

import {
  todayObject,
  dateOfToday,
  dateRangeBuilder,
  getLastDate,
  previousDateBuilder,
} from './dates';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSuggestions(value) {
  let result;
  const escapedValue = escapeRegexCharacters(value.trim()).toLowerCase();

  const valueArray = escapedValue.split(' ');

  if (valueArray.length === 1 && valueArray[0].includes('t-')) {
    const date = valueArray[0];
    const characters = date.split('-');
    // handle error here
    const endDate = characters[1];

    console.log(endDate);

    if(!isNaN(endDate)) {
      const dateValue = escapeRegexCharacters(`${previousDateBuilder(dateOfToday, parseInt(endDate), 'days')} - ${dateOfToday}`.trim());
      result = [{
        commandValue: escapedValue,
        description: `${endDate} days ago to yesterday ${dateValue}`
      }];
    } else {
      let startDate;
      let dateType;
      const digitPattern = /[0-9]/g;
      const charaterPattern = /[a-zA-Z]/g;
      const letters = endDate.match(charaterPattern).join('').toLowerCase();

      switch (letters) {
        case 'me':
          dateType = 'month';
          startDate = getLastDate(todayObject, dateType);
          break;
        // QE is not finished.
        case 'qe':
          dateType = 'quarter';
          startDate = previousDateBuilder(dateOfToday, 3, 'months');
          break;
        case 'ye':
          dateType = 'year';
          startDate = getLastDate(todayObject, dateType);
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

        startDate = previousDateBuilder(dateOfToday, daysToSubtract, 'days');
      }

      result = [{
        commandValue: escapedValue,
        description: `the end of last ${dateType} to today ${dateRangeBuilder(startDate, dateOfToday)}`
      }];
    } 
  } else {
    result = [{
      commandValue: escapedValue,
      description: 'No matches yet',
    }];
  }

  return result;
}

export function getSuggestionValue(suggestion) {
  return suggestion.commandValue;
}

export function renderSuggestion(suggestion) {
  return (
    <div>
      <div>{suggestion.commandValue}</div>
      <span className="small">{suggestion.description}</span>
    </div>
  );
}
