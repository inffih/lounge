import React from 'react'
import { Feed } from 'semantic-ui-react'

const HackernewsFeedItem = ({item}) => (
  <Feed>
    {console.log(item.url)}
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary>
          <a target="_blank" href={item.url}>{item.title}</a>
        </Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  </Feed>
)

export default HackernewsFeedItem
