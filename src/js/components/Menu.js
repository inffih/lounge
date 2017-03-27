import React, { Component } from 'react'
import { Grid, Radio, Header, Search } from 'semantic-ui-react'
import { observer } from 'mobx-react'

@observer
class Menu extends Component {

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

        <Grid.Column mobile={16} tablet={8} computer={4}>
          <Header as="h5">Toggle show Hackernews</Header>
          <Radio toggle onClick={this.props.uiStore.toggleHackernews} checked={this.props.uiStore.hackernewsVisible}/>
        </Grid.Column>
      </Grid.Row>
    )
  }

}

export default Menu
