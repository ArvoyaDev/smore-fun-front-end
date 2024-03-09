import React from 'react';
import {Accordion} from "react-bootstrap";

class Alerts extends React.Component {
	render() {
		return(
		<div >
			<h1>Alerts</h1>
			<Accordion className='alertBoard' defaultActiveKey='0'>
				{this.props.alerts.map( (alert, id) => {
					return <Accordion.Item key={id} eventKey={id}>
						<Accordion.Header>{alert.title}</Accordion.Header>
						<Accordion.Body>
							<p>{alert.description}</p>
							{alert.url !== '' ? <button onClick={() => window.open(alert.url, '_blank')}>More Info</button> : null}
						</Accordion.Body>
					</Accordion.Item>
				})}
			</Accordion>
		</div>
		)
	}
}

export default Alerts;