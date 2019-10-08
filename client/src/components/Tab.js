import React from "react";
import { Link } from "react-router-dom";
import { Tabs } from "react-bootstrap";


const Tab = props => {

  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
    <Tab eventKey="timline" title="Timeline">
      <Sonnet />
    </Tab>
    <Tab eventKey="projects" title="Project">
      <Sonnet />
    </Tab>
    <Tab eventKey="todolist" title="To Do List" disabled>
      <Sonnet />
    </Tab>
    <Tab eventKey="contacts" title="Contacts" disabled>
      <Sonnet />
    </Tab>
  </Tabs>
}

export default Tab;