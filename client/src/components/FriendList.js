import React from "react";
import { Container, ListGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class FriendList extends React.Component {
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
    let link;
    if (this.props.chat) {
      link = "/chat/";
    } else {
      link = "/profile/";
    }
    return (
      <Container className="contact-list-container" >
        <ListGroup >
        <Card.Header className="bg-warning">Contact List</Card.Header>
          {this.state.friends.map((friend) =>
            <ListGroup.Item action variant="light" key={friend.to._id}>
              <Link to={link + friend.to._id}>{friend.to.name}</Link>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>
    );
  }
}

export default FriendList;
