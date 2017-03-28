import React, { Component } from 'react'
import { Grid, Radio, Header, Search, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react'

@observer
class Menu extends Component {

  clearFeeds(){
    this.props.uiStore.clearLocalforage()
    this.props.uiStore.hackernewsVisible = false
    this.props.youtubeStore.youtubeFeeds = []
    this.props.redditStore.redditFeeds = []
  }

  render(){
    return (
      <Grid.Row>
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <Header as="h5">Add Youtube channel</Header>
          <Search
            onResultSelect={this.props.youtubeStore.handleYoutubeSubmit}
            onSearchChange={this.props.youtubeStore.handleYoutubeSearchChange}
            value={this.props.youtubeStore.youtubeSearchTerm}
            results={this.props.youtubeStore.youtubeChannels}
            loading={this.props.youtubeStore.searchLoading}
          />
        </Grid.Column>

        <Grid.Column mobile={16} tablet={8} computer={4}>
          <Header as="h5">Add Reddit feed</Header>
          <Search
            onResultSelect={this.props.redditStore.handleRedditSubmit}
            onSearchChange={this.props.redditStore.handleRedditSearchChange}
            value={this.props.redditStore.redditSearchterm}
            results={this.props.redditStore.redditSubreddits}
            loading={this.props.redditStore.searchLoading}
          />
        </Grid.Column>

        <Grid.Column mobile={16} tablet={8} computer={2}>
          <Header as="h5">Show Hackernews (coming soon)</Header>
          <Radio toggle disabled onClick={this.props.uiStore.toggleHackernews} checked={this.props.uiStore.hackernewsVisible}/>
        </Grid.Column>

        <Grid.Column mobile={16} tablet={8} computer={2}>
          <Header as="h5">Clear all feeds</Header>
          <Button onClick={this.clearFeeds.bind(this)}>Clear</Button>
        </Grid.Column>

      </Grid.Row>
    )
  }

}

export default Menu
