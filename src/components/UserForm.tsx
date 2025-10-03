// UserForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {z} from 'zod';
import useUsersStore from "../store/usersStore";
import { useEffect } from "react";

const userSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address '),
    phone: z.string().regex(/^\d{8,}$/, 
        'Phone number must be either 8digits'
    ),
    city: z.string().min(2, "City must be at least 2 characters"),
    suite: z.string().min(2, "Suite must be at least 2 characters"),
    streetName: z.string().min(2, "street name must be at least 2 characters"),
    zipcode: z.string().optional()
})

type UserFormData = z.infer<typeof userSchema>;

type UserFormProps = {
    isEdit?: boolean;
    user?: any; // Shto këtë prop për edit
    onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ isEdit = false, user, onClose }) => {
    const { addUser, updateUser } = useUsersStore(); // Shto updateUser
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset // Shto reset
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
    });

    const navigate = useNavigate();

    // Shto useEffect për të populuar formën kur është edit
    useEffect(() => {
        if (isEdit && user) {
            reset({
                name: user.name,
                email: user.email,
                phone: user.phone,
                city: user.address.city,
                suite: user.address.suite,
                streetName: user.address.street,
                zipcode: user.address.zipcode
            });
        }
    }, [isEdit, user, reset]);
    
    const onSubmit = (data: UserFormData) => {
        if (isEdit && user) {
            // Update user ekzistues
            const updatedUser = {
                ...user,
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: {
                    ...user.address,
                    street: data.streetName,
                    suite: data.suite,
                    city: data.city,
                    zipcode: data.zipcode || ""
                }
            };
            updateUser(user.id, updatedUser);
        } else {
            // Shto user të ri
            const newUser = {
                id: 0,
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: {
                    street: data.streetName,
                    suite: data.suite,
                    city: data.city,
                    zipcode: data.zipcode || ""
                }
            };
            addUser(newUser);
        }
        onClose();
    }

    console.log('errors', errors)

    return <Container className="py-4">
        <Row className="justify-content-center">
            <Col lg={8}>
                <Card className="shadow">
                    <Card.Header className="bg-primary text-white">
                        <h3 className="mb-0">{isEdit ? 'Edit User' : 'Add New User'}</h3>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter user name"
                                        isInvalid={!!errors.name}
                                        {...register('name')} />
                                        {errors.name && (
                                        <div className="error-text">{errors.name.message}</div>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" 
                                        placeholder="Enter email" 
                                            isInvalid={!!errors.email}
                                        {...register('email')} />
                                        {errors.email && (
                                        <div className="error-text">{errors.email.message}</div>
                                        )} 
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="tel" placeholder="Enter phone number" 
                                             isInvalid={!!errors.phone}
                                        {...register('phone')} 
                                        />
                                         {errors.phone && (
                                        <div className="error-text">{errors.phone.message}</div>
                                        )} 
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control type="text" placeholder="Enter user city" 
                                         isInvalid={!!errors.city}
                                         {...register('city')} />
                                        {errors.city && (
                                        <div className="error-text">{errors.city.message}</div>
                                        )} 
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Suite</Form.Label>
                                        <Form.Control type="text" placeholder="Enter suite" 
                                         isInvalid={!!errors.suite}
                                         {...register('suite')} />
                                          {errors.suite && (
                                        <div className="error-text">{errors.suite.message}</div>
                                        )} 
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Zip Code</Form.Label>
                                        <Form.Control type="text" placeholder="Enter zip code" 
                                         isInvalid={!!errors.zipcode}
                                         {...register('zipcode')} />
                                        {errors.zipcode && (
                                        <div className="error-text">{errors.zipcode.message}</div>
                                        )} 
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Street Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter street name"
                                           isInvalid={!!errors.streetName} 
                                            {...register('streetName')} />
                                         {errors.streetName && (
                                        <div className="error-text">{errors.streetName.message}</div>
                                        )} 
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className="d-flex gap-2 justify-content-end">
                                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                                <Button variant="primary" type="submit" >
                                    {isEdit ? 'Update User' : 'Add User'}
                                </Button>
                            </div>

                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
}

export default UserForm