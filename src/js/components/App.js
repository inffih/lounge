import React, { Component } from 'react'
import Hackernews from './Hackernews'
import RedditFeed from './RedditFeed'
import YoutubeFeed from './YoutubeFeed'
import { Grid, Container } from 'semantic-ui-react'
import CustomLinks from './CustomLinks'
import Menu from './Menu'
import IntroMessage from './IntroMessage'
import PageHeader from './PageHeader'
import { observer } from 'mobx-react'
import StackGrid from 'react-stack-grid'

@observer
class App extends Component {

  constructor(){
    super();
    this.state = {
      combinedArray: []
    }
  }

  combineFeedElements(){
    let youtubeDataArray = this.props.youtubeStore.youtubeData.map((youtubeFeed, index) => {
      return <YoutubeFeed key={youtubeFeed.channelId} id={youtubeFeed.channelId} data={youtubeFeed.data} title={youtubeFeed.title} removeFeed={this.props.youtubeStore.removeFeed} />
    })
    let redditFeedsArray = this.props.redditStore.redditData.map(redditFeed => {
      return <RedditFeed key={redditFeed.name} name={redditFeed.name} feed={redditFeed.data} removeFeed={this.props.redditStore.removeFeed} />
    })
    return [...youtubeDataArray, ...redditFeedsArray]
  }

  render() {
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
            { this.props.uiStore.hackernewsVisible ? <Hackernews/> : null }
          </Grid.Row>
        </Grid>
        <StackGrid
          columnWidth={265}
          gutterWidth={20}
          gutterHeight={20}
          duration={0}
        >
        {this.combineFeedElements()}
        </StackGrid>
      </Container>
    );
  }
}

export default App;
