import {Tabs, Tab} from 'material-ui/Tabs';
import React, { Component } from 'react';
import Timer from './Timer.js'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

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
const eltBlockScheduleTimes = [745, 900, 906, 956, 1005, 1117, 1224, 1316, 123, 1435];

export default class CountdownTimer extends React.Component {
      
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0,
            currentTimeInfo: {
                
                blockTitle: {
                    highlighted:"",
                    regular:""
                },
                blockRemainingHours: "",
                blockRemainingMinutes: "",
                blockRemainingSeconds: "",
                lunchTitle: "",
                lunchRemainingHours: "",
                lunchRemainingMinutes: "",
                lunchRemainingSeconds: ""
                
            }
        };
        this.getRemainingBlockTime = this.getRemainingBlockTime.bind(this);
        this.getDaySched = this.getDaySched.bind(this);
    }
    
    componentDidMount() {
      this.getRemainingBlockTime();
      this.interval = setInterval(this.getRemainingBlockTime, 1000);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
    
    getDaySched() {
        
        const date = new Date();
        const today = date.getDay();
        let dayInfo = [];
        
        if(today === 1 || today === 4) {
            dayInfo[0] = advisoryBlockScheduleTimes;
            dayInfo[1] = advisoryBlockRegularTitleWords;
            dayInfo[2] = advisoryBlockHighlightedTitleWords;
        }
        else if(today === 2 || today === 5) {
            dayInfo[0] = regularBlockScheduleTimes;
        }
        else if(today === 3) {
            dayInfo[0] = eltBlockScheduleTimes;
        }
        else {
            dayInfo[0] = "weekend"; 
        }
        
        return dayInfo;
    }
    
    getRemainingBlockTime() {
        
        const date = new Date();
        const today = date.getDay();
        let timeInfo = this.state.currentTimeInfo;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds()
        let dayInfo = this.getDaySched();
        let todaySched = dayInfo[0];
        let todayNames = dayInfo[1];
        let todayNamesHighlighted = dayInfo[2];
        
        
        if(todaySched === "weekend" || hours*100+minutes > 1435) {
            timeInfo.blockRemainingHours = "Classes";
            timeInfo.blockRemainingMinutes = " Are";
            timeInfo.blockRemainingSeconds = " Over.";
        }
        else {
            for(let i = 0; i < todaySched.length; i++) {

                if(hours*100+minutes < todaySched[i]) {
                    
                    timeInfo.blockRemainingHours= ((todaySched[i]-todaySched[i]%100-hours*100)/100);
                    timeInfo.blockRemainingMinutes = (todaySched[i]%100-minutes);
                    timeInfo.blockRemainingSeconds = 59-seconds;
                    
                    if(timeInfo.blockRemainingMinutes > 60) {
                        timeInfo.blockRemainingMinutes -= 60;
                        timeInfo.blockRemainingHours += 1;
                    }
                    else if(timeInfo.blockRemainingMinutes < 0) {
                        timeInfo.blockRemainingMinutes = 60-Math.abs(timeInfo.blockRemainingMinutes);
                        timeInfo.blockRemainingHours -= 1;
                    }
                    
                    if(timeInfo.blockRemainingSeconds < 10) {
                        timeInfo.blockRemainingSeconds = ":0" + timeInfo.blockRemainingSeconds; 
                    }
                    else {
                        timeInfo.blockRemainingSeconds = ":" + timeInfo.blockRemainingSeconds; 
                    }
                    
                    if(timeInfo.blockRemainingMinutes < 10) {
                        timeInfo.blockRemainingMinutes = ":0" + timeInfo.blockRemainingMinutes; 
                    }
                    else { 
                        timeInfo.blockRemainingMinutes = ":" + timeInfo.blockRemainingMinutes; 
                    }
                    
                    timeInfo.blockTitle.regular = todayNames[i];
                    timeInfo.blockTitle.highlighted = todayNamesHighlighted[i];
                    
                    
                    i = todaySched.length;
                }
            }
        }
        this.setState({currentTimeInfo: timeInfo}); 
    }
    
    handleChange = (value) => {
        this.setState({
          slideIndex: value,
        });
    };
    
    render() {
        
        return (
                
          <div>
            <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Classes" value="classes" className="countdownTab" inkbarstyle={{background: 'blue'}}>
          <div className="tabSection">
            
            <Timer timeInfo = {this.state.currentTimeInfo} ></Timer>
            
          </div>
        </Tab>
        <Tab label="Lunches" value="lunches" className="countdownTab" inkbarstyle={{background: 'blue'}}>
          <div className="tabSection">
            
            <Timer timeInfo = {this.state.currentTimeInfo} ></Timer>
            
          </div>
        </Tab>
      </Tabs>
          </div>    
            
        )
    }
}