import React from 'react';
import axios from 'axios';
import Weather from "./Weather.jsx";
import StateParks from './StateParks.jsx';
import Alerts from './Alerts.jsx';
import { Spinner } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';


const backendServer = import.meta.env.VITE_APP_BACKEND_URL
class Search extends React.Component {
	constructor(props) {
		super(props);
		const loadingMessages = [
			'Cooking S\'mores',
			'Loading Campsites',
			'Finding Campsites',
			'Calculating Distance',
			'This takes a bit because I\'m using LocationIQ that limit 2 requests per 1 second',
			'Summoning the camping spirits',
			'Inflating the air mattress',
			'Pitching the tent',
			'Starting the campfire',
			'Roasting marshmallows',
			'Spotting constellations',
			'Telling ghost stories',
			'Listening to the crickets',
			'Catching fireflies',
			'Unrolling the sleeping bag',
			'Turning off the lantern',
			'Zipping up the tent',
			'Dreaming of s\'mores'
		];
		this.state = {
			city: '',
			weather: null,
			campsites: null,
			alerts: null,
			chatGPT: null,
			error: null,
			loading: false,
			loadingMessages: loadingMessages,
			loadingMessagesCopy: [...loadingMessages],
			currentLoadingMessage: '',
		};
	}

	getToken = () => {
		return this.props.auth0.getIdTokenClaims()
		.then(res => res.__raw)
		.catch(err => console.err(err))
	}

	handleChange = (event) => {
		let city = event.target.value.toLowerCase();
		this.setState({
			city: city,
		});
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		const token = await this.getToken();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		this.loadingInterval = setInterval(() => {
			if (this.state.loadingMessagesCopy.length === 0) {
				this.setState({ loadingMessagesCopy: [...this.state.loadingMessages] });
			}
			const randomIndex = Math.floor(Math.random() * this.state.loadingMessagesCopy.length);
			const nextMessage = this.state.loadingMessagesCopy[randomIndex];
			this.setState(prevState => ({
				currentLoadingMessage: nextMessage,
				loadingMessagesCopy: prevState.loadingMessagesCopy.filter((_, index) => index !== randomIndex)
			}));
		}, 2000); // Change message every 2 seconds

		this.setState({
			loading: true,
			currentLoadingMessage: this.state.loadingMessages[0],
			error: null // clear the error state
		});

		try {
			const response = await axios.get(`${backendServer}/api/city-info?city=${this.state.city}`, config);
			this.setState({
				weather: response.data.weather,
				campsites: response.data.campsites,
				alerts: response.data.alerts,
				chatGPT: response.data.chatGPT,
				error: null,
				loading: false
			});
			clearInterval(this.loadingInterval); // Stop changing the message
		} catch (err) {
			this.setState({
				weather: null,
				campsites: null,
				chatGPT: null,
				alerts: null,
				error: err.response ? err.response.data.error : 'An error occurred',
				loading: false
			});
			clearInterval(this.loadingInterval); // Stop changing the message
		}
	};

	render() {
		if (this.state.loading) {
			return (
				<div className="loading-container">
					<div className="d-flex justify-content-center align-items-center loading-background">
						<Spinner animation="border" role="status"/>
						<span className="ml-2">{this.state.currentLoadingMessage}</span>
					</div>
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
					{this.state.error && <div className='error-message'>Error: {this.state.error}</div>}
					<div className='alertsBoard'>
						{this.state.alerts && <Alerts alerts={this.state.alerts}/>}
					</div>
				</div>
				{this.state.campsites && <StateParks city={this.state.city} campsites={this.state.campsites}/>}
			</div>
		);
	}
}

export default  withAuth0(Search);