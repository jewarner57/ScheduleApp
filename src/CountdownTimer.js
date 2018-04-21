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
    const eltBlockScheduleTimes = [745, 900, 906, 956, 1005, 1117, 1224, 1316, 123, 1435];

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

export default class CountdownTimer extends React.Component {
      
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0,
            blockTimeInfo: {
                
                Title: {
                    highlighted:"",
                    regular:""
                },
                remainingHours: "",
                remainingMinutes: "",
                remainingSeconds: "",
            },
            
            lunchTimeInfo: {
                Title: {
                    highlighted:"",
                    regular:""
                },
                remainingHours: "",
                remainingMinutes: "",
                remainingSeconds: "",
            },
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
            
            dayInfo[3] = advisoryLunchScheduleTimes;
            dayInfo[4] = advisoryLunchRegularTitleWords;
            dayInfo[5] = advisoryLunchHighlightedTitleWords;
        }
        else if(today === 2 || today === 5) {
            dayInfo[0] = regularBlockScheduleTimes;
            dayInfo[1] = regularBlockRegularTitleWords;
            dayInfo[2] = regularBlockHighlightedTitleWords;
            
            dayInfo[3] = advisoryLunchScheduleTimes;
            dayInfo[4] = advisoryLunchRegularTitleWords;
            dayInfo[5] = advisoryLunchHighlightedTitleWords;
        }
        else if(today === 3) {
            dayInfo[0] = eltBlockScheduleTimes;
            dayInfo[1] = eltBlockRegularTitleWords;
            dayInfo[2] = eltBlockHighlightedTitleWords;
            
            dayInfo[3] = advisoryLunchScheduleTimes;
            dayInfo[4] = advisoryLunchRegularTitleWords;
            dayInfo[5] = advisoryLunchHighlightedTitleWords;
        }
        else {
            dayInfo[0] = "weekend"; 
            dayInfo[3] = "weekend";
        }
        
        return dayInfo;
    }
    
    getRemainingBlockTime() {
        
        const date = new Date();
        const today = date.getDay();
        let timeInfo = this.state.blockTimeInfo;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds()
        let dayInfo = this.getDaySched();
        let todaySched = dayInfo[0];
        let todayNames = dayInfo[1];
        let todayNamesHighlighted = dayInfo[2];
        
        
        if(todaySched === "weekend" || hours*100+minutes > 1435) {
            timeInfo.remainingHours = "Classes";
            timeInfo.remainingMinutes = " Are";
            timeInfo.remainingSeconds = " Over.";
        }
        else {
            for(let i = 0; i < todaySched.length; i++) {

                if(hours*100+minutes < todaySched[i]) {
                    
                    timeInfo.remainingHours= ((todaySched[i]-todaySched[i]%100-hours*100)/100);
                    timeInfo.remainingMinutes = (todaySched[i]%100-minutes);
                    timeInfo.remainingSeconds = 59-seconds;
                    
                    if(timeInfo.remainingMinutes > 60) {
                        timeInfo.remainingMinutes -= 60;
                        timeInfo.remainingHours += 1;
                    }
                    else if(timeInfo.remainingMinutes < 0) {
                        timeInfo.remainingMinutes = 60-Math.abs(timeInfo.remainingMinutes);
                        timeInfo.remainingHours -= 1;
                    }
                    
                    if(timeInfo.remainingSeconds < 10) {
                        timeInfo.remainingSeconds = ":0" + timeInfo.remainingSeconds; 
                    }
                    else {
                        timeInfo.remainingSeconds = ":" + timeInfo.remainingSeconds; 
                    }
                    
                    if(timeInfo.remainingMinutes < 10) {
                        timeInfo.remainingMinutes = ":0" + timeInfo.remainingMinutes; 
                    }
                    else { 
                        timeInfo.remainingMinutes = ":" + timeInfo.remainingMinutes; 
                    }            
                    
                    timeInfo.Title.regular = todayNames[i];
                    timeInfo.Title.highlighted = todayNamesHighlighted[i];
                    
                    
                    i = todaySched.length;
                }
            }
        }
        
        let lunchTimeInfo = this.state.lunchTimeInfo;
        todaySched = dayInfo[3];
        todayNames = dayInfo[4];
        todayNamesHighlighted = dayInfo[5];
        
        if(todaySched === "weekend" || hours*100+minutes > todaySched[todaySched.length-1]) {
            lunchTimeInfo.remainingHours = "Lunch";
            lunchTimeInfo.remainingMinutes = " is";
            lunchTimeInfo.remainingSeconds = " Over.";
        }
        else {
            for(let i = 0; i < todaySched.length; i++) {

                if(hours*100+minutes < todaySched[i]) {
                    
                    lunchTimeInfo.remainingHours= ((todaySched[i]-todaySched[i]%100-hours*100)/100);
                    lunchTimeInfo.remainingMinutes = (todaySched[i]%100-minutes);
                    lunchTimeInfo.remainingSeconds = 59-seconds;
                    
                    if(lunchTimeInfo.remainingMinutes > 60) {
                        lunchTimeInfo.remainingMinutes -= 60;
                        lunchTimeInfo.remainingHours += 1;
                    }
                    else if(lunchTimeInfo.remainingMinutes < 0) {
                        lunchTimeInfo.remainingMinutes = 60-Math.abs(lunchTimeInfo.remainingMinutes);
                        lunchTimeInfo.remainingHours -= 1;
                    }
                    
                    if(lunchTimeInfo.remainingSeconds < 10) {
                        lunchTimeInfo.remainingSeconds = ":0" + lunchTimeInfo.remainingSeconds; 
                    }
                    else {
                        lunchTimeInfo.remainingSeconds = ":" + lunchTimeInfo.remainingSeconds; 
                    }
                    
                    if(lunchTimeInfo.remainingMinutes < 10) {
                        lunchTimeInfo.remainingMinutes = ":0" + lunchTimeInfo.remainingMinutes; 
                    }
                    else { 
                        lunchTimeInfo.remainingMinutes = ":" + lunchTimeInfo.remainingMinutes; 
                    }            
                    
                    lunchTimeInfo.Title.regular = todayNames[i];
                    lunchTimeInfo.Title.highlighted = todayNamesHighlighted[i];
                    
                    
                    i = todaySched.length;
                }
            }
        }
        
        this.setState({blockTimeInfo: timeInfo, lunchTimeInfo: lunchTimeInfo}); 
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
            
            <Timer timeInfo = {this.state.blockTimeInfo} ></Timer>
            
          </div>
        </Tab>
        <Tab label="Lunches" value="lunches" className="countdownTab" inkbarstyle={{background: 'blue'}}>
          <div className="tabSection">
            
            <Timer timeInfo = {this.state.lunchTimeInfo} ></Timer>
            
          </div>
        </Tab>
      </Tabs>
          </div>    
            
        )
    }
}