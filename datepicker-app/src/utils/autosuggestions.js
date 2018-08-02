import React, { Component } from 'react';

const suggestions = [];

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

  return suggestions.filter(suggestion => regex.test(suggestion));
}

export function getSuggestionValue(suggestion) {
  return suggestion;
}

export function renderSuggestion(suggestion) {
  return (
    <span>{suggestion}</span>
  );
}
