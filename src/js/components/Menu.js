import React from 'react'
import { Grid, Radio, Header } from 'semantic-ui-react'
import AddFeedField from './AddFeedField'

const Menu = ({

  handleRedditChange,
  handleRedditSubmit,
  redditValue,
  handleYoutubeChange,
  handleYoutubeSubmit,
  youtubeValue,
  toggleHackernews,
  hackernewsVisible

  }) => (
    <Grid.Row>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <AddFeedField
          handleChange={handleRedditChange}
          handleSubmit={handleRedditSubmit}
          name="Subreddit"
          value={redditValue}
          labelText='Add subreddit'
          defaultText='e.g. "All"'
        />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <AddFeedField
          handleChange={handleYoutubeChange}
          handleSubmit={handleYoutubeSubmit}
          name="Youtube"
          value={youtubeValue}
          labelText='Add YouTube channel'
          defaultText='e.g. "Google"'
        />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Header as="h5">Show Hackernews</Header>
        <Radio toggle onClick={toggleHackernews} checked={hackernewsVisible}/>
      </Grid.Column>
    </Grid.Row>
  )

export default Menu
