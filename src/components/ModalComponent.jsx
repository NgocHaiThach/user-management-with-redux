import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteUserThunk } from '../redux/userSlice';

export default function ModalComponent({
	idUser,
	title,
	text,
	action,
	show,
	handleClose,
}) {
	console.log(show)
	const dispatch = useDispatch();
	const handleDelete = () => {
		dispatch(deleteUserThunk(idUser));
		handleClose();
	};
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{text}</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Trở về
				</Button>
				<Button variant='danger' onClick={handleDelete}>
					{action}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
