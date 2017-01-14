import React, { Component } from 'react'
import Hackernews from './Hackernews'
import RedditFeeds from './RedditFeeds'
import YoutubeFeeds from './YoutubeFeeds'

class App extends Component {
  render() {
    return (
      <div>
        <Hackernews/>
        <RedditFeeds/>
        <YoutubeFeeds/>
      </div>
    );
  }
}

export default App;
