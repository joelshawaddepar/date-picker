import React, { Component } from 'react';

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='input'>
        <input
          value={this.props.value}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default Input;