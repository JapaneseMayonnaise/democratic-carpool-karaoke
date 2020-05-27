import React, { Component } from 'react';
import './PlaylistGenerator.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class PlaylistGenerator extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      user1Generation: '',
      user2Generation: '',
      isPlaylistMadeYet: false,
      playlistName: 'Democratic Carpool Karaoke'
    }
  }

  setValue = (e) =>
  {
    // console.log("value: "+ e.target.value);
    // console.log("name: "+ [e.target.name]);

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  sendUsersGeneration = async e => {
    e.preventDefault();

    // const UriTofetchFrom = 'https://democratic-carpool-karaoke.herokuapp.com/firstClick';
    const UriTofetchFrom = 'http://localhost:5000/firstClick';

    const response = await fetch(UriTofetchFrom,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ gen1: this.state.user1Generation,
                             gen2: this.state.user2Generation,
                             playlistName: this.state.playlistName,
                           })
    });
    const body = await response.text();
    this.setState({ isPlaylistMadeYet: body });
  };

  render()
  {
    return(
      <>
        <div className="PlaylistGenerator_container">
          <Form>
            <Form.Group className="user1-form-multi-select">
              <Form.Label>What year were you born in?</Form.Label>
                <Col xs={{span:2, offset:0}}>
                  <Form.Control as="select"  className="user1-form-multi-select-options" name="user1Generation" onChange={this.setValue} size="lg">
                    <option value=''>Choose...</option>
                    <option value='1930'>Before 1930s</option>
                    <option value='1940'>1940s</option>
                    <option value='1950'>1950s</option>
                    <option value='1960'>1960s</option>
                    <option value='1970'>1970s</option>
                    <option value='1980'>1980s</option>
                    <option value='1990'>1990s</option>
                    <option value='2000'>2000s</option>
                    <option value='2010'>After 2010s</option>
                    <option value=''>Don't even ask</option>
                  </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group className="user2-form-multi-select">
              <Form.Label>What year was your carpool buddy born in?</Form.Label>
                <Col xs={{span:2, offset:0}} >
                  <Form.Control as="select" className="user2-form-multi-select-options" name="user2Generation" onChange={this.setValue} size="lg">
                    <option value=''>Choose...</option>
                    <option value='1930'>Before 1930s</option>
                    <option value='1940'>1940s</option>
                    <option value='1950'>1950s</option>
                    <option value='1960'>1960s</option>
                    <option value='1970'>1970s</option>
                    <option value='1980'>1980s</option>
                    <option value='1990'>1990s</option>
                    <option value='2000'>2000s</option>
                    <option value='2010'>After 2010s</option>
                    <option value=''>Don't even ask</option>
                  </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group className="playlist-name">
            <Form.Label>Playlist Title?</Form.Label>
              <Col xs={{span:4, offset:0}}>
              <Form.Control className="playlist-name-form" name="playlistName" onChange={this.setValue} type="text" placeholder="Democratic Carpool Karaoke" size="lg"/>
              </Col>
            </Form.Group>
          </Form>
          {this.state.isPlaylistMadeYet ?
            <Button className='playlistgenerator-button' 
            variant="outline-success" 
            type="button" 
            
            // href='https://democratic-carpool-karaoke.herokuapp.com/secondClick' 
            href='http://localhost:5000/secondClick' 
            size="lg">
              Done! Go to your Spotify account
            </Button>
            :
            <Button className='playlistgenerator-button' variant="danger" type="submit" onClick={this.sendUsersGeneration} size="lg">
             Create Playlist
            </Button>
          }
        </div>
        <Row>
          <Col className='h6 playlistgenerator-photo-credit fixed-bottom text-center'>Made By <a href="https://github.com/DrCardamom/democratic-carpool-karaoke">Shimba</a>. Photo by <a href="https://unsplash.com/@anniespratt">Annie Spratt</a>. 2019</Col>
        </Row>
      </>
    );
    }
}

export default PlaylistGenerator;
