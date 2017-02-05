import React, { Component } from 'react'
// import Hackernews from './Hackernews'
import RedditFeed from './RedditFeed'
import YoutubeFeed from './YoutubeFeed'
import { Grid, Container } from 'semantic-ui-react'
import LocalForage from 'localforage'
import CustomLinks from './CustomLinks'
import MasonryList from './MasonryList.js'
import Menu from './Menu'
import IntroMessage from './IntroMessage'
import PageHeader from './PageHeader'

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
      introMessageVisible: true,
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
    this.toggleIntroMessage = this.toggleIntroMessage.bind(this);
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
    LocalForage.getItem('localIntroMessageVisible').then(function(localIntroMessageVisible){
      if (localIntroMessageVisible != null){
        self.setState({introMessageVisible: localIntroMessageVisible})
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

  toggleIntroMessage(){
    this.setState({introMessageVisible: !this.state.introMessageVisible});
    LocalForage.setItem('localIntroMessageVisible', false)
  }

  combineFeedsArrays(){
    let allFeedsArray = []

    this.state.redditFeeds.map(redditFeedName => {
      let redditFeedItem = <RedditFeed key={redditFeedName} redditFeedName={redditFeedName}/>
      allFeedsArray.push(redditFeedItem)
      return redditFeedItem
    })

    this.state.youtubeFeeds.map(youtubeFeedName => {
      let youtubeFeedItem = <YoutubeFeed key={youtubeFeedName} username={youtubeFeedName}/>
      allFeedsArray.push(youtubeFeedItem)
      return youtubeFeedItem
    })

    return allFeedsArray

  }

  render() {

    let allFeeds = this.combineFeedsArrays()

    let ShowIntroMessage = () => {
      return (
        this.state.introMessageVisible ?
          <IntroMessage closeMessage={this.toggleIntroMessage}/> : null
      )
    }

    return (
      <Container>
        <PageHeader toggleHelp={this.toggleIntroMessage}/>
        <ShowIntroMessage/>
        <Grid>
            <Menu
            handleRedditChange={this.handleRedditChange}
            handleRedditSubmit={this.handleRedditSubmit}
            redditValue={this.state.redditValue}
            handleYoutubeChange={this.handleYoutubeChange}
            handleYoutubeSubmit={this.handleYoutubeSubmit}
            youtubeValue={this.state.youtubeValue}
            toggleHackernews={this.toggleHackernews}
            hackernewsVisible={this.state.hackernewsVisible}
            />
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <CustomLinks links={this.state.customLinks} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <MasonryList feeds={allFeeds}/>
      </Container>
    );
  }
}

export default App;
