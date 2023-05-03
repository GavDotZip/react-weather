import React from 'react';

export default class WeatherBox extends React.Component{

    getDay = date => {
        let weekday = new Array(7);
        weekday[0] = 'Monday';
        weekday[1] = 'Tuesday';
        weekday[2] = 'Wednesday';
        weekday[3] = 'Thursday';
        weekday[4] = 'Friday';
        weekday[5] = 'Saturday';
        weekday[6] = 'Sunday';

        return weekday[new Date(date).getDay()];

    };

    render (props) {
        return (
            <div className='weather-box'>
                <h1>{this.props.date ? this.getDay(this.props.date) : ''}</h1>
                <img src={
                            this.props.icon
                            ? require(`./${this.props.icon}.svg`)
                            : require('./sun.svg')
                        }
                    alt='sun'
                />
                
                <span className='temp'>{Math.round(this.props.temp - 273.15)}°C</span>
            </div>
        );
    }

}