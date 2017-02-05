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
      lfValue: 0,
      redditValue: '',
      redditFeeds: [],
      youtubeValue: '',
      youtubeFeeds: [],
      allFeedsArray: [],
      hackernewsVisible: false,
      introMessageVisible: true,
      customLinks:[
        {url: 'google.com', name: 'google'},
        {url: 'yahoo.com', name: 'yahoo'},
      ]
    }

    // Adding up lfValue per LocalForage call.
    // This is a horrible hack to fake async call for combineFeedsArrays
    // Switch to flux or redux in the future for easier state management

    self = this
    LocalForage.getItem('localRedditFeeds').then(function(localRedditFeeds){
      self.state.lfValue++
      if (localRedditFeeds != null){
        self.state.redditFeeds = localRedditFeeds
      }
      self.combineFeedArrays()
    })

    LocalForage.getItem('localYoutubeFeeds').then(function(localYoutubeFeeds){
      self.state.lfValue++
      if (localYoutubeFeeds != null){
        self.state.youtubeFeeds = localYoutubeFeeds
      }
      self.combineFeedArrays()
    })

    LocalForage.getItem('localHackernewsVisible').then(function(localHackernewsVisible){
      self.state.lfValue++
      if (localHackernewsVisible != null){
        self.state.hackernewsVisible = localHackernewsVisible
      }
      self.combineFeedArrays()
    })

    LocalForage.getItem('localIntroMessageVisible').then(function(localIntroMessageVisible){
      self.state.lfValue++
      if (localIntroMessageVisible != null){
        self.state.introMessageVisible = localIntroMessageVisible
      }
      self.combineFeedArrays()
    })

    this.handleRedditChange = this.handleRedditChange.bind(this);
    this.handleRedditSubmit = this.handleRedditSubmit.bind(this);
    this.handleYoutubeChange = this.handleYoutubeChange.bind(this);
    this.handleYoutubeSubmit = this.handleYoutubeSubmit.bind(this);
    this.toggleHackernews = this.toggleHackernews.bind(this);
    this.toggleIntroMessage = this.toggleIntroMessage.bind(this);

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

  // Checking lfValue from constructor's LocalForage methods
  // This is a horrible hack to fake async call for combineFeedsArrays
  // Switch to flux or redux in the future for easier state management

  combineFeedArrays(){
    if (this.state.lfValue === 4){
      let allFeeds = []
      this.state.redditFeeds.map(redditFeedName => {
        console.log("called")
        let redditFeedItem = <RedditFeed key={redditFeedName} redditFeedName={redditFeedName}/>
        allFeeds = [...this.state.allFeedsArray, redditFeedItem]
        this.setState({
          allFeedsArray: allFeeds
        })
        return redditFeedItem
      })

      this.state.youtubeFeeds.map(youtubeFeedName => {
        let youtubeFeedItem = <YoutubeFeed key={youtubeFeedName} username={youtubeFeedName}/>
        allFeeds = [...this.state.allFeedsArray, youtubeFeedItem]
        this.setState({
          allFeedsArray: allFeeds
        })
        return youtubeFeedItem
      })
    }
  }

  render() {

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
        <MasonryList feeds={this.state.allFeedsArray}/>
      </Container>
    );
  }
}

export default App;
