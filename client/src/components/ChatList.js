import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class ChatList extends React.Component {
  state = {
    friends: [],
  }
  
  componentDidMount() {
    this.loadFriends();
  }

  loadFriends = () => {
    axios.get('/api/chat').then(response => {
      const { friends } = response.data;
      this.setState({ friends });
    });
  }

  render = () => {
    return (
      <Container>
        <ListGroup>
          {this.state.friends.map((friend) =>
            <ListGroup.Item key={friend.to._id}>
              <Link to={`/chat/${friend.to._id}`}>{friend.to.username}</Link>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>
    );
  }
}

export default ChatList;
