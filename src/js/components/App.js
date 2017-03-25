import React, { Component } from 'react'
import Hackernews from './Hackernews'
import RedditFeed from './RedditFeed'
import YoutubeFeed from './YoutubeFeed'
import { Grid, Container } from 'semantic-ui-react'
import CustomLinks from './CustomLinks'
// import Masonry from 'react-masonry-component'
import Menu from './Menu'
import IntroMessage from './IntroMessage'
import PageHeader from './PageHeader'
import { observer } from 'mobx-react'

@observer
class App extends Component {

  constructor(){
    super();
    this.state = {
      youtubeFeedsArray: []
    }
  }

  render() {

    let redditFeedsArray = this.props.redditStore.redditFeeds.map(redditFeedName => {
      return <RedditFeed key={redditFeedName} redditFeedName={redditFeedName}/>
    })

    let youtubeFeedsArray = this.props.youtubeStore.youtubeFeeds.map(youtubeFeedName => {
      return <YoutubeFeed key={youtubeFeedName} username={youtubeFeedName}/>
    })


    return (
      <Container>
        <PageHeader toggleHelp={this.props.uiStore.toggleIntroMessage}/>
        { this.props.uiStore.introMessageVisible ? <IntroMessage closeMessage={this.props.uiStore.toggleIntroMessage}/> : null }
        <Grid>
            <Menu
            handleRedditChange={this.props.redditStore.handleRedditChange}
            handleRedditSubmit={this.props.redditStore.handleRedditSubmit}
            redditValue={this.props.redditStore.redditValue}
            handleYoutubeChange={this.props.youtubeStore.handleYoutubeChange}
            handleYoutubeSubmit={this.props.youtubeStore.handleYoutubeSubmit}
            youtubeValue={this.props.youtubeStore.youtubeValue}
            toggleHackernews={this.props.uiStore.toggleHackernews}
            hackernewsVisible={this.props.uiStore.hackernewsVisible}
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
