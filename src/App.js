import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Content from './Components/Content';

function App() {
  return (
    <div className="App">
      <Router>
          <Navigation />
          <Content />
          <Footer />
      </Router>
    </div>
  );
}

export default App;
