import React, { Component } from 'react';

export default class Timer extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0,
        };
        
    }
    
    render() {
        
        return (
                
          <div>
            <h2><span className='amberText'>{this.props.timeInfo.blockTitle.highlighted}</span>{this.props.timeInfo.blockTitle.regular}</h2>
            <h1>{this.props.timeInfo.blockRemainingHours}{this.props.timeInfo.blockRemainingMinutes}{this.props.timeInfo.blockRemainingSeconds}</h1>
          </div>    
            
        )
    }
}