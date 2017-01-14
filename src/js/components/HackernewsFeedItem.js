import React from 'react'
import { Feed } from 'semantic-ui-react'

let url = "https://news.ycombinator.com/item?id=";

const HackernewsFeedItem = ({item}) => (

  <Feed>
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary>
          <a target="_blank" href={item.url}>{item.title}</a>
        </Feed.Summary>
        <Feed.Date as="a" href={url + item.id} target="_blank">Comments</Feed.Date>
      </Feed.Content>
    </Feed.Event>
  </Feed>
)

export default HackernewsFeedItem
