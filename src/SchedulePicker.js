import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ScheduleList from './ScheduleList'

export default class SchedulePicker extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0,
            blockSelectedSchedule: [],
            lunchSelectedSchedule: [],
            values: 0,
						lunchDisplayTitle: "Lunch Schedule",
        };
        this.handleChange = this.handleChange.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
        this.addItemsToSchedule = this.addItemsToSchedule.bind(this);
    }
    
    componentWillMount() {
        this.getSchedule(this.state.values);
    }
    
    getSchedule(values) {
        const value=values*3;
        
        let blockSelectedSchedule = [];
        let highlightTitle = this.props.blockSchedules[value];
        let title = this.props.blockSchedules[value+1];
        let time = this.props.blockSchedules[value+2];
        
        this.addItemsToSchedule(blockSelectedSchedule, highlightTitle, title, time, true);
       
				
				let lunchSelectedSchedule = [];
        if(values != 4) {//if early release is selected dont display lunches
					highlightTitle = this.props.lunchSchedules[value];
					title = this.props.lunchSchedules[value+1];
					time = this.props.lunchSchedules[value+2];

					this.setState({lunchDisplayTitle: "Lunch Schedule"});
					this.addItemsToSchedule(lunchSelectedSchedule, highlightTitle, title, time);
				}
				else {
					this.setState({lunchDisplayTitle: "No Lunches On Early Release"});
				}
        this.setState({blockSelectedSchedule: blockSelectedSchedule, lunchSelectedSchedule: lunchSelectedSchedule});
				
    }
    
    addItemsToSchedule(selectedSchedule, highlightTitle, title, time) {
         let countSpeed = 2;
        
         for(let i = 1; i < highlightTitle.length; i+=countSpeed) { 
            selectedSchedule.push({
                highlight: highlightTitle[i],
                title: title[i],
                startTime: time[i-1],
                endTime: time[i],
            })
        }
        
        return selectedSchedule;
        
    }
    
    handleChange(event, index, values) { 
        
        this.setState({values});
        this.getSchedule(values);
        
    }
    
    render() {
        
        return (
                
          <div className = "schedulePicker">
                 <p className="scheduleTitle">SCHEDULE DISPLAY</p>
                 <SelectField
                    className="schedulePickerField"
                    underlineStyle = {{width:'200px'}}
                    style={{width: '200px'}}
                    hintText="Schedule"
                    labelStyle={{color: '#303030'}}
                    inputStyle={{width: '200px', textAlign: 'center'}}
                    value={this.state.values}
                    onChange={this.handleChange}
                 >
                    <MenuItem value={0} primaryText="Regular" />
                    <MenuItem value={1} primaryText="ADV/ELT" />
                    <MenuItem value={2} primaryText="One Hour Delay" />
                    <MenuItem value={3} primaryText="Two Hour Delay" />
										<MenuItem value={4} primaryText="Early Release" />
										<MenuItem value={5} primaryText="Pep Rally" />
										<MenuItem value={6} primaryText="Assembly" />
                </SelectField>
                <div className="scheduleListSection">
            
                    <ScheduleList blockSelectedSchedule={this.state.blockSelectedSchedule} lunchSelectedSchedule={this.state.lunchSelectedSchedule} lunchDisplayTitle={this.state.lunchDisplayTitle}></ScheduleList>
            
                </div>
          </div>    
            
        )
    }
}