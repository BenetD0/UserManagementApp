import { useEffect, useState } from "react";
import { Edit, Mail, MapPin, Phone, Plus, Trash, Building, Search } from "lucide-react";
import { Button, Card, Col, Container, Row, Spinner, Alert, Badge, Form, InputGroup } from "react-bootstrap";
import useUsersStore from "../store/usersStore";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import UserForm from "../components/UserForm";
import UserDetailsModal from "../components/UserDetailsModal";
import type { User } from "../store/usersStore";

const UsersList = () => {
  const { users, isLoading, errorMsg, fetchUsers, deleteUser } = useUsersStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null); 

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers();
    }
  }, []);


  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleAddUser = () => {
    setEditingUser(null); 
    setShowUserForm(true);
  };

 
  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleCloseForm = () => {
    setShowUserForm(false);
    setEditingUser(null); 
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setSelectedUser(null);
  };


  if (showUserForm) {
    return <UserForm 
      isEdit={!!editingUser} 
      user={editingUser} 
      onClose={handleCloseForm} 
    />;
  }

  if (isLoading) {
    return (
      <Container className="py-4">
        <div className="text-center py-5">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h5 className="text-body-secondary">Loading users...</h5>
        </div>
      </Container>
    );
  }

  if (errorMsg) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{errorMsg}</p>
          <Button variant="outline-danger" onClick={fetchUsers}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h2 className="text-primary mb-0">User Management</h2>
        <Button 
          className="d-flex align-items-center items-center gap-2" 
          size="sm"
          onClick={handleAddUser}
        >
          <Plus size={18}/>
          <span className="d-none d-sm-inline">Add New User</span>
          <span className="d-sm-none">Add</span>
        </Button>
      </div>

   
      <div className="mb-4">
        <InputGroup>
          <InputGroup.Text>
            <Search size={18} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search users by name, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button 
              variant="outline-secondary" 
              onClick={() => setSearchQuery('')}
            >
              Clear
            </Button>
          )}
        </InputGroup>
        {searchQuery && (
          <div className="mt-2 text-muted">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        )}
      </div>
      
    
      <DeleteConfirmationModal
        show={showDeleteModal}
        user={userToDelete}
        onHide={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

     
      <UserDetailsModal
        show={showDetailsModal}
        user={selectedUser}
        onHide={handleCloseDetails}
      />

      {filteredUsers.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-body-secondary">
            {searchQuery ? 'No users found matching your search' : 'No users found'}
          </h5>
          <p className="text-body-secondary">
            {searchQuery ? 'Try a different search term' : 'Click "Add New User" button to get started'}
          </p>
          {searchQuery && (
            <Button variant="outline-primary" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <Row className="g-4 py-4">
          {filteredUsers.map(user => {
            return (
              <Col key={user.id} xs={12} md={6} lg={4}>
                <Card 
                  className="h-100 user-card" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleUserClick(user)}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h6 className="text-primary mb-1 text-truncate">
                        {user.name}
                      </h6>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(user); 
                          }}
                        >
                          <Edit size={14}/>
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(user);
                          }}
                        >
                          <Trash size={14}/>
                        </Button>
                      </div>
                    </div>
                    
                  
                    {user.company && (
                      <div className="mb-2">
                        <Badge bg="light" text="dark" className="d-flex align-items-center gap-1">
                          <Building size={12} />
                          {user.company.name}
                        </Badge>
                      </div>
                    )}

                    <div className="mb-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Mail size={16} className="text-body-secondary flex-shrink-0"/>
                        <small className="text-break">{user.email}</small>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Phone size={16} className="text-body-secondary flex-shrink-0"/>
                        <small className="text-break">{user.phone}</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-2">
                      <MapPin size={16} className="text-body-secondary mt-1 flex-shrink-0"/>
                      <div className="flex-grow-1">
                        <div className="small">
                          {user.address.suite} {" "} {user.address.street}
                        </div>
                        <div className="text-body-secondary">
                          {user.address.city}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
    </Container>
  )
}

export default UsersList;