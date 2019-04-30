import React, { Component } from 'react';
import './PlaylistGenerator.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

class PlaylistGenerator extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      user1Generation: null,
      user2Generation: null
    }
  }

  setGeneration = (e) =>
  {
    console.log("value: "+ e.target.value);
    console.log("name: "+ [e.target.name]);

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render()
  {
    return(
      <Container className="PlaylistGenerator_container">
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>What year were you born in?</Form.Label>
            <Col xs={{span:2, offset:5}}>
              <Form.Control as="select" name="user1Generation" onChange={this.setGeneration}>
              <option value='1940'>1940</option>
              <option value='1950'>1950</option>
              <option value='1960'>1960</option>
              <option value='1970'>1970</option>
              <option value='1980'>1980</option>
              </Form.Control>
            </Col>
            {this.state.user1Generation ? this.state.user1Generation : "null"}
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>What year were your carpool buddy born in?</Form.Label>
            <Col xs={{span:2, offset:5}}>
              <Form.Control as="select" name="user2Generation" onChange={this.setGeneration}>
              <option value='1940'>1940</option>
              <option value='1950'>1950</option>
              <option value='1960'>1960</option>
              <option value='1970'>1970</option>
              <option value='1980'>1980</option>
              </Form.Control>
              {this.state.user2Generation ? this.state.user2Generation : "null"}
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit">
            Go To The Playlist
          </Button>
        </Form>
      </Container>
    );
    }
}

export default PlaylistGenerator;
