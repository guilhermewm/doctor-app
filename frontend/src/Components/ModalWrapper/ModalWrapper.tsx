import React from 'react';
import { Button, Modal } from 'react-bootstrap';

type ModalWrapperProps = {
    show?: any,
    handleClose?: any,
    error: string
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({show, handleClose, error}) => {

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>Error: {error}</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalWrapper;
