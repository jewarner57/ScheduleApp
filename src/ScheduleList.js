import React, { Component } from 'react';

export default class SchedulePicker extends React.Component {
    
    constructor(props) {
        super(props);
        console.log(this.props.selectedSchedule)
    }
    render() {
        
        return (
            <div>
                {this.props.selectedSchedule.map((schedule , index) => (

                    <h1>{schedule.title}</h1>   

                ))}  
            </div>
            
        )
    }
}