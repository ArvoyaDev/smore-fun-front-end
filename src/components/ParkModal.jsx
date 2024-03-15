import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Carousel from "react-bootstrap/Carousel";

class ParkModal extends React.Component {

	render() {
		const { campsite } = this.props;
		if (!campsite) {
			return null;
		}
		return (
			<>
				<Modal
					className="park-modal"
					show={this.props.show}
					onHide={this.props.toggleModal}
					animation={false}
					backdropClassName='park-modal-backdrop'
				>
					<Modal.Header closeButton>
						<Modal.Title>{this.props.campsite.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Carousel indicators={campsite.images.length > 1} controls={campsite.images.length > 1}>
							{campsite.images.map((image, index) => (
								<Carousel.Item key={index}>
									<img className="d-block w-100" src={image.url} alt={image.altText}/>
								</Carousel.Item>
							))}
						</Carousel>
						<br/>
						<div className="custom-carousel">
							<h2>{campsite.images[0].caption}</h2>
							<br/>
							<p>{campsite.distance} miles away from {this.props.city}</p>
							<br/>
							<p>{campsite.duration} ~ travel time by car</p>
						</div>
						<br/>
						<p>
							{this.props.campsite.description}
						</p>
						<br/>
						<p>
							{this.props.campsite.reservationInfo}
						</p>
					</Modal.Body>
					<Modal.Footer>
						{this.props.campsite.reservationUrl ? <button className='nav-buttons' onClick={() => window.open(this.props.campsite.reservationUrl, '_blank')}>Reserve Now</button>: null}
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default ParkModal;