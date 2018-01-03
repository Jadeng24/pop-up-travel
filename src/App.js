import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import router from './router.js';
import Footer from './components/Footer/Footer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {router}
        <Footer />
      </div>
    );
  }
}

export default App;
