import React, { Component } from 'react';
import './App.css';

import AddeDatePicker from './components/AddeDatePicker/AddeDatePicker';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';


class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="header">
          <div className="header-nav">
            <div className="header-dropdown context-chooser">
              Avengers Portfolio, Tony and Bruce
            </div>
            <ul className="header-tab">
              <li className="header-tab-item">Details</li>
              <li className="header-tab-item is-active">Analysis</li>
              <li className="header-tab-item">Transactions</li>
              <li className="header-tab-item">Reports</li>
            </ul>
          </div>
          <div className="header-dropdown">
            Adam Smith
          </div>
        </div>
        <div className="home">
        	<div className="sidebar"></div>
        	<div className="content">
	        	<AddeDatePicker
		          startDate=''
		          endDate=''
		        />
        	</div>
        </div>
      </div>
    );
  }
}

export default App;
