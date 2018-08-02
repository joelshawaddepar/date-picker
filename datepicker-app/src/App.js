import React, { Component } from 'react';
import './App.css';

import AddeDatePicker from './components/AddeDatePicker/AddeDatePicker';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';


class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="header">header</div>
        <div className="home">
        	<div className="sidebar"></div>
        	<div className="content">
	        	<AddeDatePicker
		          startDate=''
		          endDate=''
              placeholder='Select Date'
		        />
        	</div>
        </div>
      </div>
    );
  }
}

export default App;
