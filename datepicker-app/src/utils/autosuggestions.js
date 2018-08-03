import React, { Component } from 'react';

const suggestions = [
  {
    name: 'T-ME'
  },
  {
    name: 'T-YE'
  },
  {
    name: 'T-5BD'
  },
  {
    name: 'T-3'
  }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  let result = suggestions.filter(suggestion => regex.test(suggestion.name));

  if (result.length === 0) {
    result = [{
      name: 'No match'
    }];
  }

  return result;
}

export function getSuggestionValue(suggestion) {
  return suggestion.name;
}

export function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}
