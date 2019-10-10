import React from "react";
import { Card, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";

class ChatPage extends React.Component {
  state = {
    typedMessage: "",
    messages: [],
    profile: {},
  }

  intervalId = null
  
  componentDidMount = () => {
    this.loadMessages();
    this.loadProfile();
    this.intervalId = window.setInterval(this.loadMessages, 5000);
  }

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  }

  handleChange = (event) => {
    this.setState({
      typedMessage: event.target.value
    })
  }

  onSend = (event) => {
    const userId = this.props.match.params.id;
    event.preventDefault();
    axios.post(`/api/chat/messages/${userId}`, { message: this.state.typedMessage })
      .then(response => {
        const { success } = response.data;
        if (success) {
          this.loadMessages(true);
        }
      });
  }

  loadMessages = (clearInput = false) => {
    const userId = this.props.match.params.id;
    axios.get(`/api/chat/messages/${userId}`)
      .then(response => {
        const { messages } = response.data;
        console.log(messages);
        this.setState({
          messages: messages,
          typedMessage: clearInput ? "" : this.state.typedMessage,
        });
      });
  }

  loadProfile = () => {
    // only loads a different user if an id is passed in the url
    const userId = this.props.match.params.id;
    if (userId !== undefined) {
      axios.get(`/api/user/${userId}`)
        .then(response => this.setState({ profile: response.data }));
    }
}

  render = () => {
    return (
      <Container className="chat-page-container">
          <Card bg="warning">
          <Card.Header>
            Chat with: {this.state.profile.name}
          </Card.Header>
          </Card>
        
        {this.state.messages.map((message) => 
          <Card key={message._id} className={this.props.user && this.props.user._id === message.from._id ? "text-right border-secondary" : ""}>
            <Card.Body>
              <Card.Title>
                {message.from.name}
              </Card.Title>
              <Card.Text>
                {message.message}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        <Form onSubmit={this.onSend}>
          <Form.Group>
            <Form.Control type="text" placeholder="Enter message" onChange={this.handleChange} value={this.state.typedMessage}/>
          </Form.Group>
        </Form>
    </Container>);
  }
}

export default ChatPage;
