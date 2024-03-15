import React from 'react';
import {Accordion} from "react-bootstrap";

class Alerts extends React.Component {
	render() {
		return(
		<div className='ranger-board-holder'>
			<h1 className='ranger-board-header'>State Parks Alerts</h1>
			<Accordion className='ranger-board' defaultActiveKey='0'>
				{this.props.alerts.map( (alert, id) => {
					return <Accordion.Item className='ranger-board-alert' key={id} eventKey={id}>
						<Accordion.Header className='ranger-board-header'>{alert.title}</Accordion.Header>
						<Accordion.Body>
							<p>{alert.description}</p>
							<br/>
							{alert.url !== '' ? <button  className='nav-buttons' onClick={() => window.open(alert.url, '_blank')}>More Info</button> : null}
						</Accordion.Body>
					</Accordion.Item>
				})}
			</Accordion>
		</div>
		)
	}
}

export default Alerts;