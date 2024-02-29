import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import WeatherDay from "./WeatherDay.jsx";

/*
TODO make it be a stand alone widget with cycling through different days.
TODO Get name, high and low temp from API
TODO Background will be grey/transparent
 */
class Weather extends React.Component  {

	render() {

		if (this.props.forecast) {
			return (
				<div className={'weatherHolder'}>
					<Carousel slide={false} fade className={"weather-carousel"} >
						{this.props.forecast.map((element, id) => (
							<Carousel.Item key={id} interval={5000}>
								<WeatherDay dayForecast={element} key={id} className='weather-item'/>
							</Carousel.Item>
						))}
					</Carousel>
				</div>
			);
		}
	}
}

export default Weather;