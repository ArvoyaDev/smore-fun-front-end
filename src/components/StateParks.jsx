import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

class StateParks extends React.Component {
	render(){

		let campSites = this.props.campsites.filter(campsite => campsite.images.length !== 0 && campsite.description !== '');

		const handleButtonClick = (url) => {
			window.open(url, '_blank');
		};

		return(
			<Container>
				<Row>
					{campSites.map((campsite, id) => {
						return <Col key={id}>
							<Card bg='' style={{ width: '18rem' }} text='dark'>
								<Card.Img variant="top" src={campsite.images[0].url} />
								<Card.Body>
									<Card.Title>{campsite.tite}</Card.Title>
									<Card.Text>
										{campsite.description}
									</Card.Text>
									<Card.Text>
										{campsite.reservationInfo}
									</Card.Text>
									{campsite.reservationUrl !== '' ? <Button variant="primary" onClick={() => handleButtonClick(campsite.reservationUrl)}>Reserve a Spot now!</Button> : null}
								</Card.Body>
							</Card>
						</Col>
					})}
				</Row>
			</Container>
		)
	}
}

export default StateParks;