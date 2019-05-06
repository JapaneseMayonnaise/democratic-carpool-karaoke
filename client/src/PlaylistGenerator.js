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
      user2Generation: null,
      isPlaylistMadeYet: null
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

  sendUsersGeneration = async e => {
    e.preventDefault();
    const response = await fetch('https://family-drive.herokuapp.com/doAllTheJob',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gen1: this.state.user1Generation,
                             gen2: this.state.user2Generation,
                           })
    });
    const body = await response.text();
    this.setState({ isPlaylistMadeYet: body });
  };

  render()
  {
    return(
      <Container className="PlaylistGenerator_container">
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>What year were you born in?</Form.Label>
            <Col xs={{span:2, offset:5}}>
              <Form.Control as="select" name="user1Generation" onChange={this.setGeneration}>
              <option value=''>I was born in...</option>
              <option value='1930'>Before 1930s</option>
              <option value='1940'>1940s</option>
              <option value='1950'>1950s</option>
              <option value='1960'>1960s</option>
              <option value='1970'>1970s</option>
              <option value='1980'>After 1980s</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>What year were your carpool buddy born in?</Form.Label>
            <Col xs={{span:2, offset:5}}>
              <Form.Control as="select" name="user2Generation" onChange={this.setGeneration}>
              <option value=''>I was born in...</option>
              <option value='1930'>Before 1930s</option>
              <option value='1940'>1940s</option>
              <option value='1950'>1950s</option>
              <option value='1960'>1960s</option>
              <option value='1970'>1970s</option>
              <option value='1980'>After 1980s</option>
              </Form.Control>
            </Col>
          </Form.Group>
          {this.state.isPlaylistMadeYet ?
            <Button variant="primary" type="button" href='https://familydrive-reactjs.herokuapp.com/test'>
              Done! Seriously. Go Check It.
            </Button>
            :
            <Button variant="primary" type="submit" onClick={this.sendUsersGeneration}>
             Make a Playlist
            </Button>
          }
        </Form>
      </Container>
    );
    }
}

export default PlaylistGenerator;
