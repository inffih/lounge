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

    let youtubeDataArray = this.props.youtubeStore.youtubeFeeds.map(id => {
      return <YoutubeFeed key={id} id={id} removeFeed={this.props.youtubeStore.removeFeed} />
    })

    return (
      <Container>
        <PageHeader toggleHelp={this.props.uiStore.toggleIntroMessage}/>
        { this.props.uiStore.introMessageVisible ? <IntroMessage closeMessage={this.props.uiStore.toggleIntroMessage}/> : null }
        <Grid>
          <Menu
            uiStore={this.props.uiStore}
            redditStore={this.props.redditStore}
            youtubeStore={this.props.youtubeStore}
            linkStore={this.props.linkStore}
          />
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={16}>
              <CustomLinks links={this.props.linkStore.links} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            { this.props.uiStore.hackernewsVisible ? <Hackernews/> : null }
            {youtubeDataArray}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
