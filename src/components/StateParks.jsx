import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Figure from "react-bootstrap/Figure";
import Carousel from 'react-bootstrap/Carousel';
import ParkModal from "./ParkModal.jsx";

class StateParks extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			showModal: false,
			activeCampsite: null,
			itemsPerPage: 10 // Step 1: Create a state variable
		}
	}

	componentDidMount() {
		this.updateItemsPerPage(); // Step 3: Call the function on component mount
		window.addEventListener('resize', this.updateItemsPerPage); // Step 4: Call the function on window resize
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.itemsPerPage !== prevState.itemsPerPage) {
			this.updateItemsPerPage();
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateItemsPerPage);
	}

	updateItemsPerPage = () => {
		let itemsPerPage;
		if (window.innerWidth <= 600) {
			itemsPerPage = 3;
		} else if (window.innerWidth <= 1260) {
			itemsPerPage = 5;
		} else {
			itemsPerPage = 10;
		}
		this.setState({
			itemsPerPage: itemsPerPage
		});
	}

	toggleModal = (campsite) => {
		this.setState((previousState) => {
			return {
				showModal: !previousState.showModal,
				activeCampsite: campsite
			}
		})
	}

	render() {
		let campSites = this.props.campsites.filter(campsite => campsite.images.length !== 0 && campsite.description !== '');

		function chunkArray(array, chunkSize) {
			let results = [];
			while (array.length) {
				results.push(array.splice(0, chunkSize));
			}
			return results;
		}

		let chunks = chunkArray(campSites, this.state.itemsPerPage); // Step 5: Use the state variable

		const handleButtonClick = (url) => {
			window.open(url, '_blank');
		};

		return (
			<div id='parksRow'>
				<Carousel className='state-parks-carousel' interval={30000}>
					{chunks.map((chunk, index) => (
						<Carousel.Item key={index}>
							<Row>
								{chunk.map((campsite, id) => (
									<Col className='parkImageContainer' key={id}>
										<Figure className='parkSign'>
											<Figure.Caption className='parkImageTitle'>
												{campsite.title}
											</Figure.Caption>
											<Figure.Image
												className='parkImage'
												onClick={() => this.toggleModal(campsite)}
												src={campsite.images[0].url}
											/>
										</Figure>
										<ParkModal key={id} campsite={this.state.activeCampsite} show={this.state.showModal} toggleModal={this.toggleModal}/>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
			</div>
		);
	}
}

export default StateParks;