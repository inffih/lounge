import React, { Component } from 'react'
import YoutubeFeedItem from './YoutubeFeedItem'
import { Card, Grid, Button, Icon } from 'semantic-ui-react'
import LoaderComponent from './LoaderComponent'
import Axios from 'axios'

class YoutubeFeed extends Component {

  // State includes youtubeData array for videos and fetching boolean
  constructor(){
    super()
    this.state = {
      fetching: false,
      youtubeData: [],
      title: ""
    }

    this.handleRemoveFeed = this.handleRemoveFeed.bind(this)
    this.fetchChannel = this.fetchChannel.bind(this)
    this.fetchVideos = this.fetchVideos.bind(this)
    this.showContent = this.showContent.bind(this)
    this.showLoading = this.showLoading.bind(this)
  }

  componentDidMount(){
    this.fetchChannel()
  }

  // Fetch channel details by userId
  // Then pass along the "uploads"-playlist ID to fetchVideos
  fetchChannel(){

    this.setState({fetching: true})
    Axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: "contentDetails",
        id: this.props.id,
        key: process.env.REACT_APP_GOOGLE_KEY
      }
    })
      .then(response => {
        let id = response.data.items[0].contentDetails.relatedPlaylists.uploads
        this.fetchVideos(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Fetch videos by fetchChannel's playlist ID and set the response to state
  fetchVideos(id){
    Axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: "snippet",
        maxResults: 4,
        playlistId: id,
        key: process.env.REACT_APP_GOOGLE_KEY
      }
    })
      .then(response => {
        this.setState({
          youtubeData: response.data.items,
          fetching: false,
          title: response.data.items[0].snippet.channelTitle
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRemoveFeed(){
    this.props.removeFeed(this.props.id)
  }

  // UI component for loading state
  showLoading(){
    return (
      <Card fluid>
        <Card.Content>
          <LoaderComponent/>
        </Card.Content>
      </Card>
    )
  }

  // UI component for videolist
  showContent() {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
          {this.state.title}
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
          {this.state.youtubeData.map(item => {
            return <YoutubeFeedItem key={item.id} item={item.snippet}/>
          })}
        </Card.Content>
      </Card>
    )
  }

  // Check if fetching or not, and show UI components accordingly
  render() {
    return (
      <Grid.Column mobile={16} tablet={8} computer={8}>
        { this.state.fetching ? <this.showLoading/> : <this.showContent/> }
      </Grid.Column>
    )
  }

}

export default YoutubeFeed
