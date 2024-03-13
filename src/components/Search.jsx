import React from 'react';
import axios from 'axios';
import Weather from "./Weather.jsx";
import StateParks from './StateParks.jsx';
import Alerts from './Alerts.jsx';
import { Spinner } from 'react-bootstrap';

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
			loading: false,
		};
	}

	handleChange = (event) => {
		let city = event.target.value.toLowerCase();
		this.setState({
			city: city,
		});
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		this.setState({
			loading: true,
			error: null // clear the error state
		});

		try {
			const response = await axios.get(`http://localhost:3001/api/city-info?city=${this.state.city}`);
			this.setState({
				weather: response.data.weather,
				campsites: response.data.campsites,
				alerts: response.data.alerts,
				chatGPT: response.data.chatGPT,
				error: null,
				loading: false
			});
		} catch (err) {
			this.setState({
				weather: null,
				campsites: null,
				chatGPT: null,
				alerts: null,
				error: err.response ? err.response.data.error : 'An error occurred',
				loading: false
			});
		}
	};

	render() {
		if (this.state.loading) {
			return (
				<div className="d-flex justify-content-center align-items-center">
					<Spinner animation="border" role="status" />
					<span className="ml-2">Cooking S'mores</span>
				</div>
			);
		}

		return (
			<div className='home-page'>
				<div className='search-bar'>
					<div className='search-bar-background'>
						<form className='search-Form' onSubmit={this.handleSubmit}>
							<input
								type="text"
								value={this.state.city}
								onChange={this.handleChange}
								placeholder="Enter city"
								required
							/>
							<button className='search-button' type="submit">Search</button>
						</form>
					</div>
				</div>
				<div className='boards'>
					<div className='bill-board'>
						{this.state.weather && <Weather chatGPT={this.state.chatGPT} forecast={this.state.weather}/>}
					</div>
					{this.state.error && <div>Error: {this.state.error}</div>}
					<div className='alertsBoard'>
						{this.state.alerts && <Alerts alerts={this.state.alerts}/>}
					</div>
				</div>
				{this.state.campsites && <StateParks city={this.state.city} campsites={this.state.campsites}/>}
			</div>
		);
	}
}

export default Search;