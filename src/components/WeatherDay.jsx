import React from 'react';
import Figure from 'react-bootstrap/Figure';

/*
TODO Match weatherbitIO codes to animated SVG
 */
class WeatherDay extends React.Component {

	convertToFahrenheit(temp) {
		const fahrenheit = Math.round((temp * 9 / 5) + 32);
		return `${fahrenheit}°`;
	}
	render(){

		return (
			<div className={"figureHolder"}>
				<Figure className={'weather-fig'}>
					<Figure.Image src={this.props.dayForecast.img} className={'weather-img'} alt='Image of current weather'/>
					<Figure.Caption  className={'weather-day'}>
						<div className={'temp-date-container'}>
							<p className={'weather-temp'}>{this.convertToFahrenheit(this.props.dayForecast.temp)}</p>
							<p className={'weather-date'}>{this.props.dayForecast.date}</p>
						</div>
						<p className={'weather-description'}>{this.props.dayForecast.description}</p>
					</Figure.Caption>
				</Figure>
			</div>
		)
	}
}

export default WeatherDay;