import React, { Component } from 'react'
import Hackernews from './Hackernews'
import RedditFeed from './RedditFeed'
// import YoutubeFeeds from './YoutubeFeeds'
import { Grid, Container, Card, Header } from 'semantic-ui-react'
import AddFeedField from './AddFeedField.js'

class App extends Component {

  constructor(){
    super();
    this.state = {
      redditValue: '',
      subreddits: []
    }
    this.handleRedditChange = this.handleRedditChange.bind(this);
    this.handleRedditSubmit = this.handleRedditSubmit.bind(this);
    this.handleYoutubeChange = this.handleYoutubeChange.bind(this);
    this.handleYoutubeSubmit = this.handleYoutubeSubmit.bind(this);
  }

  handleRedditChange(event){
    this.setState({redditValue: event.target.value});
  }

  handleRedditSubmit(event){
    event.preventDefault();
    let subredditArray = [...this.state.subreddits, this.state.redditValue]
    this.setState({subreddits: subredditArray});
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
          {this.state.subreddits.map(subreddit => {
            return <RedditFeed key={subreddit} subreddit={subreddit}/>
          })}
        </Card.Group>
      </Container>
    );
  }
}

export default App;
