import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import CountdownTimer from './CountdownTimer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
                    
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        
                <div className="App-header">HHS Easy Cal</div>
                    
                <CountdownTimer></CountdownTimer>
        
        </MuiThemeProvider>
                                    
        
      </div>
    );
  }
}

export default App;
