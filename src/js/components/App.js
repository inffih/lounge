import React, { Component } from 'react'
import Hackernews from './Hackernews'
import RedditFeed from './RedditFeed'
import YoutubeFeed from './YoutubeFeed'
import { Grid, Container, Header } from 'semantic-ui-react'
import LocalForage from 'localforage'
import CustomLinks from './CustomLinks'
import Masonry from 'react-masonry-component'
import Menu from './Menu'
import IntroMessage from './IntroMessage'
import PageHeader from './PageHeader'
import { observer } from 'mobx-react'

@observer
class App extends Component {

  constructor(){
    super();
    LocalForage.clear()

    this.state = {
      allFeedsArray: [],
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
        self.props.redditStore.redditFeeds = localRedditFeeds
      }

    })
    LocalForage.getItem('localYoutubeFeeds').then(function(localYoutubeFeeds){
      if (localYoutubeFeeds != null){
        self.props.redditStore.youtubeFeeds = localYoutubeFeeds
      }

    })
    LocalForage.getItem('localHackernewsVisible').then(function(localHackernewsVisible){
      if (localHackernewsVisible != null){
        this.props.uiStore.hackernewsVisible = localHackernewsVisible
      }
    })
    LocalForage.getItem('localIntroMessageVisible').then(function(localIntroMessageVisible){
      if (localIntroMessageVisible != null){
        this.props.uiStore.introMessageVisible = localIntroMessageVisible
      }
    })

  }

  handleRedditChange(event){
    this.props.redditStore.redditValue = event.target.value
  }

  handleRedditSubmit(event){
    event.preventDefault()
    let redditArray = [...this.props.redditStore.redditFeeds, this.props.redditStore.redditValue]
    this.props.redditStore.redditFeeds = redditArray
    this.props.redditStore.redditValue = ""
    LocalForage.setItem('localRedditFeeds', this.props.redditStore.redditFeeds).bind(this)

  }

  handleYoutubeChange(event){
    this.props.youtubeStore.youtubeValue = event.target.value
  }

  handleYoutubeSubmit(event){
    event.preventDefault();
    let youtubeArray = [...this.props.youtubeStore.youtubeFeeds, this.props.youtubeStore.youtubeValue]
    this.props.youtubeStore.youtubeFeeds = youtubeArray
    this.props.youtubeStore.youtubeValue = ""
  }

  toggleHackernews(event){
    this.props.uiStore.hackernewsVisible = !this.props.uiStore.hackernewsVisible
    LocalForage.setItem('localHackernewsVisible', this.props.uiStore.hackernewsVisible)
  }

  toggleIntroMessage(){
    console.log("toggling")
    console.log(this.props.uiStore.introMessageVisible)
    this.props.uiStore.introMessageVisible = !this.props.uiStore.introMessageVisible
    LocalForage.setItem('localIntroMessageVisible', false)
  }

  render() {

    let redditFeedsArray = this.props.redditStore.redditFeeds.map(redditFeedName => {
      return <RedditFeed key={redditFeedName} redditFeedName={redditFeedName}/>
    })

    let youtubeFeedsArray = this.props.youtubeStore.youtubeFeeds.map(youtubeFeedName => {
      return <YoutubeFeed key={youtubeFeedName} username={youtubeFeedName}/>
    })

    // if (this.state.hackernewsVisible && <Hackernews />) {
    //   this.setState(...this.state.allFeedsArray, <Hackernews /> )
    // }


    // add all individual component arrays to one big array
    // feed that array as props to Masonry UI component


    return (
      <Container>
        <PageHeader toggleHelp={this.toggleIntroMessage}/>
        { this.props.uiStore.introMessageVisible ? <IntroMessage closeMessage={this.toggleIntroMessage}/> : null }
        <Grid>
            <Menu
            handleRedditChange={this.handleRedditChange}
            handleRedditSubmit={this.handleRedditSubmit}
            redditValue={this.props.redditStore.redditValue}
            handleYoutubeChange={this.handleYoutubeChange}
            handleYoutubeSubmit={this.handleYoutubeSubmit}
            youtubeValue={this.state.youtubeValue}
            toggleHackernews={this.toggleHackernews}
            hackernewsVisible={this.state.hackernewsVisible}
            />
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <CustomLinks links={this.props.linkStore.links} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            { this.props.uiStore.hackernewsVisible ? <Hackernews/> : null }
            {redditFeedsArray}
            {youtubeFeedsArray}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
