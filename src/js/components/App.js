import React, { Component } from 'react'
import Hackernews from './Hackernews'
// import RedditFeeds from './RedditFeeds'
// import YoutubeFeeds from './YoutubeFeeds'
import { Divider, Grid, Container, Card, Header } from 'semantic-ui-react'
import AddFeedField from './AddFeedField.js'

class App extends Component {

  constructor(){
    super();
    this.state = { redditValue: ''}
    this.handleRedditChange = this.handleRedditChange.bind(this);
    this.handleRedditSubmit = this.handleRedditSubmit.bind(this);
    this.handleYoutubeChange = this.handleYoutubeChange.bind(this);
    this.handleYoutubeSubmit = this.handleYoutubeSubmit.bind(this);
  }

  handleRedditChange(event){
    this.setState({redditValue: event.target.value});
    console.log("changed")
  }

  handleRedditSubmit(event){
    event.preventDefault();
    console.log('Field has changed to ' + this.state.redditValue);
  }


  handleYoutubeChange(event){
    this.setState({redditValue: event.target.value});
    console.log("changed")
  }

  handleYoutubeSubmit(event){
    event.preventDefault();
    console.log('Field has changed to ' + this.state.redditValue);
  }

  render() {
    return (
      <Container>
        <Header dividing size="huge" color="blue">Lounge</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <AddFeedField
                handleChange={this.handleRedditChange}
                handleSubmit={this.handleRedditSubmit}
                name="Subreddit"
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <AddFeedField
                handleChange={this.handleYoutubeChange}
                handleSubmit={this.handleYoutubeSubmit}
                name="Youtube"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Card.Group itemsPerRow={3} stackable>
          <Hackernews/>
          <Hackernews/>
          <Hackernews/>
          <Hackernews/>
        </Card.Group>
      </Container>
    );
  }
}

export default App;
