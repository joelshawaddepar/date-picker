import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='input'>
        <input
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          placeholder="Date"
          type="text"
          className="adde-text-input"
        />
      </div>
    );
  }
}

export default Input;
