import React from 'react'
import RedditFeedItem from './RedditFeedItem'
import Axios from 'axios'
import LoaderComponent from './LoaderComponent'
import { Card } from 'semantic-ui-react'

class RedditFeed extends React.Component {

  constructor(){
    super()
    this.state = {
      redditData: [],
      fetching: false
    }
  }

  componentDidMount(){
    this.fetchFeed()
  }

  fetchFeed(){
    this.setState({fetching: true})
    let url = "https://www.reddit.com/r/" + this.props.redditFeedName + "/top.json?limit=10"
    Axios.get(url)
      .then(response =>{
        this.setState({
          redditData: response.data.data.children,
          fetching: false
        })
      })
  }

  render() {
    if(this.state.fetching){
      return(
        <Card>
          <Card.Content>
            <Card.Header>
              r/{this.props.redditFeedName}
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <LoaderComponent/>
          </Card.Content>
        </Card>
      )
    } else {
      return (
        <Card>
          <Card.Content>
            <Card.Header>
              r/{this.props.redditFeedName}
            </Card.Header>
          </Card.Content>
          <Card.Content>
            {this.state.redditData.map(item => {
              return <RedditFeedItem key={item.data.id} item={item}/>
            })}
          </Card.Content>
        </Card>
      )
    }

  }
}

export default RedditFeed
