import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { Button, Container, Form, Header } from 'semantic-ui-react';
import { loginInputChanged, login } from '../features/auth/loginSlice';

const Login = () => {
    const { credentials, status } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'succeeded') {
            navigate('/');
        }
    }, [status, dispatch]);

    const handleInputChange = (field, event) => {
        dispatch(loginInputChanged({
            [field]: event.target.value
        }));
    };

    return (
        <div>
            <div>
                <Header as='h1' content='Login Page' textAlign='center' />
            </div>

            <Container>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='Username' value={ credentials.username } onChange={ handleInputChange.bind(null, 'username') } />
                    </Form.Field>

                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' value={ credentials.password } onChange={ handleInputChange.bind(null, 'password') } />
                    </Form.Field>

                    <Button onClick={ () => dispatch(login(credentials)) }>Login</Button>
                </Form>

            </Container>
        </div>
    );
};

export default Login;
