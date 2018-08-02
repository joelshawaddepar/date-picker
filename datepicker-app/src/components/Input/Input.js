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
    } = this.props;
    const inputProps = {
      value,
      onFocus,
      onBlur,
      onChange,
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