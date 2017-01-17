import React from 'react'
import { Feed } from 'semantic-ui-react'

const SubredditFeedItem = ({item}) => (

  <Feed>
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary>
          <a target="_blank" href="#">title</a>
        </Feed.Summary>
        <Feed.Date as="a" href="#" target="_blank">Comments</Feed.Date>
      </Feed.Content>
    </Feed.Event>
  </Feed>
)

export default SubredditFeedItem
