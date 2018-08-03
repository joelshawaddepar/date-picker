import React, { Component } from 'react';

class AdvancedMode extends Component {
  render() {
    return (
      <div className='advancedMode datepicker-query-search'>
        <div className="state-empty">
          <p>Start typing an expression - e.g. t-3</p>
        </div>

        {/* <div className="state-no-match">
          <p>t-</p>
          <p className="small">No matches yet</p>
        </div> */}
      </div>
    );
  }
}

export default AdvancedMode;
