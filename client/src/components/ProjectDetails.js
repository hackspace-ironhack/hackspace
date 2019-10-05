import React, { Component } from "react";
import EditProject from "./EditProject";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { Button } from "react-bootstrap";
import axios from "axios";

export default class ProjectDetails extends Component {
  state = {
    project: null,
    editForm: false,
    addTask: false,
    title: "",
    description: "",
    error: null
  };

  getData = () => {
    const id = this.props.match.params.id;
    axios
      .get(`/api/projects/${id}`)
      .then(response => {
        this.setState({
          project: response.data,
          title: response.data.title,
          description: response.data.description
        });
      })
      .catch(err => {
        console.log(err.response);
        // handle err.response depending on err.response.status
        if (err.response.status === 404) {
          this.setState({ error: "Not found" });
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  toggleEditForm = () => {
    this.setState({
      editForm: !this.state.editForm
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const id = this.props.match.params.id;
    axios
      .put(`/api/projects/${id}`, {
        title: this.state.title,
        description: this.state.description
      })
      .then(response => {
        this.setState({
          project: response.data,
          title: response.data.title,
          description: response.data.description,
          editForm: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteProject = () => {
    const id = this.props.match.params.id;
    axios.delete(`/api/projects/${id}`).then(() => {
      this.props.history.push("/projects");
    });
  };

  render() {
    if (this.state.error) return <div>{this.state.error}</div>;
    else if (!this.state.project) return <></>;

    // const { title, description } = this.state.project;

    const owner = this.state.project.owner;
    const currentUser = this.props.user;

    // const canDelete = !!(currentUser && currentUser._id === owner);

    let canDelete = false;
    if (currentUser && currentUser._id === owner) canDelete = true;

    return (
      <div>
        <h1>{this.state.project.title}</h1>
        <p>{this.state.project.description}</p>

        <Button onClick={this.toggleEditForm}>Show Edit form</Button>
        <Button
          onClick={() => this.setState({ taskForm: !this.state.taskForm })}
        >
          Show Task form
        </Button>
        {canDelete && (
          <Button variant="danger" onClick={this.deleteProject}>
            Delete project
          </Button>
        )}

        {/* form that is displayed when the edit button is clicked */}
        {this.state.editForm && (
          <EditProject
            // spread properties from the state (title and description will be needed in the child component)
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        )}

        {this.state.taskForm && (
          <AddTask
            projectId={this.state.project._id}
            getData={this.getData}
            hideForm={() => this.setState({ taskForm: false })}
          />
        )}

        <TaskList tasks={this.state.project.tasks} />
      </div>
    );
  }
}
