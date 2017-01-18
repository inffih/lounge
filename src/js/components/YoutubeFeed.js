import React from 'react'
// import YoutubeFeedItem from './YoutubeFeedItem'
import Axios from 'axios'
import { Card } from 'semantic-ui-react'
import * as config from '../../tempdata/api.config.json'

class YoutubeFeed extends React.Component {

  constructor(){
    super()
    this.state = {
      youtubeData: []
    }
  }

  fetchVideos(id){
    Axios.get('https://www.googleapis.com/youtube/v3/playlists', {
      params: {
        part: "snippet",
        maxResults: 3,
        key: config.key
      }
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  componentDidMount(){
    Axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: "contentDetails",
        forUsername: this.props.username,
        key: config.key
      }
    })
      .then(function (response) {
        let id = response.data.items[0].contentDetails.relatedPlaylists.uploads
        this.fetchVideos(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {
    return (
      <Card>
        asd
      </Card>
    )
  }
}

export default YoutubeFeed
