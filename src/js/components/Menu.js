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
  hackernewsVisible,
  handleYoutubeErrorDismiss,
  youtubeInputErrorMsgVisible,
  handleRedditErrorDismiss,
  redditInputErrorMsgVisible

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
          handleErrorDismiss={handleRedditErrorDismiss}
          inputErrorMsgVisible={redditInputErrorMsgVisible}
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
          handleErrorDismiss={handleYoutubeErrorDismiss}
          inputErrorMsgVisible={youtubeInputErrorMsgVisible}
        />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={4}>
        <Header as="h5">Show Hackernews</Header>
        <Radio toggle onClick={toggleHackernews} checked={hackernewsVisible}/>
      </Grid.Column>
    </Grid.Row>
  )

export default Menu
