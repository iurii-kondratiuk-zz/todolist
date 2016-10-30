import React from 'react';

import Header from '../Header';
import Inbox from '../Inbox';

import './App.css';

const App = () => (
  <div className="App">
    <Header title="Inbox" />
    <Inbox />
  </div>
);

export default App;