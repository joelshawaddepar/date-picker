import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      value,
      onFocus,
      onBlur,
      onChange,
      suggestions,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
      className,
    } = this.props;
    const inputProps = {
      value,
      onFocus,
      onBlur,
      onChange,
      placeholder: 'Select a Date',
      className: 'adde-text-input'
    };

    return (
      <div className='input'>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default Input;
