import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ModalComponent({ title, text, action, show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{text}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Trở về
                </Button>
                <Button
                    variant="danger"
                >
                    {action}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

