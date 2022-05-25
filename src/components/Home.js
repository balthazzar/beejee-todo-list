import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { Button, Container, Form, Modal, Header, Icon, Pagination, Table } from 'semantic-ui-react';

import {
    fetchTodos,
    fetchTodosSorted,
    openModal,
    addTodo,
    newInputChanged
} from '../features/todos/todosSlice';

import { logout, checkAuth } from '../features/auth/loginSlice';

const Home = () => {
    const { modalOpen, entities, status, totalPages, page, sort, todo } = useSelector(state => state.todos);
    const authStatus = useSelector(state => state.auth).status;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus === 'idle') {
            dispatch(checkAuth());
        }

        if (status === 'idle') {
            dispatch(fetchTodos(0));
        }
    }, [status, dispatch]);

    const handlePageChange = (event, data) => {
        dispatch(Object.keys(sort).length
            ? fetchTodosSorted({
                page: data.activePage - 1,
                column: Object.keys(sort)[0],
                direction: sort[Object.keys(sort)[0]]
            }) : fetchTodos(data.activePage - 1));
    };

    const handleLoginButton = () => {
        authStatus === 'succeeded' ? dispatch(logout()) : navigate('/login');
    };

    const handleSortChange = (column) => {
        dispatch(fetchTodosSorted({ page, column, direction: sort[column] === 'descending' ? 'ascending' : 'descending' }));
    };

    const handleCreateItem = () => {
        dispatch(addTodo(todo));
        dispatch(openModal(false));
    };

    const handleInputChange = (field, event) => {
        dispatch(newInputChanged({
            [field]: event.target.value
        }));
    };

    return (
        <div>
            <div>
                <Header as='h1' content='BeeJee TODO-list (test task)' textAlign='center' />
                <Button floated='right' onClick={ handleLoginButton }>{ authStatus === 'succeeded' ? 'Logout' : 'Login'}</Button>
            </div>

            <Container>
                <Modal
                    onClose={ () => dispatch(openModal(false)) }
                    onOpen={ () => dispatch(openModal(true)) }
                    open={ modalOpen }
                    size='mini'
                >
                    <Modal.Header>TODO item</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Username</label>
                                <input placeholder='Username' value={ todo.username} onChange={ handleInputChange.bind(null, 'username') } />
                            </Form.Field>

                            <Form.Field>
                                <label>Email</label>
                                <input placeholder='Email' value={ todo.email } onChange={ handleInputChange.bind(null, 'email') } />
                            </Form.Field>

                            <Form.Field>
                                <label>Task Description</label>
                                <textarea placeholder='Task description...' value={ todo.content } onChange={ handleInputChange.bind(null, 'content') } />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={ () => dispatch(openModal(false)) }>
                            Cancel
                        </Button>
                        <Button onClick={ handleCreateItem }>OK</Button>
                    </Modal.Actions>
                </Modal>

                <Table sortable singleline textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sorted={ sort.status || null } onClick={ handleSortChange.bind(null, 'status') }><Icon name='check' /></Table.HeaderCell>
                            <Table.HeaderCell>Task Description</Table.HeaderCell>
                            <Table.HeaderCell sorted={ sort.username || null } onClick={ () => { handleSortChange('username') } }>Username</Table.HeaderCell>
                            <Table.HeaderCell sorted={ sort.email || null } onClick={ () => { handleSortChange('email') } }>E-mail address</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { entities.map(todo => (
                            <Table.Row key={ todo.id } color={ todo.status && 'green' || 'black' } disabled={ todo.status } >
                                <Table.Cell>{ todo.status && <Icon name='check' color='green' /> }</Table.Cell>
                                <Table.Cell>{ todo.content }</Table.Cell>
                                <Table.Cell>{ todo.username }</Table.Cell>
                                <Table.Cell>{ todo.email }</Table.Cell>
                            </Table.Row>
                        )) }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    primary
                                    size='small'
                                    onClick={ () => dispatch(openModal(true)) }
                                >
                                    <Icon name='plus' />&nbsp;Add Task
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>

                <Pagination
                    totalPages={ totalPages }
                    boundaryRange={ 0 }
                    defaultActivePage={ 1 }
                    ellipsisItem={ null }
                    firstItem={ null }
                    lastItem={ null }
                    siblingRange={ 5 }
                    onPageChange={ handlePageChange }
                />
            </Container>
        </div>
    );
};

export default Home;
