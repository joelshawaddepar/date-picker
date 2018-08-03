import React, { Fragment } from 'react';

const AdvancedMode = ({ showInitialSuggestion, showNotValidSuggestion }) => {
  return (
    <div>
      {
        showInitialSuggestion && (
          <div className='advancedMode datepicker-query-search'>
            <div className="state-empty">
              <p>Start typing an expression - e.g. t-3</p>
            </div>
          </div>
        )
      }

      {
        showNotValidSuggestion && (
          <div className='advancedMode datepicker-query-search'>
            <div className="state-no-match">
                <p className="small">No matches</p>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default AdvancedMode;
