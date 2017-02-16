import React from 'react';
import Gallery from './Gallery';
import IMAGES from './Data';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Gallery images={IMAGES} />
      </div>
    );
  }
}

export default App;
