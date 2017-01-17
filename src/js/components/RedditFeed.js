import React from 'react'
import SubredditFeedItem from './SubredditFeedItem'
import Axios from 'axios'
import { Card } from 'semantic-ui-react'
import * as subredditData from '../../tempdata/reddit.json'

class Subreddit extends React.Component {

  constructor(){
    super()
    this.state = {
      subredditData: subredditData.data.children
    }
  }

  componentDidMount(){
    // Axios.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    //   .then(response =>{
    //     this.loopNews(response.data)
    //   })
  }

  render() {
    return (
      <Card>
      {console.log(this.state.subredditData)}
        <Card.Content>
          <Card.Header>
            r/{this.props.subreddit}
          </Card.Header>
        </Card.Content>
        <Card.Content>
          {this.state.subredditData.map(item => {
            return <SubredditFeedItem key={item.data.id} item={item}/>
          })}
        </Card.Content>
      </Card>
    )
  }
}

export default Subreddit
