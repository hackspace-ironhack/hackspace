import React from "react";
import { Card, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";

class ChatPage extends React.Component {
  state = {
    typedMessage: "",
    messages: []
  }

  userId = this.props.match.params.id;
  intervalId = null
  
  componentDidMount = () => {
    this.loadMessages();
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
    event.preventDefault();
    axios.post(`/api/chat/messages/${this.userId}`, { message: this.state.typedMessage })
      .then(response => {
        const { success } = response.data;
        if (success) {
          this.loadMessages(true);
        }
      });
  }

  loadMessages = (clearInput = false) => {
    axios.get(`/api/chat/messages/${this.userId}`)
      .then(response => {
        const { messages } = response.data;
        console.log(messages);
        this.setState({
          messages: messages,
          typedMessage: clearInput ? "" : this.state.typedMessage,
        });
      });
  }

  render = () => {
    return (
      <Container>
        {this.state.messages.map((message) => 
          <Card key={message._id} className={this.props.user && this.props.user._id === message.from._id ? "text-right" : ""}>
            <Card.Body>
              <Card.Title>
                {message.from.username}
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
