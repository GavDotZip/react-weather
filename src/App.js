import React from 'react';
import CityInput from '../utilities/CityInput';
import WeatherBox from '../utilities/WeatherBox';
import MainWeatherWindow from '../utilities/MainWeatherWindow';
import './App.css';


class App extends React.Component{

  render(){
    const WeatherBoxes = () => {
      const weatherBoxes = this.state.days.slice(1).map(day => (
        <li>
          <WeatherBox {...day}/>
        </li>
      ));

      return <ul className='weather-box-list'>{weatherBoxes}</ul>;
    };

    return (
      <div className='App'>
        <header className='App-header'>
          <MainWeatherWindow data={this.state.days[0]} city={this.state.city}>
            <CityInput city={this.state.city} callAPI={this.callAPI.bind(this)}/>
            <WeatherBoxes/>
          </MainWeatherWindow>
        </header>
      </div>
    )
  } 

  state = {
    city : undefined,
    days : new Array(5)
  };

  callAPI = async city => {
    const api_data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`).then(resp => resp.json());
    if(api_data.cod === '200') {
      await this.updateSate(api_data);
      return true;
    }
    else return false;
  };

  updateState = data => {
    const city = data.city.name;
    const days = [];
    const dayIndeces = this.getDayIndeces(data);

    for(let i=0; i<5; i++) {
      days.push({
        data: data.list[dayIndeces[i]].dt_txt,
        weather_desc: data.list[dayIndeces[i]].weather[0].description,
        icon: data.list[dayIndeces[i]].weather[0].icon,
        temp: data.list[dayIndeces[i]].main.temp
      });
    }

    this.setState({
      city: city,
      days: days
    });
  }

  getDayIndeces = data => {
    let dayIndeces = [];
    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);
    dayIndeces.push(0);

    for(let i=0; i<4; i++){
      while (tmp === data.list[index].dt_txt.slice(8, 10) || data.list[index].dt_txt.slice(11, 13) !== '15') {
        index++;
      }
      dayIndeces.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    } 
    return dayIndeces;
  }
}

export default App;