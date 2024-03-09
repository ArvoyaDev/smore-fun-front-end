import React from 'react';
import Modal from 'react-bootstrap/Modal';

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
						<div className="custom-carousel">
							<img
								className="d-block w-100"
								src={campsite.images[0].url}
								alt={campsite.images[0].altText}
							/>
							<br/>
							<h2>{campsite.images[0].caption}</h2>
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
						{this.props.campsite.reservationUrl ? <button onClick={() => window.open(this.props.campsite.reservationUrl, '_blank')}>Reserve Now</button>: null}
					</Modal.Footer>
				</Modal>
			</>
		)
	}
}

export default ParkModal;