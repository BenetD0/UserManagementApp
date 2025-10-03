import type React from "react";
import { Button, Modal } from "react-bootstrap"
import type { User } from "../store/usersStore";

type DeleteConfirmationModalProps = {
    show: boolean;
    user: User | null,
    onHide: ()=> void;
    onConfirm: ()=> void;
}


const DeleteConfirmationModal:React.FC<DeleteConfirmationModalProps> = ({
    show, user,onHide, onConfirm
}) => {
  return (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete the user <strong>{user?.name}</strong></p>
            <p>This action cannot be undone</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>Cancel</Button>
            <Button variant="danger" onClick={onConfirm}>Delete User</Button>
        </Modal.Footer>



    </Modal>
  )
}

export default DeleteConfirmationModal