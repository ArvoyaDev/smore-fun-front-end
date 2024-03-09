import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class Note extends React.Component {


	render() {
		const { show, handleClose, handleInputChange, newNote, handleFormSubmit } = this.props;

		return (
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{newNote._id ? 'Update Note' : 'New Note'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleFormSubmit}>
						<Form.Group>
							<Form.Label>Date</Form.Label>
							<Form.Control
								type="date"
								name="date"
								value={newNote.date}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								name="title"
								value={newNote.title}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Entry</Form.Label>
							<Form.Control
								as="textarea"
								name="entry"
								value={newNote.entry}
								onChange={handleInputChange}
								required
							/>
						</Form.Group>
						<Button type="submit">{newNote._id ? 'Update' : 'Add'} Note</Button>
					</Form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default Note;