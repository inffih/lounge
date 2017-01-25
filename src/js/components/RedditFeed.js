import React from 'react'
import RedditFeedItem from './RedditFeedItem'
import Axios from 'axios'
import LoaderComponent from './LoaderComponent'
import { Card, Grid } from 'semantic-ui-react'
import LocalForage from 'localforage'

class RedditFeed extends React.Component {

  constructor(){
    super()
    this.state = {
      redditData: [],
      fetching: false
    }
    this.showLoading = this.showLoading.bind(this);
    this.showContent = this.showContent.bind(this);
  }

  componentDidMount(){
    let self = this
    LocalForage.getItem('localRedditData').then(function(localRedditData){
      if (localRedditData != null){
        console.log("using localforage reddit")
        self.setState({redditData: localRedditData})
      }
      else {
        console.log("fetching reddit")
        self.fetchFeed()
      }
    })
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
        LocalForage.setItem('localRedditData', this.state.redditData)
      })
  }

  showLoading(){
    return (
      <Card fluid>
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
  }

  showContent(){
    return (
      <Card fluid>
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

  render() {
    return (
      <Grid.Column mobile={16} tablet={8} computer={8}>
        { this.state.fetching ? <this.showLoading/> : <this.showContent/> }
      </Grid.Column>
    )
  }
}

export default RedditFeed
