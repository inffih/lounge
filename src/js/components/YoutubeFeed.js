import React from 'react'
import YoutubeFeedItem from './YoutubeFeedItem'
import Axios from 'axios'
import { Card, Grid } from 'semantic-ui-react'
import LoaderComponent from './LoaderComponent'
import LocalForage from 'localforage'
import config from '../../../api.config'

class YoutubeFeed extends React.Component {

  // State includes youtubeData array for videos and fetching boolean
  constructor(){
    super()
    console.log(config.GOOGLE_API_KEY)
    this.state = {
      youtubeData: [],
      fetching: false
    }
    this.showLoading = this.showLoading.bind(this);
    this.showContent = this.showContent.bind(this);
  }

  // Check if youtubeData exist locally, if not, fetch from api
  componentDidMount(){
    let self = this
    LocalForage.getItem('localYoutubeData').then(function(localYoutubeData){
      if (localYoutubeData != null){
        console.log("using localforage youtube")
        self.setState({youtubeData: localYoutubeData})
      }
      else {
        console.log("fetching youtube")
        self.fetchChannel()
      }
    })
  }

  // Fetch channel details by username
  // Then pass along the "uploads"-playlist ID to fetchVideos
  fetchChannel(){
    this.setState({fetching: true})
    Axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: "contentDetails",
        forUsername: this.props.username,
        key: config.GOOGLE_API_KEY
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
        key: config.GOOGLE_API_KEY
      }
    })
      .then(response => {
        this.setState({
          youtubeData: response.data.items,
          fetching: false
        })
        LocalForage.setItem('localYoutubeData', this.state.youtubeData)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // UI component for loading state
  showLoading(){
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {this.props.username}
          </Card.Header>
        </Card.Content>
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
            {this.props.username}
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
