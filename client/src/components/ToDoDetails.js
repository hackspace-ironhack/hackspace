import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default class ToDoDetails extends Component {
  state = {
    title: "",
    description: "",
    project: ""
  };

  componentDidMount() {
    const todoId = this.props.match.params.id;

    return axios
      .get(`/api/tasks/${todoId}`)
      .then(response => {
        const { title, description, project } = response.data;
        this.setState({ title, description, project });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const todo = {
      title: this.state.title,
      description: this.state.description,
      project: this.state.project
    };

    return (
      <div>
        <h1>{todo.title}</h1>
        <p>{todo.description}</p>
        <Link to={`/projects/${todo.project}`}>Back to project</Link>
      </div>
    );
  }
}
