import React, { Component } from 'react'
import Hackernews from './Hackernews'
import RedditFeeds from './RedditFeeds'
import YoutubeFeeds from './YoutubeFeeds'
import { Container } from 'semantic-ui-react'

class App extends Component {
  render() {
    return (
      <Container>
        <Hackernews/>
        <RedditFeeds/>
        <YoutubeFeeds/>
      </Container>
    );
  }
}

export default App;
