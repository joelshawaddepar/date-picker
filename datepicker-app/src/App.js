import React, { Component } from 'react';
import './App.css';

import AddeDatePicker from './components/AddeDatePicker/AddeDatePicker';
import DateRangePicker from './components/DateRangePicker/DateRangePicker';


class App extends Component {
  render() {
    return (
      <div className="App">
        <AddeDatePicker />
      </div>
    );
  }
}

export default App;
