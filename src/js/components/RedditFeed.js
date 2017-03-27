import React from 'react'
import RedditFeedItem from './RedditFeedItem'
import Axios from 'axios'
import LoaderComponent from './LoaderComponent'
import { Card, Grid, Button, Icon } from 'semantic-ui-react'

class RedditFeed extends React.Component {

  constructor(){
    super()
    this.state = {
      redditData: [],
      fetching: false
    }

    this.showLoading = this.showLoading.bind(this);
    this.showContent = this.showContent.bind(this);
    this.handleRemoveFeed = this.handleRemoveFeed.bind(this)
  }

  componentDidMount(){
    this.fetchFeed()
  }

  handleRemoveFeed(){
    this.props.removeFeed(this.props.redditFeedName)
  }

  fetchFeed(){
    this.setState({fetching: true})
    let url = "https://www.reddit.com/" + this.props.redditFeedName + "/top.json?limit=10"
    Axios.get(url)
      .then(response =>{
        this.setState({
          redditData: response.data.data.children,
          fetching: false
        })
      })
  }

  showLoading(){
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {this.props.redditFeedName}
            <Button
              floated="right"
              compact
              icon
              circular
              onClick={this.handleRemoveFeed}
            >
              <Icon name='close' />
            </Button>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <LoaderComponent/>
        </Card.Content>
      </Card>
    )
  }

  showContent(){
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {this.props.redditFeedName}
            <Button
              floated="right"
              compact
              icon
              circular
              onClick={this.handleRemoveFeed}
            >
              <Icon name='close' />
            </Button>
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

  render() {
    return (
      <Grid.Column mobile={16} tablet={8} computer={8}>
        { this.state.fetching ? <this.showLoading/> : <this.showContent/> }
      </Grid.Column>
    )
  }
}

export default RedditFeed
