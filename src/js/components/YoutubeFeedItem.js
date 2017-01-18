import React from 'react'
import { Feed, Embed } from 'semantic-ui-react'

const RedditFeedItem = ({item}) => (

  <Feed>
    <Feed.Event>
      <Feed.Content>
        <Embed
          id={item.resourceId.videoId}
          placeholder={item.thumbnails.standard.url}
          source="youtube"
        />
        <Feed.Summary>
          <a
            target="_blank"
            href={"https://www.youtube.com/watch?v=" + item.resourceId.videoId}
            >
            {item.title}
          </a>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  </Feed>
)

export default RedditFeedItem
