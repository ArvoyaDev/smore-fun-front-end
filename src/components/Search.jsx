import React from 'react';
import axios from 'axios';
import Weather from "./Weather.jsx";
import StateParks from './StateParks.jsx';
import Alerts from './Alerts.jsx';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			weather: null,
			campsites: null,
			alerts: null,
			chatGPT: null,
			error: null,
		};
	}

	handleChange = (event) => {
		this.setState({ city: event.target.value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.get(`http://localhost:3001/api/city-info?city=${this.state.city}`);
			this.setState({
				weather: response.data.weather,
				campsites: response.data.campsites,
				alerts: response.data.alerts,
				chatGPT: response.data.chatGPT,
				error: null
			});
		} catch (err) {
			this.setState({ weather: null, campsites: null, chatGPT: null, alerts: null, error: err.response.data.error });
		}
	};

	render() {
		return (
			<div className='home-page'>
				<div>
				<div className='boards'>
					<div className='bill-board'>
						{this.state.weather && <Weather chatGPT={this.state.chatGPT} forecast={this.state.weather}/>}
					</div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						value={this.state.city}
						onChange={this.handleChange}
						placeholder="Enter city"
					/>
					<button type="submit">Search</button>
				</form>
					<div className='alertsBoard'>
						{this.state.alerts && <Alerts alerts={this.state.alerts}/>}
					</div>
				</div>
				</div>
				{this.state.campsites && <StateParks campsites={this.state.campsites}/>}
			</div>
		);
	}
}

export default Search;