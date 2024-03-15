import React from 'react';
import axios from 'axios';
import { Accordion, Button } from 'react-bootstrap';
import Note from './Note.jsx';
import { withAuth0 } from '@auth0/auth0-react';



const backendServer = import.meta.env.VITE_APP_BACKEND_URL

class Notebook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [],
			newNote: {
				date: '',
				title: '',
				entry: ''
			},
			showModal: false
		};
	}

	componentDidMount() {
		this.fetchNotes();
	}
	componentDidUpdate(prevProps) {
		// Check if the user has changed
		if (this.props.auth0.user !== prevProps.auth0.user) {
			this.fetchNotes();
		}
	}

	getToken = () => {
		return this.props.auth0.getIdTokenClaims()
		.then(res => res.__raw)
		.catch(err => console.err(err))
	}


	openModal = (note) => {
		this.setState({
			showModal: true,
			newNote: note
				? {
					_id: note._id,
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
		const token = await this.getToken();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try{
			const response = await axios.get(`${backendServer}/notes`, config);
			this.setState({notes: response.data});
		} catch (error){
			console.error('Error fetching notes', error);
		}

	};

	createNote = async (note) => {
		const token = await this.getToken();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			await axios.post(`${backendServer}/notes`, note, config);
			this.fetchNotes();
		} catch (error) {
			console.error('Error creating note:', error);
		}
	};

	updateNote = async (id, updatedNote) => {
		const token = await this.getToken();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			await axios.put(`${backendServer}/notes/${id}`, updatedNote, config);
			this.fetchNotes();
		} catch(error){
			console.error('Error updating note:', error);
		}
	};

	deleteNote = async (id) => {
		const token = await this.getToken();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try{
			await axios.delete(`${backendServer}/notes/${id}`, config);
			this.fetchNotes();
		} catch(error){
			console.error('Error deleting note:', error);
		}
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

		const { user} = this.props.auth0;
		return (
			<div className="notebook-container">
				<h1 className='notebook-header'>{user.name.split(' ')[0]}'s Notebook</h1>
				<div className="notes-display">
					<Accordion className='accordion'>
						{this.state.notes.map((note, index) => (
							<Accordion.Item eventKey={index.toString()} key={note._id}>
								<Accordion.Header>
									<span className="note-title">{note.title}</span>
									<p className='note-date'>{note.date}</p>
								</Accordion.Header>
								<Accordion.Body>
									<p>{note.entry.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
									<br/>
									<Button variant="danger" onClick={() => this.deleteNote(note._id)} style={{marginLeft: '10px'}}>Delete</Button>
									<Button variant="primary" onClick={() => this.openModal(note)} style={{marginLeft: '10px'}}>Edit</Button>								</Accordion.Body>
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

export default withAuth0(Notebook);