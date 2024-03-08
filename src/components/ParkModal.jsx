import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Carousel from "react-bootstrap/Carousel";
import {CarouselItem} from "react-bootstrap";

class ParkModal extends React.Component {

	render() {
		const { campsite } = this.props;
		if (!campsite) {
			return null; // or some fallback UI
		}
		return(
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
						<Carousel slide={false} className="custom-carousel" controls={campsite.images.length > 1} indicators={campsite.images.length > 1} interval={7000}>
							{campsite.images.map((image, id) => {
								return (
									<CarouselItem key={id}>
										<img src={image.url} style={{width: '316px'}} alt={image.altText}/>
										<br/>
										<h2>{image.caption}</h2>
									</CarouselItem>
								);
							})}
						</Carousel>
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