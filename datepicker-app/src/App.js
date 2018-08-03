import React, { Component } from 'react';
import './App.css';

import AddeDatePicker from './components/AddeDatePicker/AddeDatePicker';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCalendar } from '@fortawesome/free-solid-svg-icons'

library.add([faCaretDown, faCalendar])


class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="header">
          <div className="header-nav">
            <div className="header-dropdown context-chooser">
              <span>
                Avengers Portfolio, Tony and Bruce
              </span>
               <FontAwesomeIcon icon="caret-down" />
            </div>
            <ul className="header-tab">
              <li className="header-tab-item">Details</li>
              <li className="header-tab-item is-active">Analysis</li>
              <li className="header-tab-item">Transactions</li>
              <li className="header-tab-item">Reports</li>
            </ul>
          </div>
          <div className="header-dropdown">
            <span>
              Adam Smith
            </span>
            <FontAwesomeIcon icon="caret-down" />
          </div>
        </div>
        <div className="home">
          <div>
          	<div className="content">
  	        	<AddeDatePicker
  		          startDate='08/03/2018'
  		          endDate='08/03/2018'
                placeholder='Select Date'
  		        />
          	</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
