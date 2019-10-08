import React from "react";
import { ListGroup, ListGroupItem, Container, Form, Alert } from "react-bootstrap";
import {Link} from 'react-router-dom';
import axios from "axios";

class SearchPage extends React.Component {
    state = {
        query: "",
        results: [],
        message: undefined
    }

    handleChange = (event) => {
        this.setState({
            query: event.target.value
        })
    }

    onSend = (event) => {
        event.preventDefault();
        axios.get(`/api/user?q=${this.state.query}`)
            .then(response => {
                if (response.data.users.length > 0) {
                    this.setState({
                        results: response.data.users,
                        message: undefined,
                    });
                } else {
                    axios.get(`/api/user`)
                        .then(response => {
                            this.setState({
                                results: response.data.users,
                                message: 'No user found, showing everyone'
                            });
                        });
                }
            });
    }

    render = () => {
        return (
            <Container>
                <Form onSubmit={this.onSend}>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Search" onChange={this.handleChange} value={this.state.typedMessage}/>
                    </Form.Group>
                </Form>
                {this.state.message &&
                    <Alert variant='danger'>{this.state.message}</Alert>
                }
                {this.state.results.length > 0 &&
                    <ListGroup>
                        {this.state.results.map(item => {
                            return <ListGroupItem>
                                <Link to={`/profile/${item._id}`}>{item.name}</Link>
                            </ListGroupItem>
                        })}
                    </ListGroup>
                }
            </Container>
        );
    }
}

export default SearchPage;
