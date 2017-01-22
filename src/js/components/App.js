import React, { Component } from 'react'
import Hackernews from './Hackernews'
import RedditFeed from './RedditFeed'
import YoutubeFeed from './YoutubeFeed'
import { Grid, Container, Header, Radio } from 'semantic-ui-react'
import AddFeedField from './AddFeedField.js'
import LocalForage from 'localforage'
import CustomLinks from './CustomLinks'

class App extends Component {

  constructor(){
    super();

    // LocalForage.clear()

    this.state = {
      redditValue: '',
      redditFeeds: [],
      youtubeValue: '',
      youtubeFeeds: [],
      hackernewsVisible: false,
      customLinks:[
        {url: 'google.com', name: 'google'},
        {url: 'yahoo.com', name: 'yahoo'},
        {url: 'customlink.com', name: 'customlink'},
        {url: 'anothercustomlink.com', name: 'anothercustomlink'},
        {url: 'baidu.com', name: 'baidu'},
        {url: 'bing.com', name: 'bing'}
      ]

    }

    this.handleRedditChange = this.handleRedditChange.bind(this);
    this.handleRedditSubmit = this.handleRedditSubmit.bind(this);
    this.handleYoutubeChange = this.handleYoutubeChange.bind(this);
    this.handleYoutubeSubmit = this.handleYoutubeSubmit.bind(this);
    this.toggleHackernews = this.toggleHackernews.bind(this);

  }


  componentDidMount(){
    let self = this

    LocalForage.getItem('localRedditFeeds').then(function(localRedditFeeds){
      if (localRedditFeeds != null){
        self.setState({redditFeeds: localRedditFeeds})
      }

    })
    LocalForage.getItem('localYoutubeFeeds').then(function(localYoutubeFeeds){
      if (localYoutubeFeeds != null){
        self.setState({youtubeFeeds: localYoutubeFeeds})
      }

    })
    LocalForage.getItem('localHackernewsVisible').then(function(localHackernewsVisible){
      if (localHackernewsVisible != null){
        self.setState({hackernewsVisible: localHackernewsVisible})
      }
    })

  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.redditFeeds !== this.state.redditFeeds){
      LocalForage.setItem('localRedditFeeds', this.state.redditFeeds)
    }
    if(prevState.youtubeFeeds !== this.state.youtubeFeeds){
      LocalForage.setItem('localYoutubeFeeds', this.state.youtubeFeeds)
    }
    if(prevState.hackernewsVisible !== this.state.hackernewsVisible){
      LocalForage.setItem('localHackernewsVisible', this.state.hackernewsVisible)
    }
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
    this.setState({youtubeValue: event.target.value});
  }

  handleYoutubeSubmit(event){
    event.preventDefault();
    let youtubeArray = [...this.state.youtubeFeeds, this.state.youtubeValue]
    this.setState({
      youtubeFeeds: youtubeArray,
      youtubeValue: ""
    })
  }

  toggleHackernews(event){
    this.setState({hackernewsVisible: !this.state.hackernewsVisible});
  }

  render() {
    return (
      <Container>
        <Header dividing size="huge" color="blue">Lounge</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <AddFeedField
                handleChange={this.handleRedditChange}
                handleSubmit={this.handleRedditSubmit}
                name="Subreddit"
                value={this.state.redditValue}
                labelText='Add subreddit'
                defaultText='e.g. "All"'
              />
            </Grid.Column>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <AddFeedField
                handleChange={this.handleYoutubeChange}
                handleSubmit={this.handleYoutubeSubmit}
                name="Youtube"
                value={this.state.youtubeValue}
                labelText='Add YouTube channel'
                defaultText='e.g. "Google"'
              />
            </Grid.Column>
              <Grid.Column mobile={16} tablet={8} computer={4}>
                <Header as="h5">Show Hackernews</Header>
                <Radio toggle onClick={this.toggleHackernews} checked={this.state.hackernewsVisible}/>
              </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
            <CustomLinks links={this.state.customLinks} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>

            { this.state.hackernewsVisible && <Hackernews />}

            {
              this.state.redditFeeds.map(redditFeedName => {
                return <RedditFeed key={redditFeedName} redditFeedName={redditFeedName}/>
              })
            }

            {
              this.state.youtubeFeeds.map(youtubeFeedName => {
                return <YoutubeFeed key={youtubeFeedName} username={youtubeFeedName}/>
              })
            }

          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
