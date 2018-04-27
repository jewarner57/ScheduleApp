import React, { Component } from 'react';
import './App.css';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CountdownTimer from './CountdownTimer.js';
import SchedulePicker from './SchedulePicker.js';
import { Timeline } from 'react-twitter-widgets';
import Footer from './Footer.js';
import PdfView from './PdfView.js';

//Block Schedules

    //Regluar Day Block Info
    const regularBlockHighlightedTitleWords = ["", "First ", "", "Second ", "", "Third ", "", "Fourth "]
    const regularBlockRegularTitleWords = ["School Starts In:", "Block Ends In", "Class Change", "Block Ends In", "Class Change", "Block Ends In", "Class Change", "Block Ends In"]
    const regularBlockScheduleTimes = [745, 916, 925, 1053, 1100, 1300, 1307, 1435];

    //Advisory Day Block Info
    const advisoryBlockHighlightedTitleWords = ["", "Advisory ", "", "First ", "", "Second ", "", "Third ", "", "Fourth "]
    const advisoryBlockRegularTitleWords = ["School Starts In:", "Period Ends In:", "Class Change:", "Block Ends In", "Class Change", "Block Ends In", "Class Change", "Block Ends In", "Class Change", "Block Ends In"]
    const advisoryBlockScheduleTimes = [745, 815, 822, 941, 950, 1110, 1117, 1309, 1316, 1435];

    //ELT Day Block Info
    const eltBlockHighlightedTitleWords = ["", "First ","", "ELT ", "", "Second ", "", "Third ", "", "Fourth "]
    const eltBlockRegularTitleWords = ["School Starts In:", "Block Ends In", "", "Period Ends In:", "Class Change", "Block Ends In", "Class Change", "Block Ends In", "Class Change", "Block Ends In"]
    const eltBlockScheduleTimes = [745, 900, 906, 956, 1005, 1117, 1224, 1316, 1323, 1435];

    //2 Hour Delay Block Info
    const twoHourDelayBlockHighlightedTitleWords = ["", "First ", "", "Second ", "", "Third ", "", "Fourth "];
    const twoHourDelayBlockTitleWords = ["", "", "", "", "", "" , "", ""];
    const twoHourDelayBlockScheduleTimes = [945, 1040, 1047, 1138, 1145, 1337, 1344, 1435];

    //1 Hour Delay Block Info
    const oneHourDelayBlockHighlightedTitleWords = ["", "First ", "", "Second ", "", "Third ", "", "Fourth "];
    const oneHourDelayBlockTitleWords = ["", "", "", "", "", "" , "", ""];
    const oneHourDelayBlockScheduleTimes = [845, 947, 955, 1053, 1100, 1300, 1307, 1435];
    
//Lunch Schedule

    //Regluar Day Lunch Info
    const regularLunchHighlightedTitleWords = ["", "A ", "B ", "C ", "D "]
    const regularLunchRegularTitleWords = ["Lunches Start In:", "Lunch Ends In", "Lunch Ends In", "Lunch Ends In", "Lunch Ends In"]
    const regularLunchScheduleTimes = [1100, 1130, 1200, 1230, 1300];

    //Advisory Day Lunch Info
    const advisoryLunchHighlightedTitleWords = ["", "B ", "", "A ", "", "C ", "", "D "]
    const advisoryLunchRegularTitleWords = ["Lunches Start In:", "Lunch Ends In", "Class Change", "Lunch Ends In", "Class Change", "Lunch Ends In", "Class Change", "Lunch Ends In"]
    const advisoryLunchScheduleTimes = [1117, 1141, 1146, 1209, 1213, 1237, 1241, 1309];

    //ELT Day Lunch Info
    const eltLunchHighlightedTitleWords = ["", "B ", "", "A ", "", "C ", "", "D "]
    const eltLunchRegularTitleWords = ["Lunches Start In:", "Lunch Ends In", "Class Change", "Lunch Ends In", "Class Change", "Lunch Ends In", "Class Change", "Lunch Ends In"]
    const eltLunchScheduleTimes = [1117, 1141, 1146, 1209, 1213, 1237, 1241, 1309];

    //2 Hour Delay Lunch Info
    const twoHourDelayLunchHighlightedTitleWords = ["", "A ", "", "B ", "", "C ", "", "D "];
    const twoHourDelayLunchTitleWords = ["", "", "", "", "", "", "", ""];
    const twoHourDelayLunchScheduleTimes = [1213, 1337, 1145, 1209, 1241, 1305, 1309, 1337];
    //1 Hour Delay Lunch Info
    const oneHourDelayLunchHighlightedTitleWords = ["", "A ", "B ", "C ", "D "];
    const oneHourDelayLunchTitleWords = ["", "", "", "", ""];
    const oneHourDelayLunchScheduleTimes = [1100, 1130, 1200, 1230, 1300];
    
class App extends Component {
    
  constructor(props) {
        super(props);

        this.state = {
            blockSchedules: [
                
                regularBlockHighlightedTitleWords: regularBlockHighlightedTitleWords,
                regularBlockRegularTitleWords: regularBlockRegularTitleWords,
                regularBlockScheduleTimes: regularBlockScheduleTimes,
                
                advisoryBlockHighlightedTitleWords: advisoryBlockHighlightedTitleWords,
                advisoryBlockRegularTitleWords: advisoryBlockRegularTitleWords,
                advisoryBlockScheduleTimes: advisoryBlockScheduleTimes,
                
                eltBlockHighlightedTitleWords: eltBlockHighlightedTitleWords,
                eltBlockRegularTitleWords: eltBlockRegularTitleWords,
                eltBlockScheduleTimes: eltBlockScheduleTimes,
                
                oneHourDelayBlockHighlightedTitleWords: oneHourDelayBlockHighlightedTitleWords,
                oneHourDelayBlockTitleWords: oneHourDelayBlockTitleWords,
                oneHourDelayBlockScheduleTimes: oneHourDelayBlockScheduleTimes,
                
                twoHourDelayBlockHighlightedTitleWords: twoHourDelayBlockHighlightedTitleWords,
                twoHourDelayBlockTitleWords: twoHourDelayBlockTitleWords,
                twoHourDelayBlockScheduleTimes: twoHourDelayBlockScheduleTimes,
            ],
            
            lunchSchedules: [
                
                regularLunchHighlightedTitleWords: regularLunchHighlightedTitleWords,
                regularLunchRegularTitleWords: regularLunchRegularTitleWords,
                regularLunchScheduleTimes: regularLunchScheduleTimes,
                
                advisoryLunchHighlightedTitleWords: advisoryLunchHighlightedTitleWords,
                advisoryLunchRegularTitleWords: advisoryLunchRegularTitleWords,
                advisoryLunchScheduleTimes: advisoryLunchScheduleTimes,
                
                eltLunchHighlightedTitleWords: eltLunchHighlightedTitleWords,
                eltLunchRegularTitleWords: eltLunchRegularTitleWords,
                eltLunchScheduleTimes: eltLunchScheduleTimes,
                
                oneHourDelayLunchHighlightedTitleWords: oneHourDelayLunchHighlightedTitleWords,
                oneHourDelayLunchTitleWords: oneHourDelayLunchTitleWords,
                oneHourDelayLunchScheduleTimes: oneHourDelayLunchScheduleTimes,
                
                twoHourDelayLunchHighlightedTitleWords: twoHourDelayLunchHighlightedTitleWords,
                twoHourDelayLunchTitleWords: twoHourDelayLunchTitleWords,
                twoHourDelayLunchScheduleTimes: twoHourDelayLunchScheduleTimes,
            ]
        };
        
  }    
    
  render() {
    return (    
      <div className="App">
                    
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        
                <div className="App-header">HHS Easy Cal</div>
                    
                <CountdownTimer blockSchedules = {this.state.blockSchedules} lunchSchedules = {this.state.lunchSchedules}></CountdownTimer>
                
                <SchedulePicker blockSchedules = {this.state.blockSchedules} lunchSchedules = {this.state.lunchSchedules}></SchedulePicker>
        
                <PdfView></PdfView> 
                
                <div className = "twitterPage">
                    <Timeline
                        dataSource={{
                          sourceType: 'profile',
                          screenName: 'HarrisonburgHS'
                        }}
                        options={{
                          username: 'HarrisonburgHS',
                          height: '600',
                          width: '1200',
                          theme:"dark"
                        }}
                    />
                </div>
                      
                <Footer></Footer>    
        </MuiThemeProvider>
                                    
        
      </div>
    );
  }
}

export default App;

