import React, { Component } from 'react';
import './App.css';

class App extends Component
{
    state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  componentDidMount()
  {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () =>
  {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  startOAuth = async () =>
  {
    const url = "/login";
    fetch(url)
    .then(response => response.text())
    .then(contents => console.log(contents))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
  };

  handleSubmit = async e =>
  {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render()
  {
      if(true){
      return (
        <div className="test">
            <div className="Main">
              <h1>👨👵👶🏽👩🏻‍ Reacty Family Drive 👧🏿👩👨🏻‍👦🏼</h1>
              <p>Carpool with family/friends from diffreent age groups? Not sure what music to put on?<br />
              This app can help you! It generates a playlist that consists of hit songs from the time when you are/were in your 20s.</p>
              <button onClick={this.startOAuth}>🚗 Get started 🚗</button>
            </div>

            <p> =========== TEST  =========== </p>
            <p>{this.state.response}</p>
               <form onSubmit={this.handleSubmit}>
                 <p>
                   <strong>wanna check POST request?↓</strong>
                 </p>
                 <input
                   type="text"
                   value={this.state.post}
                   onChange={e => this.setState({ post: e.target.value })}
                 />
                 <button type="submit">Submit</button>
               </form>
            <p>{this.state.responseToPost}</p>
        </div>
      )
      }else{
        return(
            <div className="Container">
                <h3>What year were you born in?</h3>
                <button><a href="/1930s_user1">1930's</a></button>
                <button><a href="/1940s_user1">1940's</a></button>
                <button><a href="/1950s_user1">1950's</a></button>
                <button><a href="/1960s_user1">1960's</a></button>
                <button><a href="/1970s_user1">1970's</a></button>
                <button><a href="/after1980_user1">After 1980's</a></button>

                <h3>What year was your today's carpool buddy born in?</h3>
                <button><a href="/1930s_user2">1930's</a></button>
                <button><a href="/1940s_user2">1940's</a></button>
                <button><a href="/1950s_user2">1950's</a></button>
                <button><a href="/1960s_user2">1960's</a></button>
                <button><a href="/1970s_user2">1970's</a></button>
                <button><a href="/after1980_user2">After 1980's</a></button>
                <br />
                <button class="mix"><a href="/merge_createPlaylist">Have a nice ride!</a></button>
            </div>
      )
      }
  }
}

export default App;
