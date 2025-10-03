// UserDetailsModal.tsx
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Mail, Phone, MapPin, Globe, Building } from "lucide-react";
import type { User } from "../store/usersStore";

type UserDetailsModalProps = {
    show: boolean;
    user: User | null;
    onHide: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
    show, user, onHide
}) => {
    if (!user) return null;

    return (
        <Modal show={show} onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <h6 className="text-primary">{user.name}</h6>
                    {user.username && (
                        <p className="text-muted mb-2">@{user.username}</p>
                    )}
                </div>

                <div className="mb-3">
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <Mail size={16} className="text-body-secondary"/>
                        <span>{user.email}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <Phone size={16} className="text-body-secondary"/>
                        <span>{user.phone}</span>
                    </div>
                    {user.website && (
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <Globe size={16} className="text-body-secondary"/>
                            <span>{user.website}</span>
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <h6 className="d-flex align-items-center gap-2 mb-2">
                        <MapPin size={16} />
                        Address
                    </h6>
                    <div className="ps-3">
                        <div>{user.address.street}</div>
                        <div>{user.address.suite}</div>
                        <div>{user.address.city}, {user.address.zipcode}</div>
                    </div>
                </div>

                {user.company && (
                    <div className="mb-3">
                        <h6 className="d-flex align-items-center gap-2 mb-2">
                            <Building size={16} />
                            Company
                        </h6>
                        <div className="ps-3">
                            <div><strong>{user.company.name}</strong></div>
                            {user.company.catchPhrase && (
                                <div className="text-muted">{user.company.catchPhrase}</div>
                            )}
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserDetailsModal;