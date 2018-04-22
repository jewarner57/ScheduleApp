import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ScheduleList from './ScheduleList'

export default class SchedulePicker extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0,
            selectedSchedule: [],
            values: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
    }
    
    getSchedule() {
        const value=this.state.values;
        let selectedSchedule = [];
        
        let highlightTitle = this.props.blockSchedules[value];
        let title = this.props.blockSchedules[value+1];
        let time = this.props.blockSchedules[value+2];
        
        for(let i = 0; i < highlightTitle.length; i++) {
            selectedSchedule.push({
                highlight: highlightTitle[i],
                title: title[i],
                time: time[i],
                counter: i
            })
        }
        
        this.setState({selectedSchedule: selectedSchedule});
    }
    
    handleChange(event, index, values) { 
        
        this.setState({values})
        this.getSchedule();
        
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
                    <MenuItem value={3} primaryText="Advisory" />
                    <MenuItem value={6} primaryText="ELT" />
                </SelectField>
                <div className="scheduleList">
            
                    <ScheduleList selectedSchedule={this.state.selectedSchedule}></ScheduleList>
            
                </div>
          </div>    
            
        )
    }
}