import React, { Component } from 'react'
import Hackernews from './Hackernews'
import RedditFeed from './RedditFeed'
import YoutubeFeed from './YoutubeFeed'
import { Grid, Container, Card, Header } from 'semantic-ui-react'
import AddFeedField from './AddFeedField.js'

class App extends Component {

  constructor(){
    super();
    this.state = {
      redditValue: '',
      redditFeeds: []
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
    let redditArray = [...this.state.redditFeeds, this.state.redditValue]
    this.setState({
      redditFeeds: redditArray,
      redditValue: ""
    });
  }


  handleYoutubeChange(event){
    this.setState({redditValue: event.target.value});
  }

  handleYoutubeSubmit(event){
    event.preventDefault();
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
                value={this.state.redditValue}
                labelText='Add subreddit'
                defaultText='e.g. "All"'
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <AddFeedField
                handleChange={this.handleYoutubeChange}
                handleSubmit={this.handleYoutubeSubmit}
                name="Youtube"
                value={this.state.redditValue}
                labelText='Add YouTube channel'
                defaultText='e.g. "Google"'
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Card.Group itemsPerRow={3} stackable>
        </Card.Group>
      </Container>
    );
  }
}

export default App;

// <Hackernews />
// <YoutubeFeed username="2bcproductions"/>
// {this.state.redditFeeds.map(redditFeedName => {
//   return <RedditFeed key={redditFeedName} redditFeedName={redditFeedName}/>
// })}
