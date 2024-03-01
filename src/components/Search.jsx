import React from 'react';
import axios from 'axios';
import Weather from "./Weather.jsx";
import StateParks from './StateParks.jsx';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			weather: null,
			campsites: null,
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
				chatGPT: response.data.chatGPT,
				error: null
			});
		} catch (err) {
			this.setState({ weather: null, campsites: null, chatGPT: null, error: err.response.data.error });
		}
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						value={this.state.city}
						onChange={this.handleChange}
						placeholder="Enter city"
					/>
					<button type="submit">Search</button>
				</form>
				{this.state.error && <div>Error: {this.state.error}</div>}
				{this.state.weather && <Weather forecast={this.state.weather}/>}
				{this.state.campsites && <StateParks campsites={this.state.campsites}/>}
			</div>
		);
	}
}

export default Search;