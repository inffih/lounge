import React from 'react'
import { Feed, Image } from 'semantic-ui-react'

const Thumbnail = (props) => {
  if (/(http).*$/.test(props.url)){
    return <Image avatar floated="left" fluid src={props.url} />
  }
  else {
    return <Image avatar floated="left" fluid src={process.env.PUBLIC_URL + "/reddit.png"} />
  }
}


const RedditFeedItem = ({item}) => (

  <Feed>
    <Feed.Event>
      <Thumbnail url={item.data.thumbnail}/>
      <Feed.Content>
        <Feed.Summary>
          <a target="_blank" href={item.data.url}>{item.data.title}</a>
        </Feed.Summary>
        <Feed.Date as="a" href={'https://www.reddit.com' + item.data.permalink} target="_blank">{item.data.num_comments + " Comments"} </Feed.Date>
      </Feed.Content>
    </Feed.Event>
  </Feed>
)

export default RedditFeedItem
