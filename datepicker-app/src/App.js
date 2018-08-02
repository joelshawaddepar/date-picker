import React, { Component } from 'react';
import './App.css';

import AddeDatePicker from './components/AddeDatePicker/AddeDatePicker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddeDatePicker
          startDate=''
          endDate=''
        />
      </div>
    );
  }
}

export default App;
