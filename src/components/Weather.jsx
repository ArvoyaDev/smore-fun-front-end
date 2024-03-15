import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import WeatherDay from "./WeatherDay.jsx";


class Weather extends React.Component  {

	render() {

		if (this.props.forecast) {

			return (
				<div className={'weatherHolder'}>
					<h1 className='weather-header'>Weather & Camping Tips</h1>
					<Carousel slide={false} fade className={"weather-carousel"}>
						{this.props.forecast.map((element, id) => (
							<Carousel.Item key={id} interval={5000}>
								<WeatherDay dayForecast={element} key={id} className='weather-item'/>
							</Carousel.Item>
						))}
					</Carousel>
					<section className='chatGPT'>
						{this.props.chatGPT.split('\n').map((line, index) => (
							<p key={index}>{line}</p>
						))}
					</section>
						<img className='chatGPT-logo' src='../../public/assests/SVG/chatGPT.svg' alt='chatGPT logo also saying "powered by OpenAI"'/>
				</div>
			);
		}
	}
}

export default Weather;