import React from 'react';
import axios from 'axios';
import { Accordion, Button } from 'react-bootstrap';
import Note from './Note.jsx';


const backendServer = import.meta.env.VITE_APP_BACKEND_URL

class Notebook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [],
			newNote: {
				date: '', // Initialize date to an empty string
				title: '',
				entry: ''
			},
			showModal: false
		};
	}

	componentDidMount() {
		this.fetchNotes();
	}



	openModal = (note) => {
		this.setState({
			showModal: true,
			newNote: note
				? {
					date: note.date || '', // Use an empty string if date is undefined
					title: note.title || '', // Use an empty string if title is undefined
					entry: note.entry || '' // Use an empty string if entry is undefined
				}
				: {
					date: '',
					title: '',
					entry: ''
				}
		});
	};

	closeModal = () => {
		this.setState({
			showModal: false
		});
	};

	fetchNotes = async () => {
		const response = await axios.get(`${backendServer}/notes`);
		this.setState({notes: response.data});
	};

	createNote = async (note) => {
		try {
			await axios.post(`${backendServer}/notes`, note);
			this.fetchNotes();
		} catch (error) {
			console.error('Error creating note:', error);
		}
	};

	updateNote = async (id, updatedNote) => {
		await axios.put(`${backendServer}/notes/${id}`, updatedNote);
		this.fetchNotes();
	};

	deleteNote = async (id) => {
		await axios.delete(`${backendServer}/notes/${id}`);
		this.fetchNotes();
	};

	handleInputChange = (event) => {
		this.setState({
			newNote: {
				...this.state.newNote,
				[event.target.name]: event.target.value
			}
		});
	};
	handleFormSubmit = async (event) => {
		event.preventDefault();

		let note = {
			...this.state.newNote
		};

		if (note._id) {
			await this.updateNote(note._id, note);
		} else {
			await this.createNote(note);
		}

		this.setState({
			newNote: {
				date: '',
				title: '',
				entry: ''
			}
		});

		this.closeModal();
	};

	render() {
		return (
			<div className="notebook-container">
				<div className="notes-display">
					<Accordion>
						{this.state.notes.map((note, index) => (
							<Accordion.Item eventKey={index.toString()} key={note._id}>
								<Accordion.Header>
									{note.date}
								</Accordion.Header>
								<Accordion.Body>
									<h2>{note.title}</h2>
									<p>{note.entry}</p>
									<Button variant="danger" onClick={() => this.deleteNote(note._id)} style={{marginLeft: '10px'}}>Delete</Button>
									<Button variant="primary" onClick={() => this.openModal(note)} style={{marginLeft: '10px'}}>Edit</Button>
								</Accordion.Body>
							</Accordion.Item>
						))}
					</Accordion>
				</div>
				<Button variant="primary" onClick={this.openModal}>Add Note</Button>
				<Note
					key={this.state.showModal}
					show={this.state.showModal}
					handleClose={this.closeModal}
					handleInputChange={this.handleInputChange}
					newNote={this.state.newNote}
					handleFormSubmit={this.handleFormSubmit}
				/>
			</div>
		);
	}


}

export default Notebook;