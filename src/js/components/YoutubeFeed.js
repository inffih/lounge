import React from 'react'
import YoutubeFeedItem from './YoutubeFeedItem'
import Axios from 'axios'
import { Card } from 'semantic-ui-react'
import LoaderComponent from './LoaderComponent'
import * as config from '../../tempdata/api.config.json'

class YoutubeFeed extends React.Component {

  constructor(){
    super()
    this.state = {
      youtubeData: [],
      fetching: false
    }
  }

  fetchVideos(id){
    Axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: "snippet",
        maxResults: 4,
        playlistId: id,
        key: config.key
      }
    })
      .then(response => {
        this.setState({
          youtubeData: response.data.items,
          fetching: false
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  componentDidMount(){
    this.fetchChannel()
  }

  fetchChannel(){
    this.setState({fetching: true})
    Axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: "contentDetails",
        forUsername: this.props.username,
        key: config.key
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

  render() {
    if(this.state.fetching){
      return (
        <Card>
          <Card.Content>
            <Card.Header>
              {this.props.username}
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <LoaderComponent/>
          </Card.Content>
        </Card>
      )} else {
        return (
          <Card>
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
    }
}

export default YoutubeFeed
