import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: []
    }
  }

  render() {
    const { value, onFocus, onBlur, onChange } = this.props;
    const inputProps = {
      value,
      onFocus,
      onBlur,
      onChange,
    };

    return (
      <div className='input'>
        <Autosuggest
          suggestions={this.state.suggestions}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default Input;